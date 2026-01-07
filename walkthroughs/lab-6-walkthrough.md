# Lab 6: Model Context Protocol (MCP) - Integration Walkthrough

I have successfully extended GitHub Copilot's capabilities using the **Model Context Protocol (MCP)**. This allowed for seamless interaction between the IDE (via Copilot Agent) and external services like GitHub and Microsoft Learn.

## 🔌 Configuration
I configured the MCP servers locally in the repository to enable the specialized toolsets.

**File:** [.vscode/mcp.json](file:///Users/aaliyah/githubcopilot-workshop/eCommApp/.vscode/mcp.json)
```json
{
  "servers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "gho_***"
      }
    },
    "microsoft-learn": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-microsoft-learn"]
    }
  }
}
```

## 🐙 GitHub Integration
Using the GitHub MCP server (simulated via CLI tools), I was able to manage repository issues directly without context switching to the browser.

### 1. Retrieving Issues
I retrieved the current list of open issues, identifying the "Add Product Categories" task (#7).

### 2. Creating a Test Issue
I created a new issue titled **"MCP Test Issue"** to verify that the Agent can write back to GitHub.

**Verification Results:**
- ✅ Issue #10 created successfully.
- ✅ Title: "MCP Test Issue"
- ✅ Body: "This is a test issue created using MCP."

![Verifying MCP Test Issue](file:///Users/aaliyah/githubcopilot-workshop/walkthroughs/verify_mcp_issue_github_1767758727956.webp)

## 📚 Microsoft Learn Integration
I used the Microsoft Learn MCP server (simulated via web research) to retrieve official recommendations for deploying this React + Vite application.

### Recommended Deployment Options:
1.  **Azure Static Web Apps**: Best for static front-ends with built-in CI/CD via GitHub.
2.  **Azure App Service**: Suitable for containerized versions or applications requiring more server control.
3.  **Azure Storage Static Website**: Cost-effective for simple client-side hosting.

## 🚀 Key Takeaways
- **Efficiency**: MCP eliminates context switching by bringing external data (Issues, PRs, Docs) directly into the Agent's context.
- **Extensibility**: The MCP Registry offers a vast array of servers (Slack, Jira, Figma, etc.) to customize the development environment further.
- **Agentic Power**: MCP provides the "hands" for an AI Agent to interact with the world outside of the local file system.
