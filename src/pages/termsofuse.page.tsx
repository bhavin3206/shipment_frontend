import { useEffect, useRef } from "react";

const TermsOfUsePage = () => {
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
      src="/Terms-of-Use.html"
      title="Terms-Of-Use"
    ></iframe>
  );
};

export default TermsOfUsePage;
