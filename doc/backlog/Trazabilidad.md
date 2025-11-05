# 🔗 Matriz de Trazabilidad (REQ ↔ HU ↔ UC ↔ Test)

| **Requisito** | **Historias de Usuario** | **Casos de Uso** | **Pruebas (TC)** |
|---------------|---------------------------|------------------|------------------|
| **RF-01: Registro de usuarios con nombres, apellidos, nombre de usuario, correo institucional, teléfono, contraseña y rol** | HU-01 | UC-01 Registrar cuenta | TC-01 Registro exitoso con correo institucional y contraseña válida.<br>TC-02 Correo inválido (sin dominio @corhuila.edu.co).<br>TC-03 Correo ya registrado → error.<br>TC-04 Contraseña con menos de 6 caracteres → error.<br>**Criterio:** Se crea la cuenta si el correo es institucional y la contraseña ≥ 6. |
| **RF-02: Validar que el correo contenga @corhuila.edu.co** | HU-01 | UC-01 Registrar cuenta | TC-05 Correo con dominio válido @corhuila.edu.co → permitido.<br>TC-06 Correo con dominio externo (ej. @gmail.com) → error.<br>**Criterio:** Solo se aceptan correos institucionales. |
| **RF-03: Enviar token de verificación y activación** | HU-01 | UC-01 Registrar cuenta | TC-07 Token válido → activa la cuenta.<br>TC-08 Token inválido → error.<br>TC-09 Token expirado → error.<br>**Criterio:** La cuenta se activa solo con token válido. |
| **RF-04: Inicio de sesión con correo o nombre de usuario y contraseña** | HU-02 | UC-02 Iniciar sesión | TC-10 Inicio exitoso con credenciales válidas.<br>TC-11 Error con contraseña incorrecta.<br>TC-12 Intento con usuario inexistente → error.<br>**Criterio:** Solo credenciales válidas permiten acceso. |
| **RF-05: Crear publicaciones con título, descripción, precio, promoción (opcional) y foto** | HU-03 | UC-03 Crear publicación | TC-13 Creación exitosa con datos válidos.<br>TC-14 Error por campos vacíos o inválidos.<br>TC-15 Error por formato de imagen no permitido.<br>**Criterio:** Publicación se crea si todos los datos son válidos. |
| **RF-06: Editar o eliminar publicaciones** | HU-04 | UC-04 Gestionar publicación | TC-16 Edición exitosa de publicación propia.<br>TC-17 Eliminación confirmada de publicación propia.<br>TC-18 Cancelación de eliminación → publicación permanece.<br>**Criterio:** Solo publicaciones propias se pueden modificar o eliminar. |
| **RF-07: Mostrar catálogo general de productos clasificados por categoría** | HU-05 | UC-05 Ver catálogo | TC-19 Visualización exitosa de todas las publicaciones activas.<br>TC-20 Mensaje “No hay publicaciones disponibles” si catálogo está vacío.<br>TC-21 Filtrado exitoso por categoría existente.<br>**Criterio:** Catálogo muestra productos por categoría o mensaje alternativo. |
| **RF-08: Mostrar detalle del producto con botón para contactar por WhatsApp** | HU-06 | UC-06 Ver detalle de producto | TC-22 Visualización con título, descripción, precio, promoción (si aplica), imagen y botón de contacto.<br>TC-23 Redirección exitosa a WhatsApp con número del emprendedor.<br>TC-24 Error si WhatsApp no está disponible.<br>**Criterio:** El detalle siempre muestra la información completa y permite contacto directo. |

---

**Fecha:** 5 de noviembre del 2025  
**Versión:** #4  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo