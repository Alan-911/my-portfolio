# NotebookLM MCP Server 📝🧠

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)
![MCP Standard](https://img.shields.io/badge/MCP-Ready-orange.svg)

> An advanced synchronization protocol linking Google's **NotebookLM** exports seamlessly with the **Claude Desktop** application via an MCP (Model Context Protocol) Server.

## 🌟 Why This Exists && Business Impact
Researchers and data analysts often create heavily curated knowledge bases inside Google NotebookLM. However, invoking advanced analytical reasoning across those distinct notes natively is difficult. This MCP server acts as a direct bridge, exposing your NotebookLM curated data securely to Claude 3.5 Sonnet for robust, agentic analysis right from your desktop.

### 💼 Business Impact & Results
- **Maximized ROI on Existing Data**: Prevented data siloing by unlocking NotebookLM troves for unified LLM intelligence.
- **Drastic Hallucination Reduction**: Hybrid-RAG approach bounds Claude strictly to the injected Notebook context boundaries, verifying output accuracy.
- **Analyst Workflow Enhancement**: Allowed analysts to seamlessly write code using NotebookLM research natively inside their IDE environments without context switching.

## ✨ Key Features
- **Seamless Sync**: Directly map exported NotebookLM JSON/Text troves.
- **Claude Desktop Integration**: Full compatibility with Anthropic's desktop context API.
- **Windows Optimized**: Built with Windows filesystems and permissions explicitly in mind.
- **Hybrid-RAG Support**: Minimizes hallucinations by strictly forcing context boundaries on the extracted notebooks.

## 🚀 Quick Start (Windows)

1. **Clone and Install:**
   ```bash
   git clone https://github.com/Alan-911/notebooklm-mcp.git
   cd notebooklm-mcp
   npm install
   ```
2. **Build the Server:**
   ```bash
   npm run build
   ```
3. **Install the MCP to Claude:**
   Add the following to your Claude Desktop config file (`%APPDATA%\Claude\claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "notebookLM": {
         "command": "node",
         "args": ["C:\\path\\to\\notebooklm-mcp\\build\\index.js"]
       }
     }
   }
   ```

## 📚 Technical Stack
* Implementation: TypeScript / Node.js
* Protocol Architecture: `@modelcontextprotocol/sdk`
* Author: Yves Alain Iragena
