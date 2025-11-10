# 🧪 Plan de Pruebas – App-Nexo (Rama QA)

**Versión:** 1.0  
**Fecha:** 10 de noviembre de 2025  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo  

---

## 🎯 1. Objetivo
Verificar el correcto funcionamiento del flujo **Emprendedor** en la aplicación **App-Nexo**, validando los requisitos funcionales (RF-01 a RF-06) definidos en el SRS.  
Se busca asegurar la estabilidad, integridad de datos y cumplimiento de los criterios de aceptación definidos.

---

## 📦 2. Alcance
### Incluye:
- Registro y validación por correo institucional (@corhuila.edu.co).  
- Envío y verificación de token.  
- Inicio de sesión con credenciales válidas.  
- Creación de empresa y publicación de productos o servicios.  
- Activación de promociones.

### No incluye:
- CRUD completos (actualizar/eliminar).  
- Pasarelas de pago o estadísticas.  
- Integraciones con redes sociales.

---

## ⚙️ 3. Entorno de Pruebas
| Componente | Descripción |
|-------------|-------------|
| **Frontend** | Next.js / Ionic (QA build) |
| **Backend** | NestJS (API REST) |
| **Base de datos** | PostgreSQL (QA) |
| **Navegador** | Google Chrome / Edge |
| **Herramientas** | Postman, JMeter, Excel QA, GitHub Issues |
| **URL QA** | https://localhost:8100 |

---

## 🧱 4. Tipos de Pruebas
| Tipo | Descripción |
|------|-------------|
| **Smoke** | Validar disponibilidad y carga del sistema. |
| **Funcionales** | Comprobar flujos de usuario según HU. |
| **Negativas** | Validar manejo de errores y restricciones. |
| **Integración** | Validar comunicación frontend–backend–DB. |
| **Rendimiento** | Medir tiempos p95 de carga (catálogo, imágenes). |
| **Regresión** | Revalidar tras correcciones o merges. |

---

## 📋 5. Criterios
### Criterios de entrada
- Build desplegado en rama `qa`.  
- Base de datos con datos semilla (roles, categorías).  
- Servicios SMTP configurados o simulados.

### Criterios de salida
- 100% de casos críticos ejecutados.  
- 0 defectos críticos abiertos.  
- ≤ 2 defectos mayores abiertos con workaround.  
- Reporte de QA entregado y validado.

---

## ⚠️ 6. Riesgos Conocidos
- Token de verificación puede expirar antes del TTL.  
- Imágenes grandes (>5MB) afectan rendimiento.  
- Correos institucionales marcados como SPAM.  
- Configuración de CORS en ambientes locales.

---

## 🕒 7. Cronograma Estimado
| Actividad | Duración | Responsable |
|------------|-----------|-------------|
| Preparación de entorno QA | 0.5 día | Harold |
| Ejecución de pruebas funcionales | 2 días | Danay |
| Pruebas de regresión y rendimiento | 0.5 día | QA Team |
| Consolidación e informe final | 0.5 día | Harold |

---

## 📊 8. Métricas de Control
- % de casos ejecutados = (Ejecutados / Totales) × 100  
- % de éxito = (Aprobados / Ejecutados) × 100  
- Densidad de defectos = (# Defectos / HU cubiertas)  
- Tiempo promedio de respuesta en catálogo ≤ 800 ms  
- Tiempo promedio de carga de imágenes ≤ 1.5 s

---

**Resultado esperado:** garantizar que el MVP (flujo emprendedor) cumpla con los criterios funcionales, técnicos y de rendimiento establecidos.
