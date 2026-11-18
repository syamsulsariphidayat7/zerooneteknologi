/**
 * Smoke test dasar — tanpa framework test tambahan.
 * Menjalankan server production (build dulu bila belum ada), lalu memeriksa:
 *  1. GET /                  -> 200 + konten PT (PT Zero One Teknologi)
 *  2. GET /portfolio-details -> 200 + konten proyek (Informasi Proyek)
 *  3. POST /api/contact data valid   -> 200 { ok: true }
 *  4. POST /api/contact field kosong -> 400
 *  5. POST /api/contact email salah  -> 400
 *  6. Rate limit: request ke-6 dalam 60 detik dari IP sama -> 429
 *
 * Jalankan: pnpm test   (memakai port 3210)
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const PORT = 3210;
const BASE = `http://127.0.0.1:${PORT}`;

let passed = 0;
let failed = 0;
function check(name, ok, detail = "") {
  if (ok) {
    passed += 1;
    console.log(`  PASS  ${name}`);
  } else {
    failed += 1;
    console.log(`  FAIL  ${name} ${detail}`);
  }
}

if (!existsSync(".next/BUILD_ID")) {
  console.log("Build belum ada — menjalankan `next build` dulu...");
  const build = spawnSync("node_modules/.bin/next", ["build"], { stdio: "inherit" });
  if (build.status !== 0) {
    console.error("Build gagal, smoke test berhenti.");
    process.exit(1);
  }
}

const server = spawn("node_modules/.bin/next", ["start", "-p", String(PORT)], {
  stdio: "ignore",
  detached: true,
});

async function waitReady() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE + "/");
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

try {
  const ready = await waitReady();
  if (!ready) throw new Error("Server tidak siap dalam 30 detik.");

  const home = await fetch(BASE + "/");
  const homeHtml = await home.text();
  check("GET / -> 200", home.status === 200, `(status ${home.status})`);
  check("GET / berisi konten PT", homeHtml.includes("PT Zero One Teknologi"));

  const details = await fetch(BASE + "/portfolio-details");
  const detailsHtml = await details.text();
  check("GET /portfolio-details -> 200", details.status === 200, `(status ${details.status})`);
  check("GET /portfolio-details berisi konten proyek", detailsHtml.includes("Informasi Proyek"));

  const post = (payload) =>
    fetch(BASE + "/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

  const valid = { name: "Test", email: "test@example.com", subject: "Halo", message: "Isi pesan" };
  const okRes = await post(valid); // request #1
  const okJson = await okRes.json().catch(() => ({}));
  check("POST /api/contact valid -> 200 ok", okRes.status === 200 && okJson.ok === true, `(status ${okRes.status})`);

  const emptyRes = await post({ name: "", email: "", subject: "", message: "" }); // #2
  check("POST /api/contact kosong -> 400", emptyRes.status === 400, `(status ${emptyRes.status})`);

  const badEmailRes = await post({ ...valid, email: "bukan-email" }); // #3
  check("POST /api/contact email salah -> 400", badEmailRes.status === 400, `(status ${badEmailRes.status})`);

  // Rate limit 5/60s per IP: #4 dan #5 lolos, #6 kena 429
  const r4 = await post(valid);
  const r5 = await post(valid);
  const r6 = await post(valid);
  check("Rate limit: request #4 & #5 lolos", r4.status === 200 && r5.status === 200, `(${r4.status}, ${r5.status})`);
  check("Rate limit: request #6 -> 429", r6.status === 429, `(status ${r6.status})`);
} catch (err) {
  failed += 1;
  console.error("Smoke test error:", err.message);
} finally {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {}
}

console.log(`\nHasil: ${passed} lulus, ${failed} gagal`);
process.exit(failed > 0 ? 1 : 0);
