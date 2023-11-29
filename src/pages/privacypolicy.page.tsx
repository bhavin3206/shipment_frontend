import { useEffect, useRef } from "react";

const PrivacyPolicyPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const adjustIframeHeight = () => {
      if (iframeRef.current) {
        iframeRef.current.style.height = window.innerHeight + "px";
      }
    };

    window.addEventListener("resize", adjustIframeHeight);
    adjustIframeHeight(); // Call the function initially

    return () => {
      window.removeEventListener("resize", adjustIframeHeight);
    };
  }, []);
  return (
    <iframe
      ref={iframeRef}
      className="w-full"
      src="/Privacy-Policy.html"
      title="Privacy-Policy"
    ></iframe>
  );
};

export default PrivacyPolicyPage;
