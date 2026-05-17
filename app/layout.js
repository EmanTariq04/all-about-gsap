import "./globals.css";
import { TransitionProvider } from "./components/TransitionContext";
import SiteNav from "./components/SiteNav";

export const metadata = {
  title: "Art Gallery",
  description: "Museum collection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TransitionProvider>
          <SiteNav />
          <div data-transition="wrapper">
            {children}
          </div>
        </TransitionProvider>
      </body>
    </html>
  );
}