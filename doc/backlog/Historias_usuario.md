# Historias de usuario (documentadas y trazables)

## 2.1 Plantilla recomendada (tabla)

| ID | Como (rol) | Quiero (objetivo) | Para (beneficio) | Prioridad | RF relacionados |
|----|-------------|-------------------|------------------|------------|-----------------|
| **HU01** | Usuario (emprendedor o comprador) | Registrarme con mis datos personales y recibir un token de verificación en mi correo institucional | Activar mi cuenta y acceder a la app | Alta | RF-01, RF-02, RF-03 |
| **HU02** | Usuario | Iniciar sesión con correo o usuario y contraseña | Acceder a mi perfil y funcionalidades según mi rol | Alta | RF-04 |
| **HU03** | Usuario | Solicitar un nuevo token si el anterior expiró o no llegó al correo | Completar la activación de mi cuenta y poder ingresar a la aplicación | Alta | RF-03 |
| **HU04** | Emprendedor | Crear una empresa con nombre, descripción e imagen opcional | Mostrar la identidad de mi negocio antes de publicar productos | Alta | RF-05 |
| **HU05** | Emprendedor | Crear publicaciones con título, descripción, precio, foto (y promoción opcional) | Mostrar mis productos a los compradores | Alta | RF-06 |

---

# ✅ 2.2 Criterios de aceptación (Formato Gherkin)

---

## HU01 – Registro de usuario (emprendedor o comprador)
**Funcionalidad:** Registro y activación de cuenta de usuario  

**Escenario: Registro exitoso con correo institucional**  
* Dado que estoy en la pantalla de registro  
* Y completo los campos: nombres, apellidos, correo institucional, teléfono, nombre de usuario, contraseña y rol  
* Cuando envío el formulario  
* Entonces el sistema valida que el correo tenga el dominio `@corhuila.edu.co`  
* Y envía un token de verificación al correo  
* Y mi cuenta queda en estado “pendiente”  
* Y muestra un mensaje indicando que el token será válido durante 1 minuto  
* Y existe un botón para solicitar un nuevo token si expira o se pierde  

**Escenario: Activación de cuenta mediante token**  
* Dado que recibí el token en mi correo institucional  
* Cuando ingreso el token en la aplicación  
* Entonces el sistema valida el código  
* Y mi cuenta cambia a estado “activo”  
* Y puedo iniciar sesión normalmente  

**Escenario alternativo: Token inválido o expirado**  
* Dado que intento ingresar un token inválido o expirado  
* Cuando el sistema valida el token  
* Entonces muestra un mensaje de error  
* Y ofrece la opción de solicitar un nuevo token de verificación  

---

## HU02 – Inicio de sesión
**Funcionalidad:** Login  

**Escenario: Inicio de sesión exitoso**  
* Dado que estoy en la pantalla de inicio de sesión  
* Y ingreso un correo o nombre de usuario y contraseña válidos  
* Cuando presiono “Iniciar sesión”  
* Entonces puedo acceder a mi perfil y funcionalidades según mi rol  

**Escenario: Inicio de sesión con credenciales incorrectas**  
* Dado que ingreso un correo/nombre de usuario o contraseña incorrectos  
* Cuando intento iniciar sesión  
* Entonces la aplicación muestra un mensaje de error  
* Y no permite el acceso  

---

## HU03 – Solicitar nuevo token de verificación
**Funcionalidad:** Solicitar token  

**Escenario: Solicitar token si el anterior expiró o no llegó**  
* Dado que mi token actual expiró o no lo recibí  
* Cuando presiono “Solicitar nuevo token”  
* Entonces el sistema envía un nuevo token al correo institucional  
* Y muestra un mensaje indicando que el token será válido durante 1 minuto  

---

## HU04 – Crear empresa
**Funcionalidad:** Registro de empresa  

**Escenario: Crear empresa exitosa**  
* Dado que soy emprendedor y estoy en la sección de empresas  
* Cuando ingreso nombre, descripción e imagen opcional  
* Y guardo la empresa  
* Entonces la empresa queda registrada  
* Y se muestra en mi perfil para futuras publicaciones  

---

## HU05 – Crear publicaciones
**Funcionalidad:** Crear productos o servicios  

**Escenario: Publicación exitosa de producto o servicio**  
* Dado que soy emprendedor y estoy en la sección de publicaciones  
* Cuando completo título, descripción, precio, foto y promoción opcional  
* Y guardo la publicación  
* Entonces el producto se agrega al catálogo  
* Y queda visible para los compradores  


---

**Fecha:** 14 de noviembre del 2025  
**Versión:** #5  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo
