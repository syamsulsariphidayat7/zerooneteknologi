"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Multi-bahasa ID/EN (ADR 0004): kamus statis di berkas ini, tanpa
 * library i18n. Bahasa bawaan = Indonesia (SSR selalu Indonesia);
 * pilihan pengunjung disimpan di localStorage "zo-lang" dan toggle
 * ada di header di samping toggle tema. Tipe kamus Inggris mengikuti
 * bentuk kamus Indonesia — kunci yang hilang = error TypeScript.
 */

export type Lang = "id" | "en";

const id = {
  nav: ["Beranda", "Tentang", "Layanan", "Portfolio", "Kontak"],
  hero: {
    pre: "Mitra teknologi untuk ",
    span: "software, aplikasi, dan solusi digital",
    post: " terpadu",
  },
  theme: { toLight: "Mode Terang", toDark: "Mode Gelap", aria: "Ganti tema terang/gelap" },
  langToggle: { label: "English", aria: "Ganti bahasa ke Inggris" },
  about: {
    title: "Tentang",
    intro:
      "Perusahaan teknologi informasi yang berfokus pada pengembangan sistem informasi, teknologi internet, dan telekomunikasi untuk instansi, bisnis, dan masyarakat.",
    labels: {
      address: "Alamat",
      website: "Website",
      phone: "Telepon",
      email: "Email",
      capital: "Status Modal",
      scale: "Skala Usaha",
      field: "Bidang",
      region: "Wilayah",
    },
    values: { scale: "Usaha Kecil", field: "Teknologi Informasi", region: "Garut, Jawa Barat" },
    counts: {
      clients: "Klien",
      projects: "Proyek Selesai",
      fields: "Bidang Usaha (KBLI)",
      services: "Layanan Utama",
    },
    visionMission: "Visi & Misi",
    vision: "Visi",
    mission: "Misi",
    visionText:
      "Menjadi mitra teknologi terpercaya bagi bisnis dan instansi untuk bertumbuh melalui transformasi digital yang andal, aman, dan terjangkau — diakui di tingkat nasional maupun global.",
    missionItems: [
      "Membangun perangkat lunak, aplikasi, dan website yang menyelesaikan masalah nyata klien — berkualitas, aman, dan dengan biaya yang rasional.",
      "Menyediakan jaringan internet dan infrastruktur teknologi yang stabil untuk menunjang operasional bisnis, instansi, dan layanan publik.",
      "Menghadirkan platform Desa Digital untuk membantu pemerintahan desa melayani masyarakat secara modern, cepat, dan transparan.",
      "Mendampingi setiap klien dari konsultasi, perencanaan, penerapan, hingga pemeliharaan — semua dalam satu pintu.",
      "Berinovasi mengikuti perkembangan teknologi global agar setiap solusi yang ditawarkan selalu relevan dan siap bersaing.",
    ],
    pdfButton: "Unduh Profil Perusahaan (PDF)",
    kbliTitle: "Bidang Usaha Terdaftar (KBLI)",
    kbli: [
      { code: "58200", title: "Penerbitan Piranti Lunak (Software)" },
      { code: "62012", title: "Pengembangan Aplikasi Perdagangan Melalui Internet (E-Commerce)" },
      { code: "63121", title: "Portal Web dan/atau Platform Digital" },
      { code: "62024", title: "Konsultasi dan Perancangan Internet of Things (IoT)" },
      { code: "61913", title: "Jasa Internet Teleponi untuk Keperluan Publik (ITKP)" },
      { code: "61924", title: "Jasa Interkoneksi Internet (NAP)" },
    ],
    focusTitle: "Fokus Bidang",
    interests: [
      "Desa Digital",
      "Jaringan Internet",
      "Perangkat Lunak",
      "Website & Portal",
      "Aplikasi Seluler",
      "IoT & Sensor",
      "CCTV & Keamanan",
      "Marketplace",
    ],
    workTitle: "Cara Kerja",
    steps: [
      {
        title: "1. Perencanaan",
        text: "Pengumpulan dan analisis data serta kebutuhan, termasuk penentuan nama domain dan jenis website atau aplikasi yang akan dibangun — statis atau dinamis.",
      },
      {
        title: "2. Pembuatan",
        text: "Pembuatan halaman dan aplikasi berdasarkan data yang diperoleh: penataan tata letak, struktur, dan navigasi penyajian informasi.",
      },
      {
        title: "3. Implementasi",
        text: "Hasil pembuatan ditempatkan pada server yang terhubung ke internet sehingga dapat dikunjungi dan digunakan oleh pengguna.",
      },
      {
        title: "4. Pemeliharaan",
        text: "Perawatan dan pembaruan berkala agar informasi tetap aktual — halaman dan aplikasi diawasi, dikembangkan, dan diperbarui sesuai kebutuhan.",
      },
    ],
  },
  services: {
    title: "Layanan",
    big: "Layanan Kami",
    items: [
      {
        title: "Desa Digital",
        text: "Platform digital terpadu untuk pemerintahan desa: sistem informasi, layanan, laporan, keuangan, dan lapak desa.",
      },
      {
        title: "Jaringan Internet",
        text: "Pengadaan jaringan internet lengkap dengan sistem voucher untuk kantor, tempat usaha, dan area publik.",
      },
      {
        title: "Pengembangan Perangkat Lunak",
        text: "Jasa pembuatan aplikasi web dan seluler (Android) sesuai kebutuhan — untuk instansi, perusahaan, dan UMKM.",
      },
      {
        title: "Pembuatan Website",
        text: "Website profil instansi dan perusahaan yang responsif dan mudah ditemukan di mesin pencari (SEO), dengan desain dinamis dan kemudahan pembaruan konten.",
      },
      {
        title: "Konsultasi & IoT",
        text: "Konsultasi dan perancangan perangkat terhubung (IoT) — solusi cerdas berbasis sensor dan data untuk instansi dan industri.",
      },
      {
        title: "CCTV & Keamanan",
        text: "Penyedia dan pemasangan CCTV indoor dan outdoor, termasuk sistem keamanan area dengan pemantauan dari pusat kontrol.",
      },
    ],
  },
  portfolio: {
    big: "Karya Kami",
    filters: ["Semua", "Aplikasi", "Kartu", "Web"],
    categories: { app: "Aplikasi", card: "Kartu", web: "Web" },
    titles: [
      "Aplikasi 1",
      "Web 1",
      "Aplikasi 2",
      "Kartu 2",
      "Web 2",
      "Aplikasi 3",
      "Kartu 1",
      "Kartu 3",
      "Web 3",
    ],
    detailsLink: "Detail Portfolio",
  },
  testimonials: {
    title: "Testimoni",
    items: [
      {
        quote:
          "Saya minta dibuatkan website katalog supaya pelanggan bisa lihat koleksi tanpa harus datang ke toko. Hasilnya sesuai yang dibayangkan, dan pesanan lewat WhatsApp dari website lumayan rutin masuk. CCTV tokonya juga sekalian dipasang, jadi malam hari tetap bisa saya pantau dari rumah.",
        name: "Ratna Wijaya",
        role: "Pemilik Butik, Garut Kota",
      },
      {
        quote:
          "Kami butuh website profil sekolah yang bisa dikelola sendiri oleh staf TU. Tim Zero One buatkan sekalian latih cara memperbarui beritanya. Sampai sekarang kalau ada kendala kecil tinggal kirim pesan, dibantu sampai beres.",
        name: "Andi Pratama",
        role: "Pengelola Lembaga Pendidikan, Tarogong Kidul",
      },
      {
        quote:
          "Dulu pencatatan servis masih di buku, sering selisih stok sparepart. Dibuatkan aplikasi pencatatan sederhana, sekarang stok dan riwayat servis pelanggan bisa dicek dalam hitungan detik. Anak-anak di bengkel juga cepat bisa pakainya karena memang dibuat simpel.",
        name: "Budi Santoso",
        role: "Pemilik Bengkel, Garut Kota",
      },
      {
        quote:
          "Penginapan kami sebelumnya hanya mengandalkan promosi dari mulut ke mulut. Setelah punya website dan WiFi tamu dipisah jaringannya, tamu lebih sering pesan langsung lewat WhatsApp dan tidak komplain soal internet lagi.",
        name: "Siti Maryam",
        role: "Pengelola Penginapan, Cipanas, Garut",
      },
      {
        quote:
          "Kedai kami dibuatkan halaman menu daring dan tombol reservasi WhatsApp. Pelanggan tinggal buka dari HP, tidak perlu antre tanya menu di kasir. Selama pengerjaan komunikasinya enak, revisi kecil cepat dikerjakan.",
        name: "Hendra Wijaya",
        role: "Pemilik Kedai Kopi, Garut Kota",
      },
    ],
  },
  contact: {
    title: "Kontak",
    big: "Hubungi Kami",
    addressTitle: "Alamat Kami",
    socialTitle: "Media Sosial",
    emailTitle: "Email Kami",
    phoneTitle: "Telepon Kami",
    phName: "Nama Anda",
    phEmail: "Email Anda",
    phSubject: "Subjek",
    phMessage: "Pesan",
    sending: "Mengirim...",
    sent: "Pesan Anda sudah terkirim. Terima kasih!",
    send: "Kirim Pesan",
    errorFallback: "Gagal mengirim pesan.",
    apiErrors: {
      "Too many requests. Please try again later.": "Terlalu banyak permintaan. Silakan coba lagi nanti.",
      "Invalid request body.": "Isi formulir tidak valid.",
      "Name, email, subject and message are required.": "Nama, email, subjek, dan pesan wajib diisi.",
      "Invalid email address.": "Alamat email tidak valid.",
      "Failed to send email. Please try again later.": "Gagal mengirim pesan. Silakan coba lagi nanti.",
    } as Record<string, string>,
  },
  details: {
    title: "Aplikasi Stok & Penjualan Distributor",
    infoTitle: "Informasi Proyek",
    category: "Kategori",
    categoryValue: "Aplikasi Web",
    client: "Klien",
    clientValue: "Perusahaan Distributor, Garut",
    date: "Tanggal Proyek",
    dateValue: "8 September 2026",
    url: "URL Proyek",
    desc: "Aplikasi web untuk pencatatan stok dan penjualan distributor: barang masuk dan keluar tercatat secara real-time, nota penjualan tercetak otomatis, dan laporan harian dapat dipantau pemilik dari mana saja. Tampilannya dirancang sederhana agar staf gudang dan admin cepat beradaptasi tanpa pelatihan panjang.",
  },
  floats: {
    waAria: "Chat WhatsApp PT Zero One Teknologi",
    waText: "Halo PT Zero One Teknologi, saya ingin bertanya tentang layanan Anda.",
    backTop: "Kembali ke atas",
  },
  meta: {
    description:
      "PT Zero One Teknologi: Software House, Pembuatan Website & Aplikasi, Jaringan Internet, CCTV & IoT. Cisurupan, Garut, Jawa Barat.",
  },
};

export type Dict = typeof id;

const en: Dict = {
  nav: ["Home", "About", "Services", "Portfolio", "Contact"],
  hero: {
    pre: "Technology partner for ",
    span: "integrated software, applications, and digital solutions",
    post: "",
  },
  theme: { toLight: "Light Mode", toDark: "Dark Mode", aria: "Toggle light/dark theme" },
  langToggle: { label: "Bahasa", aria: "Switch language to Indonesian" },
  about: {
    title: "About",
    intro:
      "An information technology company focused on developing information systems, internet technology, and telecommunications for institutions, businesses, and the public.",
    labels: {
      address: "Address",
      website: "Website",
      phone: "Phone",
      email: "Email",
      capital: "Capital Status",
      scale: "Business Scale",
      field: "Field",
      region: "Region",
    },
    values: { scale: "Small Enterprise", field: "Information Technology", region: "Garut, West Java" },
    counts: {
      clients: "Clients",
      projects: "Completed Projects",
      fields: "Business Fields (KBLI)",
      services: "Core Services",
    },
    visionMission: "Vision & Mission",
    vision: "Vision",
    mission: "Mission",
    visionText:
      "To be a trusted technology partner helping businesses and institutions grow through reliable, secure, and affordable digital transformation — recognized nationally and globally.",
    missionItems: [
      "Build software, applications, and websites that solve real client problems — high-quality, secure, and at a rational cost.",
      "Provide stable internet networks and technology infrastructure that support the operations of businesses, institutions, and public services.",
      "Deliver the Desa Digital platform to help village governments serve their communities in a modern, fast, and transparent way.",
      "Support every client from consultation, planning, and implementation to maintenance — all under one roof.",
      "Keep innovating in step with global technology developments so every solution we offer stays relevant and competitive.",
    ],
    pdfButton: "Download Company Profile (PDF)",
    kbliTitle: "Registered Business Fields (KBLI)",
    kbli: [
      { code: "58200", title: "Software Publishing" },
      { code: "62012", title: "E-Commerce Application Development" },
      { code: "63121", title: "Web Portals and/or Digital Platforms" },
      { code: "62024", title: "Internet of Things (IoT) Consulting and Design" },
      { code: "61913", title: "Internet Telephony Services for Public Use (ITKP)" },
      { code: "61924", title: "Internet Interconnection Services (NAP)" },
    ],
    focusTitle: "Areas of Focus",
    interests: [
      "Digital Village",
      "Internet Networks",
      "Software",
      "Websites & Portals",
      "Mobile Applications",
      "IoT & Sensors",
      "CCTV & Security",
      "Marketplace",
    ],
    workTitle: "How We Work",
    steps: [
      {
        title: "1. Planning",
        text: "Gathering and analyzing data and requirements, including choosing the domain name and the type of website or application to build — static or dynamic.",
      },
      {
        title: "2. Development",
        text: "Building the pages and application based on the data gathered: arranging the layout, structure, and information navigation.",
      },
      {
        title: "3. Implementation",
        text: "The finished work is deployed on an internet-connected server so it can be visited and used by users.",
      },
      {
        title: "4. Maintenance",
        text: "Regular care and updates to keep information current — pages and applications are monitored, developed, and updated as needed.",
      },
    ],
  },
  services: {
    title: "Services",
    big: "Our Services",
    items: [
      {
        title: "Digital Village",
        text: "An integrated digital platform for village governments: information systems, services, reports, finance, and a village marketplace.",
      },
      {
        title: "Internet Networks",
        text: "Complete internet network provisioning with a voucher system for offices, businesses, and public areas.",
      },
      {
        title: "Software Development",
        text: "Custom web and mobile (Android) application development — for institutions, companies, and SMEs.",
      },
      {
        title: "Website Development",
        text: "Responsive company and institution profile websites that are easy to find on search engines (SEO), with dynamic designs and easy content updates.",
      },
      {
        title: "IoT Consulting",
        text: "Consulting and design of connected devices (IoT) — smart solutions based on sensors and data for institutions and industry.",
      },
      {
        title: "CCTV & Security",
        text: "Supply and installation of indoor and outdoor CCTV, including area security systems with monitoring from a control center.",
      },
    ],
  },
  portfolio: {
    big: "Our Works",
    filters: ["All", "Apps", "Cards", "Web"],
    categories: { app: "Apps", card: "Cards", web: "Web" },
    titles: ["App 1", "Web 1", "App 2", "Card 2", "Web 2", "App 3", "Card 1", "Card 3", "Web 3"],
    detailsLink: "Portfolio Details",
  },
  testimonials: {
    title: "Testimonials",
    items: [
      {
        quote:
          "I asked for a catalog website so customers could browse the collection without coming to the store. It turned out just as I imagined, and orders via WhatsApp from the website come in quite regularly. The shop's CCTV was installed at the same time, so I can still monitor it from home at night.",
        name: "Ratna Wijaya",
        role: "Boutique Owner, Garut City",
      },
      {
        quote:
          "We needed a school profile website that our admin staff could manage themselves. The Zero One team built it and trained us to update the news. Even now, whenever there is a small issue, we just send a message and they help until it is resolved.",
        name: "Andi Pratama",
        role: "Education Institution Manager, Tarogong Kidul",
      },
      {
        quote:
          "Service records used to be kept in a book, and spare-part stock often did not add up. They built us a simple recording app — now stock and customer service history can be checked in seconds. The workshop team picked it up quickly because it was made simple.",
        name: "Budi Santoso",
        role: "Workshop Owner, Garut City",
      },
      {
        quote:
          "Our inn previously relied only on word-of-mouth promotion. After getting a website and a separate guest WiFi network, guests book directly via WhatsApp more often and no longer complain about the internet.",
        name: "Siti Maryam",
        role: "Inn Manager, Cipanas, Garut",
      },
      {
        quote:
          "Our café got an online menu page and a WhatsApp reservation button. Customers just open it on their phones — no more queuing to ask for the menu at the counter. Communication during the project was great, and small revisions were done quickly.",
        name: "Hendra Wijaya",
        role: "Coffee Shop Owner, Garut City",
      },
    ],
  },
  contact: {
    title: "Contact",
    big: "Contact Us",
    addressTitle: "Our Address",
    socialTitle: "Social Profiles",
    emailTitle: "Our Email",
    phoneTitle: "Call Us",
    phName: "Your Name",
    phEmail: "Your Email",
    phSubject: "Subject",
    phMessage: "Message",
    sending: "Sending...",
    sent: "Your message has been sent. Thank you!",
    send: "Send Message",
    errorFallback: "Failed to send message.",
    apiErrors: {} as Record<string, string>,
  },
  details: {
    title: "Distributor Stock & Sales Application",
    infoTitle: "Project Information",
    category: "Category",
    categoryValue: "Web Application",
    client: "Client",
    clientValue: "Distribution Company, Garut",
    date: "Project Date",
    dateValue: "September 8, 2026",
    url: "Project URL",
    desc: "A web application for recording distributor stock and sales: incoming and outgoing goods are recorded in real time, sales receipts print automatically, and daily reports can be monitored by the owner from anywhere. Its interface is designed to be simple so warehouse staff and admins can adapt quickly without lengthy training.",
  },
  floats: {
    waAria: "Chat with PT Zero One Teknologi on WhatsApp",
    waText: "Hello PT Zero One Teknologi, I would like to ask about your services.",
    backTop: "Back to top",
  },
  meta: {
    description:
      "PT Zero One Teknologi: Software House, Website & Application Development, Internet Networks, CCTV & IoT. Cisurupan, Garut, West Java.",
  },
};

const dict: Record<Lang, Dict> = { id, en };

interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LangCtx = createContext<LangState>({ lang: "id", setLang: () => {}, t: dict.id });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  // Baca pilihan tersimpan setelah mount (SSR selalu Indonesia)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zo-lang");
      if (saved === "en" || saved === "id") setLangState(saved);
    } catch {
      // penyimpanan tidak tersedia: tetap bahasa bawaan
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "id";
    try {
      localStorage.setItem("zo-lang", lang);
    } catch {
      // abaikan
    }
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict[lang].meta.description);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  return <LangCtx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
