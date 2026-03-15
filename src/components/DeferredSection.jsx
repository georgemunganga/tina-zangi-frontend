import React, { useEffect, useRef, useState } from "react";

const DeferredSection = ({
  children,
  minHeightClass = "min-h-[320px]",
  rootMargin = "320px",
}) => {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return undefined;
    }

    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        children
      ) : (
        <div
          className={`site-shell ${minHeightClass} flex items-center justify-center py-16`}
        >
          <div className="w-full rounded-[2rem] border border-amber-100 bg-white/70 px-6 py-10 shadow-[0_18px_55px_rgba(15,23,42,0.05)]">
            <div className="mx-auto h-4 w-32 rounded-full bg-amber-100" />
            <div className="mx-auto mt-4 h-10 w-2/3 max-w-[380px] rounded-full bg-amber-50" />
            <div className="mx-auto mt-4 h-4 w-full max-w-[520px] rounded-full bg-slate-100" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeferredSection;
