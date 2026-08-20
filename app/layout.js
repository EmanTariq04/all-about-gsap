import "./globals.css";

export const metadata = {
  title: "Stamp Album",
  description: "A CSS/SVG stamp collection you can flip through like a book",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
