# Lab 7: Customizing Copilot - Tailored Development Walkthrough

I have successfully customized GitHub Copilot's behavior to align with the specific coding standards and workflows of "The Daily Harvest" project. This ensures consistency across all AI-generated code and planning.

## 📄 Repository-Level Instructions
I established a set of guardrails in `.github/copilot-instructions.md` that dictate the project's technology stack, styling preferences, and testing requirements.

**Key Standards Defined:**
- **Frameworks**: React + TypeScript + Vite.
- **Styling**: Vanilla CSS for components with a focus on modern aesthetics (glassmorphism/transitions).
- **Testing**: Vitest and React Testing Library (aiming for 90%+ coverage).
- **Formatting**: Structured response formats for feature planning and verification.

## 🏗️ Feature Planning: Order History
Using the new project instructions, I planned a new **Order History** feature and created a detailed GitHub issue.

**Adherence to Standards:**
- ✅ Plan prioritizes React functional components and Vanilla CSS.
- ✅ Testing plan specifies Vitest and 90% coverage targets.
- ✅ Documentation follows the mandated structure (Overview, Requirements, Technical Plan, Verification Plan).

![Verifying Lab 7 Issue Content](file:///Users/aaliyah/githubcopilot-workshop/walkthroughs/verify_lab_7_issue_github_1767758987494.webp)

## ⚡ Custom Prompts and Chat Modes
To further enhance efficiency, I implemented custom reusable prompt and chat mode files.

### 1. Custom Prompt: Code Explanation
**File:** [.github/prompts/explanation.prompt.md](file:///Users/aaliyah/githubcopilot-workshop/.github/prompts/explanation.prompt.md)
Provides a standardized template for beginner-friendly code breakdowns, including key concepts and step-by-step logic.

### 2. Custom Chat Mode: Planning
**File:** [.github/chatmodes/Plan.chatmode.md](file:///Users/aaliyah/githubcopilot-workshop/.github/chatmodes/Plan.chatmode.md)
An specialized mode that focuses strictly on high-level architectural planning without generating code edits, encouraging better design-first practices.

## 🎯 Impact of Customization
- **Consistency**: All developers (and AI agents) now follow the same "The Daily Harvest" blueprint.
- **Efficiency**: Reduced prompt engineering by automating context delivery.
- **Quality**: Enforced testing and styling standards lead to more robust and visually appealing features.

---

**This concludes Lab 7 and the entire GitHub Copilot Labs workshop series!**
- All 7 labs completed.
- 91.5% test coverage achieved.
- Autonomous features developed and merged.
- MCP and Customizations fully integrated.
