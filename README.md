# Haykal Portfolio

🚀 **Live demo:** https://haykal-portofolio-v1.vercel.app

## Deskripsi
Portofolio pribadi Ahmad Al Haykal – seorang siswa Rekayasa Perangkat Lunak (RPL) yang belajar secara otodidak menjadi Full‑stack Developer. Dibangun dengan **Next.js 16**, **React 19**, **Tailwind CSS 4**, dan menampilkan tampilan bertema luar‑angkasa.

## Fitur utama
- **Hero section** dengan animasi roket interaktif.
- **Tour guide** (roket) yang menampilkan pesan per‑section dan tombol **“Lanjut ➔”**. Klik tombol akan meng‑scroll ke bagian selanjutnya.
- **Responsive**: tampilan optimal di perangkat mobile (≤ 390 px) dan desktop.
- **3D Tata Surya** background, ikon sosial, dan QR‑code untuk Vercel & GitHub.
- **Deploy gratis** ke Vercel (hobby tier).

## Teknologi
| Teknologi | Versi |
|-----------|-------|
| Next.js   | 16.3.4 |
| React     | 19.2.8 |
| Tailwind  | 4 |
| TypeScript| 5 |
| react‑joyride *(removed)* | – |
| custom RocketGuide | – |

## Cara menjalankan secara lokal
```bash
# Clone repository
git clone https://github.com/HAYKALAB/portofolio-v1.1.git
cd portofolio-v1.1

# Install dependencies
npm ci

# Jalankan development server
npm run dev   # http://localhost:3000
```

## Deploy
Proyek di‑push ke **GitHub** secara otomatis ter‑deploy oleh **Vercel** melalui integrasi Git. Set environment variable `NEXT_PUBLIC_*` di Vercel jika ingin menambahkan layanan (mis. EmailJS).

## Catatan pengembangan
- Tahun pada hero telah di‑update ke **2026** (commit `96349da`).
- Tour guide di‑ganti dengan komponen `RocketGuide` yang lebih ringan dan tidak bergantung pada `react‑joyride`.
- Semua perubahan sudah melalui proses build (`npm run build`) dan linting.

---
*Dibuat dengan ❤️ oleh Ahmad Al Haykal*