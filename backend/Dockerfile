# Etapa 1: Build del proyecto NestJS
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto
RUN npm run build

# Etapa 2: Imagen final
FROM node:20-alpine
WORKDIR /app

# Copiar build final
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Instalar solo dependencias necesarias
RUN npm install --omit=dev

# Copiar tus certificados HTTPS
COPY secrets ./secrets

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "dist/main.js"]
