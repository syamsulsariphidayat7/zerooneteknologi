import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Open_Sans, Raleway, Poppins } from "next/font/google";

// Vendor CSS global — pengganti <link> vendor di template asli.
// CSS Swiper & GLightbox TIDAK di sini: dimuat di komponen pemakainya saja.
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "boxicons/css/boxicons.min.css";
import "remixicon/fonts/remixicon.css";

// Template main CSS (assets/css/style.css asli, path bg.jpg disesuaikan)
import "./globals.css";

// Google Fonts via next/font: font di-self-host saat build (tanpa request
// ke fonts.googleapis.com saat runtime, tanpa layout shift).
// Weight/style sama dengan <link> Google Fonts template asli.
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-raleway",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Zero One Teknologi — don't limit yourself",
  description:
    "PT Zero One Teknologi: Desa Digital, Internet Desa, Software House, Pembuatan Website, CCTV & IoT. Cisurupan, Garut, Jawa Barat.",
  keywords: "PT Zero One Teknologi, Desa Digital, Internet Desa, Software House Garut, Pembuatan Website, CCTV, IoT",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${openSans.variable} ${raleway.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
