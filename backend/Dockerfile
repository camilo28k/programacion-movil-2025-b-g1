# Etapa 1: Build del proyecto NestJS
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto (Nest usa 'build' para transpilar a JS)
RUN npm run build

# Etapa 2: Imagen final, más liviana para producción
FROM node:20-alpine
WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Instalar solo dependencias necesarias para producción
RUN npm install --omit=dev

# Exponer el puerto configurado en tu app (por ejemplo, 8081)
EXPOSE 3000


# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
