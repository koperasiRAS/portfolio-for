---
name: browser-automation-and-scraping
description: Autonomous web interaction, browser use patterns, and clean markdown extraction via Firecrawl.
---

# 🌐 BROWSER AUTOMATION & WEB SCRAPING GUIDE

> Sumber Inspirasi: `browser-use/browser-use` & `firecrawl/firecrawl`

## 1. Autonomous Browser Agent Principles (`browser-use`)
- **Vision + DOM Tree Navigation**:
  - Mengambil screenshot viewport dan menandai elemen interaktif dengan nomor indeks koordinat (*Set-of-Marks prompting*).
  - Melakukan aksi presisi: `click(index)`, `type(index, text)`, `scroll(direction)`, `navigate(url)`.
- **Handling Dynamic Elements**:
  - Menunggu *network idle* dan animasi CSS selesai sebelum melakukan screenshot untuk mencegah aksi meleset (*flaky interactions*).

## 2. LLM-Ready Web Scraping (`firecrawl`)
- Mengapa scraping biasa gagal pada LLM?
  - HTML mentah penuh dengan tag `<script>`, `<style>`, `<div>` bersarang, iklan, dan banner cookie yang membuang ribuan token.
- **Firecrawl Extraction Loop**:
  $$\text{Target URL} \longrightarrow \text{Headless Browser Render} \longrightarrow \text{Clean Markdown Conversion} \longrightarrow \text{Semantic Chunking}$$
- Menghasilkan dokumen Markdown bersih dengan heading, link, dan tabel yang siap dimasukkan ke context prompt LLM atau Vector Database.
