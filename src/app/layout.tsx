import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "../styles/footer.css";
import "../styles/hero.css";
import ThemeProvider from "../provider/ThemeProvider";
import NProgressProvider from "@/components/common/NProgressProvider";
import MainContent from "../components/common/MainContent";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/ui/Banner";
// import SplashCursorDemo from "@/components/common/SplashCursorDemo";

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["400", "600", "900", "1000"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: {
      default: "Nur UI",
      template: "%s | Nur UI",
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", type: "image/x-icon" },
      ],
    },
    description:
      "React and Next.js based UI library with CLI scaffolding, TS-to-JS conversion, and v0 live previews.",
    applicationName: "Nur UI",
    creator: "Md Afsar Mahmud",
    authors: [
      {
        name: "Md Afsar Mahmud",
        url: "https://md-afsar-mahmud.netlify.app",
      },
    ],
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "motion/react",
      "gsap",
      "web animation",
      "shadcn components",
      "animation components for react",
      "add component by cli",
      "tailwind css animation components",
    ],
    openGraph: {
      title: "Nur UI",
      description:
        "React and Next.js based UI library with CLI scaffolding, TS-to-JS conversion, and v0 live previews.",
      url: "https://nurui.vercel.app",
      siteName: "Nurui",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://nurui.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "NUR-UI OG Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nurui",
      description:
        "React and Next.js based UI library with CLI scaffolding, TS-to-JS conversion, and v0 live previews.",
      images: [{ url: "https://nurui.vercel.app/og-image.png" }],
      creator: "@md_afsar_mahmud",
      // site: "@nurui",
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased bg-[var(--background-color)] flex flex-col min-h-screen font-nunito`}
      >
        <AppProvider>
          <ThemeProvider>
            <Toaster />
            <NProgressProvider />
            {/* <SplashCursorDemo /> */}
            <Banner />
            <Navbar />
            <MainContent>{children}</MainContent>
            <Footer />
            <Analytics />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
