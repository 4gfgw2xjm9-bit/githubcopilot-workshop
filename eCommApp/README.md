# 🍎 The Daily Harvest

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

> **Fresh code, picked daily.** A modernized e-commerce marketplace built for speed, safety, and scalability. This project was enhanced autonomously using **GitHub Copilot Agentic Coding**.

---

## 🚀 Quick Start

Get your local marketplace up and running in under 2 minutes.

### 1. Installation
```bash
cd eCommApp
npm install
```

### 2. Launch Development
```bash
npm run dev
```
🌐 **URL**: [http://localhost:3000](http://localhost:3000)

---

## 🤖 AI-Driven Development (Workshop Learnings)

This repository is more than a store—it's a demonstration of next-generation developer productivity. We used GitHub Copilot to accelerate development through several advanced modes:

### 🧩 Concepts for Beginners

*   **Agent Mode (The Self-Healing AI)**:
    During Lab 4, we used Copilot's Agent mode to achieve 91% test coverage. The AI didn't just write code; it ran tests, analyzed failures, and fixed its own bugs until the goal was met.
*   **Agentic Coding (Autonomous Features)**:
    We transitioned from "Chatting" to "Assigning." By assigning GitHub Issues to the Copilot Agent, features like the **Contact Us** page and **Product Search Bar** were built autonomously from start to finish.
*   **MCP (Model Context Protocol)**:
    We connected Copilot directly to external live data. This allowed the AI to "see" our GitHub Issues and search **Microsoft Learn** documentation without ever leaving the IDE.
*   **Custom Instructions**:
    We set "Project Guardrails" in `.github/copilot-instructions.md`, ensuring the AI always writes code that follows our specific style (e.g., using Vanilla CSS and Vitest).

---

## 🛠️ Tech Stack (with Beginner Notes)

- **UI Framework**: [React 18](https://reactjs.org/)
  - *Beginner Note*: The "Lego blocks" of our UI. It makes the site interactive and fast.
- **Language**: [TypeScript](https://www.typescriptlang.org/)
  - *Beginner Note*: "Spellcheck for logic." It catches errors while you type, not while the user is shopping.
- **Build Tool**: [Vite](https://vitejs.dev/)
  - *Beginner Note*: The high-speed engine under the hood that makes development nearly instant.
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - *Beginner Note*: Our "Safety Net." It automatically clicks through the site to make sure we haven't broken anything.
- **Styling**: Vanilla CSS
  - *Beginner Note*: Pure, standard design instructions for a premium, custom look.

---

## 🧪 Testing State

| Metric | Status |
| :--- | :--- |
| **Statement Coverage** | **91.51%** ✅ |
| **Passing Tests** | **44 Tests** ✅ |
| **Test Engine** | Vitest |

---

## 📁 Project Architecture

- **`src/components/`**: Where the visual pages and buttons live.
- **`src/context/`**: The "Global Brain" that remembers what's in your shopping cart.
- **`src/types/`**: The "Rules Book" for our data structures.
- **`src/utils/`**: Simple tools for math (pricing) and validation.
- **`.github/`**: Where we store our AI instructions and workshop workflows.

---

## 📜 Available Scripts

- `npm run dev`: Start your dev workshop
- `npm run test:run`: Run the safety checks once
- `npm run test:coverage`: See how much of the code is "guarded" by tests
- `npm run lint`: Check for messy code habits

---
© 2026 The Daily Harvest. Developed autonomously during the GitHub Copilot Workshop.
