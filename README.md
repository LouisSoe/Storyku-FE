# Project Name
STORYKU-FE — Story Management Frontend

## Introduction :
Aplikasi web frontend untuk manajemen cerita (Story Management System) yang dibangun menggunakan React 18 dengan TypeScript dan Tailwind CSS. Mengimplementasikan Clean Architecture pada sisi frontend dengan pemisahan layer yang jelas antara domain, infrastruktur, dan presentasi. Aplikasi ini terhubung ke STORYKU-BE REST API sebagai sumber data.

## Table of Contents
- [Introduction](#introduction-)
- [Features](#features-)
- [Libraries](#libraries-)
- [Project Structure](#project-structure-)
- [Setup Instructions](#setup-instructions-)
- [Website URL](#website-url-)

## Features :
- **Dashboard** — Ringkasan statistik platform: total story, chapter, category, tag, distribusi status, top tags, story & chapter terbaru
- **Story List** — Daftar story dengan fitur pencarian (by judul/penulis), filter (category & status), dan pagination
- **Add Story** — Form tambah story baru dengan upload cover image, multi-select tag, dan penambahan chapter sebelum story disimpan
- **Story Detail** — Tampilan detail story beserta daftar chapter (view only)
- **Edit Story** — Form edit story dengan semua field ter-prefill dari data yang ada
- **Add Chapter** — Rich text editor (TipTap) untuk menulis konten chapter baru
- **Edit Chapter** — Edit chapter yang sudah tersimpan dengan konten ter-prefill
- **Category Management** — CRUD master data category (List, Add, Edit, Delete)
- **Tag Management** — CRUD master data tag (List, Add, Edit, Delete)

## Libraries :
- **React 18** (`react`, `react-dom`) — Library utama UI framework
- **TypeScript** — Static typing untuk keamanan kode
- **Tailwind CSS v4** (`tailwindcss`) — Utility-first CSS framework untuk styling
- **Vite** (`vite`) — Build tool dan development server
- **React Router v6** (`react-router-dom`) — Client-side routing dan navigasi
- **TanStack Query v5** (`@tanstack/react-query`) — Server state management, caching, dan auto-refetch
- **Zustand** (`zustand`) — Global state management (draft chapters, confirm modal)
- **React Hook Form** (`react-hook-form`) — Manajemen form dengan performa tinggi
- **Zod** (`zod`) — Schema validation berbasis TypeScript
- **Axios** (`axios`) — HTTP client dengan interceptor untuk komunikasi ke API
- **TipTap** (`@tiptap/react`, `@tiptap/starter-kit`) — Rich text editor headless untuk konten chapter
- **react-hot-toast** — Notifikasi toast ringan dan dapat dikustomisasi
- **date-fns** — Utilitas formatting tanggal (format: DD MMMM YYYY)
- **Lucide React** (`lucide-react`) — Ikon konsisten berbasis SVG
- **clsx + tailwind-merge** — Helper untuk conditional class Tailwind

## Project Structure :
```
src/
├── core/                        # Core Layer — murni TypeScript, tanpa dependency React/Axios
│   ├── domain/                  # Type & interface entity (Story, Chapter, Category, Tag, Dashboard)
│   └── repository/              # Interface kontrak repository (IStoryRepository, dll)
│
├── infrastructure/              # Adapter Layer — implementasi ke dunia luar
│   └── api/                     # Axios HTTP client + implementasi repository
│
├── presentation/                # Presentation Layer — React components & pages
│   ├── components/
│   │   ├── ui/                  # Atomic UI components (Button, Input, Modal, Table, Badge, dll)
│   │   ├── story/               # Feature components untuk Story
│   │   ├── chapter/             # RichTextEditor (TipTap)
│   │   ├── category/            # Feature components untuk Category
│   │   ├── tag/                 # Feature components untuk Tag
│   │   └── layout/              # Sidebar, Topbar, MainLayout
│   ├── hooks/                   # Custom hooks (useStories, useCategories, useTags, dll)
│   └── pages/                   # Halaman utama yang di-route
│       ├── dashboard/
│       ├── story/
│       ├── category/
│       └── tag/
│
├── store/                       # Global state Zustand
│   ├── draftStoryStore.ts       # Menyimpan draft chapter sebelum story disimpan
│   └── confirmStore.ts          # State confirm modal global
│
├── lib/                         # Pure utility functions
│   ├── cn.ts                    # clsx + tailwind-merge helper
│   ├── formatDate.ts            # Format tanggal ke "DD MMMM YYYY"
│   └── slugify.ts               # Konversi teks ke slug
│
└── routes/
    └── index.tsx                # Definisi semua route React Router v6
```

## Setup Instructions :

### 1. Install Node.js
Pastikan Node.js versi 18 atau lebih baru sudah terinstall:
1. Buka [https://nodejs.org](https://nodejs.org) dan unduh versi LTS
2. Ikuti instruksi instalasi sesuai OS
3. Verifikasi: `node -v && npm -v`

### 2. Clone Repository & Install Dependencies
```bash
# Clone repository
git clone https://github.com/USERNAME/Storyku-FE.git
cd Storyku-FE

# Install semua dependency
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di root project:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Storyku
```
Ganti `VITE_API_BASE_URL` dengan URL backend yang sesuai.

### 4. Jalankan Development Server
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

### 5. Build untuk Production
```bash
npm run build
```
Output build akan berada di folder `dist/`

### 6. Pastikan Backend Berjalan
Aplikasi ini membutuhkan STORYKU-BE backend. Pastikan backend sudah berjalan dan database sudah ter-migrasi sebelum menggunakan frontend. Lihat dokumentasi [STORYKU-BE](https://github.com/LouisSoe/Storyku-BE/blob/main/README.md) untuk setup backend.

## Website URL :
[http://103.174.114.118](http://103.174.114.118)