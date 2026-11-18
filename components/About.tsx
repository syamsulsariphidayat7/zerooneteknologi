"use client";

import Image from "next/image";
import PureCounter from "./PureCounter";
import Skills from "./Skills";
import Testimonials from "./Testimonials";
import { useLang } from "@/lib/i18n";

// Ikon + warna + pola spasi tetap; label teks berasal dari kamus bahasa.
const INTERESTS = [
  { icon: "ri-community-line", color: "#ffbb2c", first: true },
  { icon: "ri-wifi-line", color: "#5578ff" },
  { icon: "ri-code-s-slash-line", color: "#e80368" },
  { icon: "ri-global-line", color: "#e361ff", lgFirst: true },
  { icon: "ri-smartphone-line", color: "#47aeff", spaced: true },
  { icon: "ri-cpu-line", color: "#ffa76e", spaced: true },
  { icon: "ri-video-line", color: "#11dbcf", spaced: true },
  { icon: "ri-shopping-cart-2-line", color: "#4233ff", spaced: true },
];

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="about">
      {/* ======= About Me ======= */}
      <div className="about-me container">
        <div className="section-title">
          <h2>{a.title}</h2>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <Image
              src="/assets/img/logo.png"
              className="img-fluid"
              alt="Logo PT Zero One Teknologi"
              width={600}
              height={650}
              sizes="(max-width: 992px) 100vw, 33vw"
              style={{ height: "auto" }}
            />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content">
            <h3>PT Zero One Teknologi — don&apos;t limit yourself</h3>
            <p className="fst-italic">{a.intro}</p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.address}:</strong> <span>Kp. Cibojong, Balewangi, Cisurupan, Garut</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.website}:</strong> <span>zerooneteknologi.web.id</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.phone}:</strong> <span>0857 2291 6809</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.email}:</strong> <span>zeroone212117@gmail.com</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.capital}:</strong> <span>PMDN</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.scale}:</strong> <span>{a.values.scale}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.field}:</strong> <span>{a.values.field}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>{a.labels.region}:</strong> <span>{a.values.region}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======= Visi & Misi (gabungan section Profil; id="resume" = jangkar lama) ======= */}
      <div className="resume container" id="resume">
        <div className="section-title">
          <h2>{a.visionMission}</h2>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h3 className="resume-title">{a.vision}</h3>
            <div className="resume-item">
              <p>{a.visionText}</p>
            </div>
          </div>
          <div className="col-lg-6">
            <h3 className="resume-title">{a.mission}</h3>
            <div className="resume-item">
              <ul>
                {a.missionItems.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p style={{ marginTop: "10px" }}>
          <a className="pdf-download-btn" href="/profil-pt-zero-one-teknologi.pdf" download>
            <i className="bi bi-file-earmark-pdf"></i> {a.pdfButton}
          </a>
        </p>
      </div>

      {/* ======= Counts ======= */}
      <div className="counts container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-emoji-smile"></i>
              <PureCounter end={99} duration={1} suffix="+" />
              <p>{a.counts.clients}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
              <i className="bi bi-journal-richtext"></i>
              <PureCounter end={50} duration={1} suffix="+" />
              <p>{a.counts.projects}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="bi bi-briefcase"></i>
              <PureCounter end={6} duration={1} />
              <p>{a.counts.fields}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="bi bi-gear"></i>
              <PureCounter end={6} duration={1} />
              <p>{a.counts.services}</p>
            </div>
          </div>
        </div>
      </div>

      <Skills />

      {/* ======= Interests / Fokus Bidang ======= */}
      <div className="interests container">
        <div className="section-title">
          <h2>{a.focusTitle}</h2>
        </div>
        <div className="row">
          {INTERESTS.map((item, i) => (
            <div
              key={a.interests[i]}
              className={`col-lg-3 col-md-4${item.spaced ? " mt-4" : item.first ? "" : item.lgFirst ? " mt-4 mt-lg-0" : " mt-4 mt-md-0"}`}
            >
              <div className="icon-box">
                <i className={item.icon} style={{ color: item.color }}></i>
                <h3>{a.interests[i]}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======= Cara Kerja (gabungan section Profil) ======= */}
      <div className="resume container">
        <div className="section-title">
          <h2>{a.workTitle}</h2>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {a.steps.slice(0, 2).map((step) => (
              <div className="resume-item" key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            {a.steps.slice(2).map((step) => (
              <div className="resume-item" key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />
    </section>
  );
}
