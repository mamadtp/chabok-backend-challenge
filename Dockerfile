FROM node:18.12.1-alpine AS builder
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN wget -qO- https://gobinaries.com/tj/node-prune | ash -s
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
RUN npm prune --production  && npm cache clean --force
RUN node-prune

FROM node:18.12.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/node_modules/ ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]