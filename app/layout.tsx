import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VISHNU CP | Frontend Developer",
  description: "Premium Portfolio of Vishnu CP - Frontend Developer & UI Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems = [
    { label: 'Projects', ariaLabel: 'View Projects', link: '#projects' },
    { label: 'Skills', ariaLabel: 'View Skills', link: '#skills' },
    { label: 'Experience', ariaLabel: 'View Experience', link: '#experience' },
    { label: 'Contact', ariaLabel: 'Contact Me', link: '#contact' }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/cp-dotcom' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/vishnu-cp404' }
  ];

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="bg-deep-bg text-white antialiased">
        <Preloader />
        <StaggeredMenu
          isFixed
          items={menuItems}
          socialItems={socialItems}
          colors={['#0a0a0a', '#1a1a1a', '#2a2a2a']}
          accentColor="#B2AC88"
        />
        <SmoothScroll>
          {/* <Navbar /> */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
