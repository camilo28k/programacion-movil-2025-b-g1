# Etapa 1: Build del proyecto NestJS
FROM node:20-alpine AS build
WORKDIR /app

# 1. Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# 2. Copiar TODO el proyecto antes de generar Prisma
COPY . .

# 3. Prisma schema está ahora dentro de ./prisma
RUN npx prisma generate

# 4. Compilar Nest
RUN npm run build


# Etapa 2: Imagen final
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package*.json ./
COPY secrets ./secrets

EXPOSE 3000
CMD ["node", "dist/main.js"]

