import { useEffect, useRef } from "react";

export default function LandingPage() {
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
      src="/Home.html"
      title="Home"
    ></iframe>
  );
}
