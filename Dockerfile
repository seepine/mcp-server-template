FROM seepine/alpine:node-3.21.3 AS builder
WORKDIR /work
COPY package.json package.json
RUN npm i
COPY . .
RUN npm run build
RUN node docker/minify.js

FROM seepine/alpine:node-3.21.3
WORKDIR /work
COPY --from=builder /work/dist /work
ENTRYPOINT ["node", "sse.js"]
