# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src ./src
COPY nest-cli.json ./

# Build
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files
COPY --from=builder /usr/src/app/dist ./dist

# Set timezone
RUN apk add --no-cache tzdata
ENV TZ=UTC

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget --spider http://localhost:3000/api/health || exit 1

EXPOSE 3000
CMD ["node", "dist/main"]