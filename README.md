# s3-offer-editor

## Code intelligence: codebase-memory-mcp

This repo is configured with the [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)
MCP server — a local code-intelligence engine that indexes the codebase into a
knowledge graph (functions, call chains, routes) and exposes 14 structural
query tools to AI coding agents.

- `.mcp.json` — project-scoped MCP server registration (picked up by Claude Code)
- `scripts/install-codebase-memory-mcp.sh` — downloads the binary to `~/.local/bin`
  via the official installer (`--skip-config`, so this repo's `.mcp.json` stays the
  single source of configuration)
- `.claude/settings.json` — SessionStart hook that runs the install script when the
  binary is missing, and pre-approves the project MCP server

To install manually, run:

```bash
scripts/install-codebase-memory-mcp.sh
```

then restart Claude Code and say "Index this project".

Note for Claude Code on the web: the sandbox's network policy must allow
downloads from `github.com/DeusData/codebase-memory-mcp` (release binaries);
otherwise the install script fails gracefully and the MCP server is simply
unavailable for that session.
