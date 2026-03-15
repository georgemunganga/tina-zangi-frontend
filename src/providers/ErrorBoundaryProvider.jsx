import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ErrorBoundaryContext = createContext(null);

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caughtError: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      caughtError: error,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    const activeError = this.state.caughtError || this.props.error;

    if (activeError) {
      return this.props.fallback(activeError);
    }

    return this.props.children;
  }
}

const GlobalErrorFallback = ({ error, onReset }) => {
  const message =
    error instanceof Error && error.message
      ? error.message
      : "An unexpected application error occurred.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_55%,#f8fafc_100%)] px-6 py-12">
      <div className="w-full max-w-2xl rounded-[2.5rem] border border-amber-100 bg-white p-8 text-left shadow-[0_30px_90px_rgba(15,23,42,0.12)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
          Application error
        </p>
        <h1
          className="mt-4 text-4xl font-bold leading-none text-[#7c2d12] sm:text-5xl"
          style={{ fontFamily: "'ADVENTURES', sans-serif" }}
        >
          Something broke in the app
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-600">
          The page hit an unrecoverable UI error. You can retry the render or
          reload the app from a clean state.
        </p>

        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Error message
          </p>
          <p className="mt-3 break-words text-sm leading-7 text-slate-700">
            {message}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-[#c2410c] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            onClick={onReset}
          >
            Try again
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-transform duration-300 hover:-translate-y-0.5"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
          >
            Reload page
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-[#fff7ed] px-6 py-3 text-sm font-semibold text-[#9a3412] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundaryProvider = ({ children }) => {
  const [manualError, setManualError] = useState(null);
  const [lastError, setLastError] = useState(null);
  const [resetCount, setResetCount] = useState(0);

  const normalizeError = useCallback((error) => {
    if (error instanceof Error) {
      return error;
    }

    return new Error(typeof error === "string" ? error : "Unknown application error");
  }, []);

  const showBoundary = useCallback(
    (error) => {
      const nextError = normalizeError(error);
      console.error("Manual error boundary trigger", nextError);
      setManualError(nextError);
      setLastError(nextError);
    },
    [normalizeError],
  );

  const resetBoundary = useCallback(() => {
    setManualError(null);
    setLastError(null);
    setResetCount((current) => current + 1);
  }, []);

  const handleCaughtError = useCallback((error, errorInfo) => {
    console.error("Unhandled render error", error, errorInfo);
    setLastError(error);
  }, []);

  const contextValue = useMemo(
    () => ({
      error: lastError,
      showBoundary,
      resetBoundary,
    }),
    [lastError, resetBoundary, showBoundary],
  );

  return (
    <ErrorBoundaryContext.Provider value={contextValue}>
      <GlobalErrorBoundary
        key={resetCount}
        error={manualError}
        onError={handleCaughtError}
        fallback={(error) => (
          <GlobalErrorFallback error={error} onReset={resetBoundary} />
        )}
      >
        {children}
      </GlobalErrorBoundary>
    </ErrorBoundaryContext.Provider>
  );
};

export const useErrorBoundary = () => {
  const context = useContext(ErrorBoundaryContext);

  if (!context) {
    throw new Error("useErrorBoundary must be used within ErrorBoundaryProvider");
  }

  return context;
};
