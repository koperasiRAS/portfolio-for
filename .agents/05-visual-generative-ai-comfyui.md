---
name: visual-generative-ai-comfyui
description: Professional node-based visual generative AI workflows, Stable Diffusion, Flux.1, ControlNet, and prompt structure.
---

# 🎨 VISUAL GENERATIVE AI & COMFYUI ARCHITECTURE

> Sumber Inspirasi: `Comfy-Org/ComfyUI`

## 1. ComfyUI Modular Node Anatomy
- **Loaders**: `Load Checkpoint` (Model base seperti SDXL, Flux.1 Schnell/Dev), `Load VAE`, `Load CLIP`.
- **Conditioning**:
  - `CLIP Text Encode (Positive Prompt)`: Mendeskripsikan subjek, pencahayaan, lensa, dan komposisi.
  - `CLIP Text Encode (Negative Prompt)`: Menghilangkan distorsi, deformasi anatomi, dan keburaman.
- **Latent & Sampler**:
  - `Empty Latent Image`: Menentukan rasio aspek ($1:1$, $16:9$, $9:16$) dan resolusi dasar.
  - `KSampler`: Mengatur `Steps` (20-35), `CFG Scale` (3.5 - 7.0), `Sampler Name` (Euler, DPM++ 2M Karras), dan `Denoise`.
- **Decoders & Upscaling**:
  - `VAE Decode`: Mengubah ruang latent menjadi pixel gambar asli.
  - `Ultimate SD Upscale` / `Tile ControlNet`: Meningkatkan detail tekstur resolusi tinggi (4K/8K).

## 2. Professional Cinematography Prompting Structure
Saat menyusun prompt untuk visual AI berkualitas tinggi, gunakan urutan berstruktur:
```text
[SUBJECT & ACTION] + [ENVIRONMENT & ATMOSPHERE] + [CAMERA & OPTICS] + [LIGHTING SCHEME] + [COLOR PALETTE & FILM STOCK]

Contoh:
"Editorial portrait of an Asian creative director in a sleek studio, 85mm prime lens f/1.4, shallow depth of field, creamy bokeh, Rembrandt lighting with soft amber rim light, Kodak Vision3 500T color tone, cinematic 4k."
```
