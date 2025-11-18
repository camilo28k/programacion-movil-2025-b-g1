# ========================
# STAGE 1 - Build
# ========================
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

# Dependencias necesarias para Prisma
RUN apt-get update -y && \
    apt-get install -y openssl libc6 libssl3 libgcc-s1

# Fix conexión NPM
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set strict-ssl false

# Forzar Prisma a usar motores locales
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
ENV PRISMA_MIGRATION_ENGINE_BINARY=binary

# Instalar dependencias
RUN npm install

# Copiar código
COPY . .

# Generar cliente Prisma sin descargas externas
RUN npx prisma generate

# Construir NestJS
RUN npm run build

# ========================
# STAGE 2 - Run
# ========================
FROM node:20-slim

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
