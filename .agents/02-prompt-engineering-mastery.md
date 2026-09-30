---
name: prompt-engineering-mastery
description: Advanced prompt engineering frameworks covering Zero-Shot, Few-Shot, CoT, ReAct, and Tree of Thoughts.
---

# 🧠 PROMPT ENGINEERING MASTERY GUIDE

> Sumber Inspirasi: `dair-ai/Prompt-Engineering-Guide`

## 1. Core Prompting Frameworks

### A. Chain-of-Thought (CoT) Prompting
- Dorong model untuk menguraikan langkah-langkah penalaran sebelum memberikan kesimpulan akhir.
```text
Question: Sebuah proses render 4K memakan waktu 12 menit per 1 menit video. Berapa waktu render untuk video 5 menit?
Reasoning:
1. Hitung durasi per menit: 12 menit render / 1 menit video.
2. Total durasi video: 5 menit.
3. Total waktu = 12 * 5 = 60 menit (1 jam).
Answer: 60 menit (1 jam).
```

### B. ReAct (Reason + Act) Framework
- Gabungan antara pemikiran (*Thought*), tindakan (*Action* menggunakan tools), dan pengamatan (*Observation*).
```text
Thought: Saya perlu memeriksa apakah port 4321 sedang aktif.
Action: run_command("Get-NetTCPConnection -LocalPort 4321")
Observation: Port 4321 berstatus Listen.
Thought: Server aktif, sekarang saya bisa membaca responnya.
Action: read_url_content("http://localhost:4321")
```

### C. Tree of Thoughts (ToT)
- Menghasilkan beberapa jalur solusi paralel, mengevaluasi kemungkinan risiko pada masing-masing jalur, lalu memilih jalur paling optimal sebelum menulis kode.

## 2. Guardrails & System Directives
- **Explicit Negative Constraints**: Definisikan dengan jelas apa yang TIDAK boleh dilakukan oleh model (*"Do not add third-party dependencies without confirmation"*).
- **Output Schema Enforcement**: Minta output dalam format terstruktur (JSON, Markdown Table) agar mudah diproses downstream.
