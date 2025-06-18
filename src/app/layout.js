// app/layout.js
import "./globals.css";
import LiquidGlassWrapper from "../components/LiquidGlassWrapper";

export const metadata = {
  title: "The Intellect Nest",
  description: "Chess learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <LiquidGlassWrapper>{children}</LiquidGlassWrapper>
      </body>
    </html>
  );
}
