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

const SITE_URL = "https://zerooneteknologi.web.id";
const SITE_DESC =
  "PT Zero One Teknologi: Desa Digital, Internet Desa, Software House, Pembuatan Website, CCTV & IoT. Cisurupan, Garut, Jawa Barat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PT Zero One Teknologi — don't limit yourself",
  description: SITE_DESC,
  keywords: "PT Zero One Teknologi, Desa Digital, Internet Desa, Software House Garut, Pembuatan Website, CCTV, IoT",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "PT Zero One Teknologi",
    title: "PT Zero One Teknologi — don't limit yourself",
    description: SITE_DESC,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PT Zero One Teknologi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Zero One Teknologi — don't limit yourself",
    description: SITE_DESC,
    images: ["/og-image.png"],
  },
};

// Data terstruktur LocalBusiness agar Google membaca profil bisnis lokal ini
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "PT Zero One Teknologi",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/img/logo-icon.png`,
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESC,
  email: "zeroone212117@gmail.com",
  telephone: "+62-857-2291-6809",
  slogan: "don't limit yourself",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kp. Cibojong RT 004 RW 005, Balewangi",
    addressLocality: "Cisurupan, Garut",
    addressRegion: "Jawa Barat",
    postalCode: "44163",
    addressCountry: "ID",
  },
  areaServed: "ID",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${openSans.variable} ${raleway.variable} ${poppins.variable}`}>
      <body>
        {/* Tema terang/gelap: terapkan pilihan tersimpan sebelum konten tampil
            (anti-kedip). Bawaan = gelap (tema asli template). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("zo-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
