import "./globals.css";

export const metadata = {
  title: "The Intellect Nest",
  description: "Chess learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
