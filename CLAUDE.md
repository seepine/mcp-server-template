# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Model Context Protocol (MCP) server template built with the `@modelcontextprotocol/sdk`. It supports three transport modes: stdio, SSE, and streamable HTTP.

## Commands

```bash
pnpm install              # Install dependencies (use pnpm, not npm/yarn)
pnpm dev                  # Start all transports + MCP Inspector for debugging
pnpm build                # Compile TypeScript to dist/
pnpm format               # Format code with Prettier
pnpm tsc                  # Type check without emitting
pnpm release              # Build, format, tag version, and push
```

## Architecture

### Transport Modes

| File | Transport | Use Case |
|------|-----------|----------|
| `src/stdio.ts` | Stdio | Direct execution, CLI tools |
| `src/sse.ts` | SSE (Server-Sent Events) | Browser clients, auto-reconnect |
| `src/streamableHttp.ts` | Streamable HTTP | HTTP-based MCP clients |

All transports share the same server instance created by `src/server/index.ts`.

### Server Creation (`src/server/index.ts`)

Creates the `McpServer` instance and registers tools via `registerTools()`.

### Context System (`src/server/context.ts`)

Uses `AsyncLocalStorage` to provide request header access in HTTP transport modes:
- `ctx.get()` — throws if called outside async context
- `ctx.safeGet()` — returns `{ success, data }` or `{ success: false, error }`
- `ctx.run(context, fn)` — wraps execution with context

### Tool Registration (`src/server/tools/index.ts`)

Tools are registered via `server.registerTool()`. Each tool has:
- `description` — human-readable description
- `inputSchema` — Zod schema for validation
- Handler function receiving parsed arguments

### Session Management (`src/streamableHttp.ts`)

Sessions are identified by `authorization` header, `api-key` header, or `user-agent + ip` hash. Sessions expire after 20 minutes of inactivity.

## Development

For local debugging, use `pnpm dev` which starts the MCP Inspector at `http://localhost:5173`. Connect using SSE mode since it supports auto-reconnect.

## Dependencies

- `@modelcontextprotocol/sdk` — MCP server implementation
- `express` — HTTP server for SSE and streamable HTTP transports
- `zod` — Input schema validation
