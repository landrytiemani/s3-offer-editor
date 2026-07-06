#!/usr/bin/env bash
# Installs the codebase-memory-mcp binary from
# https://github.com/DeusData/codebase-memory-mcp
#
# The MCP server registration lives in .mcp.json at the repo root; this
# script only fetches the binary (official installer with --skip-config).
# Safe to re-run: exits immediately if the binary is already installed.
set -euo pipefail

INSTALL_DIR="${CBM_INSTALL_DIR:-$HOME/.local/bin}"

if command -v codebase-memory-mcp >/dev/null 2>&1; then
    echo "codebase-memory-mcp already installed: $(command -v codebase-memory-mcp)"
    exit 0
fi

echo "Installing codebase-memory-mcp to $INSTALL_DIR ..."
if ! curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh \
        | bash -s -- --skip-config --dir="$INSTALL_DIR"; then
    echo "warning: codebase-memory-mcp install failed (network policy may block" >&2
    echo "github.com release downloads in this environment). The MCP server in" >&2
    echo ".mcp.json will be unavailable until the binary is installed." >&2
    exit 1
fi

case ":$PATH:" in
    *":$INSTALL_DIR:"*) ;;
    *) echo "note: $INSTALL_DIR is not on PATH; add it so .mcp.json can resolve the binary." >&2 ;;
esac

echo "Done. Restart Claude Code (or reconnect via /mcp) to pick up the server."
