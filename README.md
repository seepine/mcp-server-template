# Mcp Server Template

## Dev

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start sse server

```bash
pnpm dev
```

### 3. Start mcp inspector

```bash
pnpm debug
```

### 4. Test

test your mcp server in chrome of inspector

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
