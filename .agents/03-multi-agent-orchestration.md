---
name: multi-agent-orchestration
description: Blueprint for orchestrating multi-agent systems, role-based LLM architectures, and collaborative workflows.
---

# 🤖 MULTI-AGENT ORCHESTRATION & ROLE BLUEPRINTS

> Sumber Inspirasi: `FoundationAgents/MetaGPT`, `bytedance/deer-flow`, `ashishpatel26/500-AI-Agents-Projects`

## 1. Role-Based Agent Separation (The Software Company Pattern)

Dalam sistem multi-agent profesional, satu LLM tidak mengerjakan semua hal sendirian, melainkan dibagi menjadi peran-peran spesifik:

```mermaid
flowchart TD
    User([User Request]) --> PM[1. Product Manager Agent]
    PM -->|Generates PRD & User Stories| Arch[2. System Architect Agent]
    Arch -->|Generates Data Schema & Architecture| Lead[3. Project Manager / Lead]
    Lead -->|Breaks down Tasks & Dependencies| Dev[4. Software Engineer Agent]
    Dev -->|Writes Code & Implements Features| QA[5. QA & Reviewer Agent]
    QA -->|Runs Tests & Audits Quality| Ship([Verified Release])
```

1. **Product Manager (PM)**:
   - Input: Ide kasar / brief user.
   - Output: PRD (*Product Requirements Document*), User Stories, Minimal Scope.
2. **System Architect**:
   - Input: PRD.
   - Output: System Architecture Diagram, API Contracts, Database Schema, Tech Stack Choice.
3. **Software Engineer**:
   - Input: Task item + Architecture.
   - Output: Clean code, Modular components, TDD test cases.
4. **QA & Security Reviewer**:
   - Input: Code diff.
   - Output: Lint check, test coverage audit, security vulnerability scan.

## 2. Memory & State Sharing
- **Persistent State**: Simpan konteks global di file `.json` atau database SQLite lokal (bukan di context window LLM yang cepat penuh).
- **Handoff Packets**: Ketika berganti agent, kirimkan hanya ringkasan *Diff* dan artefak yang relevan (*token-budgeting*).
