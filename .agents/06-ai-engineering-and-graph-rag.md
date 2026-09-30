---
name: ai-engineering-and-graph-rag
description: Core principles of building LLM applications, RAG pipelines, Graph RAG, and Transformer foundations.
---

# ⚡ AI ENGINEERING & GRAPH RAG ARCHITECTURES

> Sumber Inspirasi: `rasbt/LLMs-from-scratch`, `rohitg00/ai-engineering-from-scratch`, `Graphify-Labs/graphify`, `langchain-ai/langchain`

## 1. Transformer & LLM Foundations
- **Tokenization**: Mengubah teks mentah menjadi representasi integer (BPE / Byte Pair Encoding).
- **Self-Attention**: Menghitung bobot keterkaitan antar kata menggunakan matriks $Q$ (Query), $K$ (Key), dan $V$ (Value):
  $$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
- **Fine-Tuning Paradigms**:
  - *Full Fine-Tuning*: Melatih ulang semua bobot model (sangat mahal).
  - *LoRA (Low-Rank Adaptation)*: Membekukan bobot utama dan melatih matriks rank rendah terpisah (efisien dan cepat).
  - *DPO (Direct Preference Optimization)*: Penyelarasan preferensi manusia tanpa perlu model reward terpisah.

## 2. Graph RAG vs Traditional Vector RAG
- **Vector RAG**: Mencari dokumen berdasarkan kemiripan cosine similarity pada embedding vektor.
  - *Kelemahan*: Gagal melihat hubungan keterkaitan non-linear yang kompleks antar entitas.
- **Graph RAG (`Graphify`)**:
  - Mengekstrak entitas sebagai **Node** dan relasi sebagai **Edge**.
  - Menggabungkan semantic search dengan graph traversal, memungkinkan LLM memahami peta relasi menyeluruh (misal: relasi dependensi antar modul kode atau jaringan aktor).
