---
name: cross-platform-engineering-flutter
description: Cross-platform application engineering best practices for Flutter, Dart, and Full-Stack web ecosystems.
---

# 📱 CROSS-PLATFORM ENGINEERING & FLUTTER PATTERNS

> Sumber Inspirasi: `flutter/flutter` & `freeCodeCamp/freeCodeCamp`

## 1. Flutter Architecture Patterns
- **Widget Tree Optimization**:
  - Gunakan `const` constructors sebanyak mungkin untuk mencegah rebuild yang tidak perlu.
  - Pisahkan widget besar menjadi widget kecil yang modular (*Single Responsibility*).
- **State Management Choices**:
  - `Bloc / Cubit`: Cocok untuk aplikasi enterprise dengan stream event terstruktur dan traceability tinggi.
  - `Riverpod`: Modern, compile-safe, dan tidak bergantung pada `BuildContext`.
- **Responsive Layout Strategy**:
  - Gunakan `LayoutBuilder` dan breakpoint adaptif untuk menangani transisi layar dari Mobile ($<600\text{dp}$) ke Tablet ($600-900\text{dp}$) dan Desktop ($>900\text{dp}$).

## 2. Full-Stack Integration
- Gunakan arsitektur **Clean Architecture** (Data Layer $\to$ Domain Layer $\to$ Presentation Layer).
- Pastikan offline caching menggunakan SQLite/Hive dan sinkronisasi background aman dari race condition.
