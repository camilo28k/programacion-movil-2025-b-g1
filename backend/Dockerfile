# ========================
# STAGE 1 - Build
# ========================
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN apt-get update -y && apt-get install -y openssl libc6 libssl3 libgcc-s1

# Configuración NPM para prevenir timeouts
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set strict-ssl false

RUN npm install

COPY . .

# Prisma: usar motores locales sin descargas
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# ❗IMPORTANTE: NO usar ninguna otra variable PRISMA_* que apunte a binarios

RUN npx prisma generate

RUN npm run build

# ========================
# STAGE 2 - Run
# ========================
FROM node:20-slim

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
