# Historias de usuario (documentadas y trazables)

## 2.1 Plantilla recomendada (tabla)

| ID   | Como (rol)                | Quiero (objetivo)                                                                                                                                 | Para (beneficio)                                             | Prioridad | RF/RFN relacionados        |
|------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|-----------|----------------------------|
| HU01 | Usuario (emprendedor o comprador) | Registrarme ingresando mis datos personales (nombres, apellidos, correo institucional, teléfono, rol, nombre de usuario y contraseña) y recibir un token de verificación en mi correo electrónico                                           | Poder activar mi cuenta mediante el token recibido y acceder a la aplicación con las funcionalidades habilitadas según mi rol | Alta      | RF-01, RF-02, RF-03, RNF-01              |
| HU02 | Usuario                   | Iniciar sesión con correo o nombre usuario, y contraseña                                                                                         | Acceder a mi perfil y a las funcionalidades de mi rol        | Alta      | RF-05, RNF-01              |
| HU03 | Usuario                   | Recuperar mi contraseña                                                                                                                           | No perder acceso a mi cuenta                                 | Media     | RF-04, RFN-01              |
| HU04 | Emprendedor                | Editar mi perfil (nombre, descripción, foto/imagen)                                                                                              | Mostrar información relevante de mi empresa                  | Alta      | RF-06, RNF-03              |
| HU05 | Comprador                  | Editar mi perfil (nombres, apellidos, teléfono, usuario y contraseña)                                                                            | Mantener mis datos actualizados                              | Media     | RF-06, RNF-03              |
| HU06 | Emprendedor                | Publicar productos/servicios con título, descripción, precio, promoción (opcional) y foto/imagen.                                                | Que los compradores vean y valoren mis productos             | Alta      | RF-08, RF-10, RNF-010      |
| HU07 | Emprendedor                | Editar o eliminar mis publicaciones                                                                                                              | Mantener mi catálogo actualizado                             | Alta      | RF-09, RNF-08              |
| HU08 | Administrador              | Organizar empresas por categorías                                                                                                                | Que los compradores encuentren productos fácilmente          | Media     | RF-10, RNF-04              |
| HU09 | Comprador                  | Ver lista de emprendedores disponibles                                                                                                           | Elegir un emprendedor para ver sus productos                 | Alta      | RF-11, RNF-06              |
| HU10 | Comprador                  | Seleccionar un emprendedor y ver todos sus productos                                                                                             | Conocer todo lo que ofrece ese emprendimiento                | Alta      | RF-12, RNF-06              |
| HU11 | Comprador                  | Ver detalle de un producto (título, descripción, precio, promoción (opcional), foto/imagen, botón para contactar al emprendedor)                  | Decidir si me interesa comprar o contactar                   | Alta      | RF-13, RNF-06              |
| HU12 | Comprador                  | Contactar al emprendedor vía WhatsApp                                                                                                            | Coordinar la compra fácilmente                               | Alta      | RF-14, RNF-06              |
| HU13 | Emprendedor                | Publicar promociones temporales                                                                                                                  | Atraer más clientes a mis productos                          | Media     | RF-16, RNF-06              |
| HU14 | Administrador              | Suspender cuenta de empresarios que incumplan normas.                                                                                            | Garantizar el buen uso de la app                             | Alta      | RF-16, RNF-09              |

---

## 2.2 Criterios de aceptación (Gherkin)

### HU01 – Registro de usuario (emprendedor o comprador)
**Funcionalidad:** Registro y activación de cuenta de usuario

**Escenario: Registro exitoso con correo institucional**  
- Dado que estoy en la pantalla de registro  
- Y completo los campos: nombres, apellidos, correo institucional, teléfono, nombre usuario, contraseña, y selecciono rol  
- Cuando envío el formulario  
- Entonces el sistema valida que el correo tenga dominio `@corhuila.edu.co`  
- Y envía un token de verificación al correo  
- Y mi cuenta queda en estado "pendiente"  
- Y muestra un mensaje informando que el token será válido durante 1 minuto
- Y existe un botón para solicitar un nuevo token en caso de expiración o pérdida.

**Escenario: Activación de cuenta mediante token**  
- Dado que recibí el token en mi correo institucional
- Cuando ingreso el token en la aplicación
- Entonces el sistema valida el código,
- Y mi cuenta cambia a estado "activo"
- Y puedo iniciar sesión normalmente  

**Escenario alternativo: Token inválido o expirado**  
- Dado que intento ingresar un token inválido o cuya vigencia de 1 minuto ha expirado,
- Cuando el sistema valida el token,
- Entonces muestra un mensaje de error indicando que el token no es válido o ha expirado,
- Y ofrece la opción de solicitar un nuevo token de verificación.

---

### HU02 – Inicio de sesión
**Funcionalidad:** Login  

**Escenario: Inicio de sesión exitoso**  
- Dado que estoy en la pantalla de inicio de sesión  
- Y ingreso un correo/nombre usuario y contraseña válidos  
- Cuando presiono "Iniciar sesión"  
- Entonces puedo acceder a mi perfil y funcionalidades según mi rol  

**Escenario: Inicio de sesión con credenciales incorrectas**  
- Dado que ingreso correo/nombre usuario o contraseña incorrectos  
- Cuando intento iniciar sesión  
- Entonces la app muestra un mensaje de error  
- Y no permite el acceso  

---

### HU03 – Recuperación de contraseña
**Funcionalidad:** Recuperación de contraseña  

**Escenario: Solicitar restablecimiento de contraseña**  
- Dado que olvidé mi contraseña  
- Cuando solicito recuperar contraseña ingresando mi correo institucional  
- Entonces recibo un enlace o token en el correo para restablecerla  

---

### HU04 – Edición de perfil (emprendedor)
**Funcionalidad:** Editar perfil  

**Escenario: Modificar información permitida**  
- Dado que estoy en la pantalla de edición de perfil  
- Cuando cambio foto de la empresa, nombre de la empresa, descripción  
- Y guardo los cambios  
- Entonces los cambios se reflejan en mi perfil de empresa  

---

### HU05 – Edición de perfil (comprador)
**Funcionalidad:** Editar perfil básico  

**Escenario: Modificar información permitida**  
- Dado que estoy en la pantalla de edición de perfil  
- Cuando cambio nombres, apellidos, teléfono, usuario y contraseña  
- Y guardo los cambios  
- Entonces los cambios se reflejan en mi perfil  

---

### HU06 – Publicación de productos o servicios
**Funcionalidad:** Publicar productos  

**Escenario: Crear producto exitosamente**  
- Dado que soy emprendedor y estoy en mi empresa  
- Cuando completo título, descripción, precio, promoción (opcional) y foto  
- Y guardo la publicación  
- Entonces el producto se agrega al listado de mi empresa  
- Y aparece visible para los compradores  

---

### HU07 – Editar o eliminar publicaciones
**Funcionalidad:** Editar o eliminar producto  

**Escenario: Editar publicación**  
- Dado que selecciono un producto existente  
- Cuando modifico la información permitida y guardo  
- Entonces los cambios se reflejan en la publicación  

**Escenario: Eliminar publicación**  
- Dado que selecciono un producto existente  
- Cuando presiono "Eliminar" y confirmo  
- Entonces la publicación se elimina del sistema  

---

### HU08 – Organización de categorías (admin)
**Funcionalidad:** Gestionar categorías de empresas  

**Escenario: Crear categoría para empresas**  
- Dado que soy administrador  
- Cuando creo una nueva categoría con una imagen y nombre válido  
- Entonces la categoría se agrega al sistema  
- Y queda disponible para asignar a futuras empresas o emprendedores  

**Escenario: Editar o eliminar categoría**  
- Dado que soy administrador y selecciono una categoría existente  
- Cuando modifico su imagen o nombre, o elimino la categoría  
- Entonces los cambios se reflejan en el sistema  
- Y las empresas asociadas se ajustan según la acción  

---

### HU09 – Ver lista de emprendedores
**Funcionalidad:** Lista de emprendedores  

**Escenario: Acceso a lista de emprendedores**  
- Dado que soy comprador  
- Cuando ingreso a la sección de emprendedores  
- Entonces veo la lista de todos los emprendedores registrados  

---

### HU10 – Ver productos de un emprendedor
**Funcionalidad:** Catálogo por emprendedor  

**Escenario: Acceso a productos de un emprendedor**  
- Dado que selecciono un emprendedor de la lista  
- Cuando ingreso a su perfil  
- Entonces veo todos los productos que ha publicado  

---

### HU11 – Ver detalle de un producto
**Funcionalidad:** Detalle de producto  

**Escenario: Información completa del producto**  
- Dado que selecciono un producto  
- Cuando ingreso a su detalle  
- Entonces veo título, descripción, precio, promoción (opcional), foto/imagen y botón para contactar al emprendedor  

---

### HU12 – Contactar emprendedor vía WhatsApp
**Funcionalidad:** Comunicación  

**Escenario: Redirección a WhatsApp**  
- Dado que estoy viendo un producto  
- Cuando presiono "Contactar"  
- Entonces la app abre WhatsApp con el número del emprendedor  

---

### HU13 – Publicar promociones
**Funcionalidad:** Promociones temporales  

**Escenario: Activar promoción**  
- Dado que soy emprendedor y selecciono un producto  
- Cuando agrego titulo, descripción, precio normal y precio en oferta (promoción) más una foto/imagen  
- Y guardo la promoción  
- Entonces la promoción se muestra vinculada al producto  

---

### HU14 – Suspender empresa o usuario (admin)
**Funcionalidad:** Administración de usuarios y empresas  

**Escenario: Suspender usuario infractor**  
- Dado que soy administrador  
- Cuando selecciono un empresario que incumple normas  
- Entonces puedo suspender su cuenta de usuario  
- Y este pierde acceso a la app  

**Escenario: Suspender empresa**  
- Dado que soy administrador  
- Cuando identifico que una empresa incumple normas  
- Entonces puedo suspender la empresa  
- Y sus productos dejan de ser visibles en la app  

---

**Fecha:** 30 de septiembre del 2025  
**Versión:** #2  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo
