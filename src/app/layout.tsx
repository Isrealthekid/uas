import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Briech UAS | Drone Manufacturer in Nigeria",
  description:
    "Explore Briech UAS, a Nigerian drone manufacturer based in Abuja. Discover our aircraft, projects and approach to unmanned aerial systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
