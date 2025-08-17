//src/app/zoom/page.js

"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ZoomRedirect() {
  const router = useRouter();

  useEffect(() => {
    const zoomLink = "https://us06web.zoom.us/j/9893189566?pwd=wTzE4kwRJricBw7cNOvOV94LsGFQuC.1";
    window.location.href = zoomLink;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-semibold">Redirecting to Zoom...</h1>
    </div>
  );
}
