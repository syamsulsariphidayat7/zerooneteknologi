"use client";

import { useState } from "react";

type FormStatus = "idle" | "loading" | "sent" | "error";

/**
 * Contact — form aslinya POST ke forms/contact.php (PHP Email Form).
 * Di Next.js diganti Route Handler /api/contact dengan status UI
 * yang sama: .loading / .error-message / .sent-message.
 */
export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Failed to send message.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact</h2>
          <p>Hubungi Kami</p>
        </div>

        <div className="row mt-2">
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-map"></i>
              <h3>Alamat Kami</h3>
              <p>Kp. Cibojong RT 004 RW 005, Balewangi, Cisurupan, Garut 44163</p>
            </div>
          </div>

          <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-share-alt"></i>
              <h3>Social Profiles</h3>
              <div className="social-links">
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="google-plus"><i className="bi bi-skype"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-4 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-envelope"></i>
              <h3>Email Kami</h3>
              <p>zeroone212117@gmail.com</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-phone-call"></i>
              <h3>Telepon Kami</h3>
              <p>0857 2291 6809</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} role="form" className="php-email-form mt-4">
          <div className="row">
            <div className="col-md-6 form-group">
              <input type="text" name="name" className="form-control" id="name" placeholder="Nama Anda" required />
            </div>
            <div className="col-md-6 form-group mt-3 mt-md-0">
              <input type="email" className="form-control" name="email" id="email" placeholder="Email Anda" required />
            </div>
          </div>
          <div className="form-group mt-3">
            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subjek" required />
          </div>
          <div className="form-group mt-3">
            <textarea className="form-control" name="message" rows={5} placeholder="Pesan" required></textarea>
          </div>
          <div className="my-3">
            <div className="loading" style={{ display: status === "loading" ? "block" : "none" }}>Loading</div>
            <div className="error-message" style={{ display: status === "error" ? "block" : "none" }}>{error}</div>
            <div className="sent-message" style={{ display: status === "sent" ? "block" : "none" }}>
              Pesan Anda sudah terkirim. Terima kasih!
            </div>
          </div>
          <div className="text-center">
            <button type="submit" disabled={status === "loading"}>Kirim Pesan</button>
          </div>
        </form>
      </div>
    </section>
  );
}
