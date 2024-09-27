// app/components/AnalyticsScript.tsx
"use client"; // This makes the component a client component

import Script from "next/script";

const AnalyticsScript = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GR0NLTCFVB"
        strategy="lazyOnload"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        onLoad={() => {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).gtag = function () {
            (window as any).dataLayer.push(arguments);
          };
          (window as any).gtag("js", new Date());
          (window as any).gtag("config", "G-GR0NLTCFVB");
        }}
      />
    </>
  );
};

export default AnalyticsScript;
