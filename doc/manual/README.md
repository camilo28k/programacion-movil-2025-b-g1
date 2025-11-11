# Manual del Sistema – App-Nexo

Este documento contiene:
- Manual de Usuario
- Guía de Instalación
- Documentación básica para el uso del sistema

---

## ✅ 1. Manual de Usuario

### 1.1 ¿Qué es App-Nexo?
App-Nexo es una plataforma desarrollada para estudiantes de la Universidad de Corhuila que permite publicar, buscar y promocionar productos o servicios dentro del campus.  
No maneja pagos internos: la comunicación comprador-emprendedor se realiza por WhatsApp.

---

### 1.2 Requisitos para usar la aplicación
- Ser estudiante activo de Corhuila
- Tener correo institucional **@corhuila.edu.co**
- Acceso a internet
- WhatsApp instalado en el celular (para contactar vendedores)

---

### 1.3 Registro de usuario
1. Abrir la aplicación
2. Seleccionar **"Registrarme"**
3. Completar:
   - Nombres y apellidos
   - Correo institucional
   - Teléfono
   - Usuario y contraseña
   - Rol (Comprador o Emprendedor)
4. Crear cuenta

✅ El sistema envía un Token de verificación al correo  
✅ Al ingresarlo correctamente, la cuenta pasa a estado **Activa**

---

### 1.4 Inicio de sesión
1. Ingresar correo o nombre de usuario
2. Ingresar contraseña
3. Presionar **"Iniciar sesión"**

Si los datos son correctos → ingresa  
Si no → se muestra mensaje de error

---

### 1.5 Funciones para Compradores

| Función | Descripción |
|---------|-------------|
| Ver catálogo | Lista de productos disponibles |
| Filtrar por categoría | Muestra artículos de una sola categoría |
| Ver detalles | Muestra descripción, precio y foto |
| Contactar | Botón que abre WhatsApp del emprendedor |

---

### 1.6 Funciones para Emprendedores

| Función | Descripción |
|---------|-------------|
| Crear empresa | Una sola por usuario, con nombre y descripción |
| Publicar productos | Nombre, descripción, precio, imagen |
| Editar | Cambiar precio, foto o información |
| Eliminar | Quitar publicación del catálogo |
| Activar promociones | Asignar precio promocional visible |

---

### 1.7 Errores comunes

| Problema | Causa | Solución |
|----------|-------|----------|
| No llega token | Correo mal digitado / SPAM | Revisar carpeta SPAM o reenviar |
| Imagen no sube | Excede tamaño permitido | Reducir peso o resolución |
| WhatsApp no abre | No instalado | Instalar desde Play Store / App Store |

---

## ✅ 2. Guía de Instalación

### 2.1 Requisitos de software
- Node.js 18+
- PostgreSQL
- Git
- NPM o Yarn
- Cuenta AWS S3 (para manejo de imágenes)

---

¡Listo!
Organizado, limpio, con numeración coherente y sin cambiar tu contenido:

---

### ✅ **2. Instalación del Backend (NestJS)**

#### **2.1 Clonar repositorio**

```sh
git clone <URL-del-backend>
cd backend
```

#### **2.2 Instalar dependencias**

```sh
npm install
```

#### **2.3 Crear archivo `.env` en la carpeta raíz del backend**

```env
# ==================================
# CONFIGURACIÓN DE BASE DE DATOS
# ==================================
DATABASE_URL="postgresql://haroldcamilo:camilo@localhost:5433/nexo02?schema=public"
POSTGRES_PASSWORD=camilo
POSTGRES_USER=haroldcamilo
POSTGRES_DB=nexo02

# ==================================
# CONFIGURACIÓN AWS
# ==================================
AWS_BUCKET_NAME=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# ==================================
# CONFIGURACIÓN DE CORREO (Nodemailer)
# ==================================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=correo_aqui
EMAIL_PASSWORD=CLAVE_AQUI
EMAIL_FROM_NAME="Nexo Innovación"
EMAIL_FROM_ADDRESS="no-reply@nexo.com"

# ==================================
# CONFIGURACIÓN JWT
# ==================================
JWT_SECRET=UNA_CLAVE_SECRETA_LARGA_Y_COMPLEJA_DE_AL_MENOS_32_CARACTERES
JWT_EXPIRATION_TIME=3600s
```

#### **2.4 Verificar puerto en `docker-compose.yml`**

Debe estar:

```yml
"5433:5432"
```

#### **2.5 Inicializar base de datos y migraciones**

```sh
npm run db:reset
```

Este comando:

* ✅ Apaga y elimina contenedores anteriores
* ✅ Los crea nuevamente
* ✅ Ejecuta migraciones con Prisma
* ✅ Genera el cliente Prisma

#### **2.6 Insertar datos iniciales (Roles)**

Abrir la base de datos desde terminal:

```sh
docker exec -it nexo-db psql -U postgres -d nexo02
```

Listar tablas:

```sh
\dt
```

Insertar roles:

```sql
INSERT INTO "Role" (id, name) VALUES
  (1, 'Emprendedor'),
  (2, 'Comprador');
```

#### **2.7 Ejecutar el Backend**

```sh
npm run start
```

✅ El backend queda disponible en:

```
https://localhost:3000
```

---

### ✅ **3. Instalación del Frontend (React / Ionic con Vite)**

#### **3.1 Clonar repositorio**

```sh
git clone <URL-del-frontend>
cd frontend
```

#### **3.2 Archivo `vite.config.js`**

El proyecto usa HTTPS local con certificados. Debe estar configurado así:

```js
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import fs from 'fs';

export default defineConfig({
  plugins: [react(), legacy()],
  server: {
    host: 'localhost',
    port: 8100,
    https: {
      key: fs.readFileSync('/Users/marianapereiraospina/Desktop/REPO PROGRAMACION CAMILO/backend/Backend-Nexo2/backend-nexo/secrets/localhost-key.pem'),
      cert: fs.readFileSync('/Users/marianapereiraospina/Desktop/REPO PROGRAMACION CAMILO/backend/Backend-Nexo2/backend-nexo/secrets/localhost.pem'),
    },
  },
});
```

#### **3.3 Ejecutar frontend**

```sh
ionic serve
```

✅ El frontend abre en:

```
https://localhost:8100
```

(o el puerto indicado en consola)

---

### ✅ **4. Accesos y Pruebas**

| Componente   | URL                                              |
| ------------ | ------------------------------------------------ |
| Backend API  | [https://localhost:3000](https://localhost:3000) |
| Frontend Web | [https://localhost:8100](https://localhost:8100) |

---

### ✅ **5. Posibles Errores Comunes**

| Problema                     | Solución                                 |
| ---------------------------- | ---------------------------------------- |
| La DB falla al iniciar       | Confirmar que Docker está ejecutándose   |
| Migración no funciona        | Ejecutar `npm run db:reset`              |
| El frontend no abre          | Revisar certificados en la ruta correcta |
| El backend no conecta con DB | Revisar `DATABASE_URL` y puerto `5433`   |

---

### ✅ **6. Sistema Instalado Correctamente**

Si ambos comandos funcionan:

```sh
curl https://localhost:3000
```

```sh
ionic serve
```

✅ El sistema está funcionando en local.

---

## ✅ 4. Créditos

**Fecha:** 5 de noviembre del 2025  
**Versión:** #1  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo


