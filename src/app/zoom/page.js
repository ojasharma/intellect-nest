import { redirect } from 'next/navigation';

export default function ZoomPage() {
  const zoomLink = "https://us06web.zoom.us/j/9893189566?pwd=wTzE4kwRJricBw7cNOvOV94LsGFQuC.1";
  redirect(zoomLink);

  // You can optionally return null or a simple component, 
  // but the redirect function will stop rendering and send the redirect header.
  return null;
}