# s3-offer-editor

A branded intake page and AI-assisted offer editor (static `index.html` /
`intake.html` + `render.js`) backed by the n8n workflows in `workflows/`.

## Development

The app itself is static — open `index.html` / `intake.html` directly or serve
the folder with any static file server.

### Visualizing Claude Code agents (Pixel Agents)

[Pixel Agents](https://github.com/pixel-agents-hq/pixel-agents) renders the
Claude Code agents working on this repo as animated characters in a pixel-art
office. It's a **local developer tool** that reads your machine's Claude Code
session data, so run it on your own machine — not in a remote/CI container.

**VS Code extension (recommended):** install `pablodelucca.pixel-agents` from
the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=pablodelucca.pixel-agents)
or [Open VSX](https://open-vsx.org/extension/pablodelucca/pixel-agents), then
open this repo in VS Code.

**Standalone CLI (build from source):** the published npm package only ships
the VS Code extension, so the CLI must be built from the repo:

```bash
git clone https://github.com/pixel-agents-hq/pixel-agents.git
cd pixel-agents
npm install
npm run build
node dist/cli.js
```

Requires VS Code 1.105.0+ and the Claude Code CLI installed and configured.
