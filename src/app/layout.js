import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "The Intellect Nest",
  description: "Chess learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
