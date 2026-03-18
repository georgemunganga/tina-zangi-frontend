import React from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PublicLayout = () => {
  const location = useLocation();
  const forceDarkHeader = Boolean(
    matchPath("/events/:slug/checkout", location.pathname) ||
      matchPath("/shop/:slug", location.pathname) ||
      matchPath("/checkout/:slug", location.pathname),
  );
  const forceDarkLogo = forceDarkHeader;
  const forceDarkText = forceDarkHeader;

  return (
    <>
      <Header forceDarkLogo={forceDarkLogo} forceDarkText={forceDarkText} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
