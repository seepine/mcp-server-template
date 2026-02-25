# Mcp Server Template

## Dev

### 1. Install dependencies

```bash
pnpm install
```

### 2. Watch files

```bash
pnpm watch
```

### 3. Run any of the following scripts

```bash
pnpm start:streamableHttp
pnpm start:sse
```

### 4. Start Debug

Use vscode debug to start the `@modelcontextprotocol/inspector`

## Deploy stdio

### 1. Build

```bash
pnpm build
```

### 2. Deploy to npm

```bash
pnpm publish
```

### 3. Run the server

```bash
npx {mcp-server-template}
```

## Deploy docker

### 1. Build

```bash
docker build -t mcp-server-template .
```

### 2. Run the server

```bash
docker run -p 3000:3000 mcp-server-template
```

### 3. Connect to the server

- type: streamableHttp
- url: http://localhost:3000/mcp
