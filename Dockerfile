FROM alpine:3.23.3 as base
RUN apk add --no-cache nodejs npm

FROM base AS builder
WORKDIR /work
COPY package.json .npmrc ./
RUN npm i
COPY . .
RUN npm run build
RUN node docker/minify.js

FROM base
WORKDIR /work
COPY --from=builder /work/dist /work
# default start streamableHttp server
CMD ["node", "streamableHttp.js"]
