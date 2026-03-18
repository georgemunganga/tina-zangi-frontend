import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  fetchPortalMe,
  logoutPortal,
  refreshPortalToken,
  registerPortalAccount,
  requestPortalOtp,
  verifyPortalOtp,
} from "@/lib/api";
import {
  clearPortalAuthState,
  getPortalAuthState,
  normalizePortalEmail,
  PORTAL_SESSION_EVENT,
  setPortalAuthState,
} from "@/lib/portal-store";

const AuthContext = createContext(null);

const roleDefaults = {
  individual: {
    headline: "Your reading hub",
    notes: [
      "Digital books and event passes will appear here once they are ready.",
      "Use this portal to check orders, downloads, and tickets in one place.",
    ],
  },
  corporate: {
    headline: "Your organization portal",
    notes: [
      "Track organization orders and digital event tickets for this buying account.",
      "Use this space to monitor quantities, status updates, and ready items.",
    ],
  },
  wholesale: {
    headline: "Your wholesale portal",
    notes: [
      "Monitor bulk book orders, fulfillment status, and account activity here.",
      "Wholesale accounts focus on order progress rather than digital ticket access.",
    ],
  },
};

const getRoleDefaults = (role) => roleDefaults[role] || roleDefaults.individual;

function createAuthError(code, message, cause) {
  const error = new Error(message);
  error.code = code;
  error.cause = cause;
  return error;
}

function buildSessionFromUser(user, tokens = {}) {
  const defaults = getRoleDefaults(user?.role);

  return {
    id: user?.id || "portal-user",
    role: user?.role || "individual",
    name: user?.name || "Portal User",
    email: normalizePortalEmail(user?.email),
    phone: user?.phone || "",
    organizationName: user?.organizationName || "",
    headline: user?.headline || defaults.headline,
    notes: user?.notes?.length ? user.notes : defaults.notes,
    source: "api",
    verifiedAt: user?.verifiedAt || null,
    accessToken: tokens.accessToken || "",
    refreshToken: tokens.refreshToken || "",
    tokenType: tokens.tokenType || "Bearer",
    expiresIn: tokens.expiresIn || null,
  };
}

function buildAuthState(session, currentState = null, nextTokens = {}) {
  const accessToken =
    nextTokens.accessToken ||
    session?.accessToken ||
    currentState?.accessToken ||
    "";
  const refreshToken =
    nextTokens.refreshToken ||
    session?.refreshToken ||
    currentState?.refreshToken ||
    "";
  const tokenType =
    nextTokens.tokenType ||
    session?.tokenType ||
    currentState?.tokenType ||
    "Bearer";
  const expiresIn =
    nextTokens.expiresIn ??
    session?.expiresIn ??
    currentState?.expiresIn ??
    null;

  return {
    accessToken,
    refreshToken,
    tokenType,
    expiresIn,
    session: {
      ...session,
      accessToken,
      refreshToken,
      tokenType,
      expiresIn,
    },
    updatedAt: new Date().toISOString(),
  };
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => getPortalAuthState());
  const [isAuthReady, setIsAuthReady] = useState(false);
  const session = authState?.session || null;

  const persistAuthState = useCallback((nextAuthState) => {
    setAuthState(nextAuthState);
    setPortalAuthState(nextAuthState);
  }, []);

  const clearAuthState = useCallback(() => {
    setAuthState(null);
    clearPortalAuthState();
  }, []);

  const restoreSession = useCallback(async () => {
    const storedState = getPortalAuthState();

    if (!storedState?.accessToken) {
      setAuthState(null);
      setIsAuthReady(true);
      return;
    }

    try {
      const meResult = await fetchPortalMe(storedState.accessToken);
      const nextSession = buildSessionFromUser(meResult.user, storedState);
      persistAuthState(buildAuthState(nextSession, storedState));
    } catch (error) {
      if (error.status === 401 && storedState.refreshToken) {
        try {
          const refreshedTokens = await refreshPortalToken(storedState.refreshToken);
          const meResult = await fetchPortalMe(refreshedTokens.accessToken);
          const nextSession = buildSessionFromUser(meResult.user, refreshedTokens);
          persistAuthState(
            buildAuthState(nextSession, storedState, refreshedTokens),
          );
        } catch (refreshError) {
          clearAuthState();
        }
      } else if (error.status === 401 || error.status === 403) {
        clearAuthState();
      } else {
        setAuthState(storedState);
      }
    } finally {
      setIsAuthReady(true);
    }
  }, [clearAuthState, persistAuthState]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const syncFromStorage = () => {
      const nextState = getPortalAuthState();
      setAuthState(nextState);
      setIsAuthReady(true);
    };

    window.addEventListener("focus", syncFromStorage);
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(PORTAL_SESSION_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener("focus", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(PORTAL_SESSION_EVENT, syncFromStorage);
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      accessToken: authState?.accessToken || "",
      refreshToken: authState?.refreshToken || "",
      isAuthenticated: Boolean(session),
      isAuthReady,
      async requestLoginOtp(email) {
        const normalizedEmail = normalizePortalEmail(email);

        try {
          const result = await requestPortalOtp(normalizedEmail);
          return {
            email: result.email || normalizedEmail,
            role: result.role || "individual",
            expiresAt: result.expiresAt || null,
            devOtpCode: result.devOtpCode || "",
          };
        } catch (error) {
          if (error.status === 404) {
            throw createAuthError(
              "ACCOUNT_NOT_FOUND",
              "We could not find a portal account for this email. Create one to continue.",
              error,
            );
          }

          throw error;
        }
      },
      async registerAccount(payload) {
        try {
          const result = await registerPortalAccount(payload);
          return {
            email: result.email,
            role: result.role || payload.role,
            expiresAt: result.expiresAt || null,
            devOtpCode: result.devOtpCode || "",
          };
        } catch (error) {
          if (error.status === 422) {
            throw createAuthError(
              "ACCOUNT_EXISTS",
              error.message || "A portal account with this email already exists.",
              error,
            );
          }

          throw error;
        }
      },
      async verifyOtp({ email, code }) {
        try {
          const result = await verifyPortalOtp({
            email: normalizePortalEmail(email),
            code: String(code).trim(),
          });
          const nextSession = buildSessionFromUser(result.user, result);
          const nextAuthState = buildAuthState(nextSession, null, result);
          persistAuthState(nextAuthState);
          return nextSession;
        } catch (error) {
          if (error.status === 422 || error.status === 404) {
            throw createAuthError(
              "OTP_INVALID",
              error.message || "That verification code is not valid.",
              error,
            );
          }

          throw error;
        }
      },
      async logout() {
        try {
          if (authState?.accessToken) {
            await logoutPortal(authState.accessToken);
          }
        } catch (error) {
          // Clear the local portal session even if the backend logout request fails.
        } finally {
          clearAuthState();
        }
      },
    }),
    [authState, clearAuthState, isAuthReady, persistAuthState, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
