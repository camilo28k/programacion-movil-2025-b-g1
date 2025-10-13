# Matriz de Trazabilidad (REQ ↔ HU ↔ UC ↔ Test)

| **Requisito** | **Historias de Usuario** | **Casos de Uso** | **Pruebas (TC)** |
|---------------|---------------------------|------------------|------------------|
| **RF-01: Registro de usuarios con nombres, apellidos, nombre de usuario, correo institucional, teléfono, contraseña y rol** | HU-01 | UC-01 Registrar cuenta | TC-01 Registro exitoso con correo institucional/nombre de usuario y contraseña válida.<br>TC-02 Correo inválido (sin dominio @corhuila.edu.co).<br>TC-03 Correo ya registrado → error.<br>TC-04 Contraseña con menos de 8 caracteres → error.<br>**Criterio:** Se crea cuenta si correo es institucional y contraseña ≥ 8. |
| **RF-02: Validar que el correo contenga @corhuila.edu.co** | HU-01 | UC-01 Registrar cuenta | TC-05 Correo con dominio válido @corhuila.edu.co → permitido.<br>TC-06 Correo con dominio externo (ej. @gmail.com) → error.<br>**Criterio:** Solo se aceptan correos institucionales. |
| **RF-03: Enviar token de verificación y activación** | HU-01 | UC-01 Registrar cuenta | TC-07 Ingreso de token válido → activa cuenta.<br>TC-08 Token inválido → error.<br>TC-09 Token expirado → error.<br>**Criterio:** La cuenta se activa solo con token válido. |
| **RF-04: Recuperación de contraseña** | HU-03 | UC-02 Iniciar sesión | TC-10 Solicitud de recuperación con correo válido → se envía enlace/token.<br>TC-11 Solicitud con correo no registrado → error.<br>TC-12 Restablecimiento exitoso con token válido.<br>**Criterio:** El restablecimiento procede si correo existe y token es válido. |
| **RF-05: Inicio de sesión con correo o nombre de usuario y contraseña** | HU-02 | UC-02 Iniciar sesión | TC-13 Inicio exitoso con credenciales válidas.<br>TC-14 Error con contraseña incorrecta.<br>TC-15 Cuenta bloqueada tras 5 intentos fallidos.<br>**Criterio:** Solo credenciales válidas permiten acceso. |
| **RF-06: Editar perfil (nombre, descripción, foto)** | HU-04, HU-05 | UC-03 Crear empresa | TC-16 Modificación exitosa de datos válidos (nombre, descripción, foto).<br>TC-17 Error al guardar con campos vacíos/inválidos.<br>**Criterio:** Cambios se guardan si los datos son válidos. |
| **RF-07: Mostrar foto de perfil en catálogo y publicaciones** | HU-04, HU-05 | UC-03 / UC-04 | TC-18 Subida exitosa de foto válida (formato permitido).<br>TC-19 Error por formato no permitido.<br>TC-20 Error por tamaño excedido.<br>**Criterio:** Solo fotos válidas se muestran en catálogo/publicaciones. |
| **RF-08: Publicar productos/servicios (título, descripción, precio, promoción (opcional), foto/imagen)** | HU-06 | UC-04 Publicar producto | TC-21 Creación exitosa con título, descripción, precio, promoción (opcional) y foto válidos.<br>TC-22 Error por precio negativo.<br>TC-23 Error por imagen inválida.<br>**Criterio:** Publicación se crea si todos los datos son válidos. |
| **RF-09: Editar o eliminar publicaciones** | HU-07 | UC-04 Publicar producto | TC-24 Edición exitosa de publicación propia.<br>TC-25 Eliminación confirmada de publicación propia.<br>TC-26 Cancelación de eliminación → publicación permanece.<br>**Criterio:** Solo publicaciones propias se pueden modificar/eliminar. |
| **RF-10: Clasificar publicaciones en categorías** | HU-08 | UC-08 Gestionar categorías | TC-27 Publicación asignada a categoría válida.<br>TC-28 Error si no se selecciona categoría.<br>**Criterio:** Toda publicación debe tener categoría válida. |
| **RF-11: Mostrar catálogo general de productos/servicios** | HU-09 | UC-05 Ver catálogo | TC-29 Visualización exitosa de todas las publicaciones.<br>TC-30 Mensaje “No hay publicaciones disponibles” si catálogo está vacío.<br>**Criterio:** Catálogo siempre muestra publicaciones o mensaje alterno. |
| **RF-12: Filtrar por categoría** | HU-10 | UC-05 Ver catálogo | TC-31 Filtrado exitoso por categoría existente.<br>TC-32 Mensaje de “sin resultados” en categoría vacía.<br>**Criterio:** Solo se muestran productos de la categoría filtrada. |
| **RF-13: Mostrar detalle de producto con título, descripción, precio, promoción (opcional) y foto/imagen** | HU-11 | UC-05 Ver catálogo | TC-33 Visualización con título, descripción, precio, promoción (opcional) y foto.<br>TC-34 Error si falta algún dato.<br>**Criterio:** Cada publicación debe mostrar los cuatro elementos requeridos. |
| **RF-14: Botón de contacto a WhatsApp** | HU-12 | UC-06 Contactar emprendedor | TC-35 Redirección exitosa a WhatsApp con número del emprendedor.<br>TC-36 Mensaje alternativo si WhatsApp no está disponible.<br>**Criterio:** Botón siempre debe generar contacto. |
| **RF-15: Activar promoción** | HU-13 | UC-07 Activar promoción | TC-37 Activación exitosa con `is_promotion = true` y `promotion_price ≤ precio original`.<br>TC-38 Error si fecha fin < fecha inicio.<br>TC-39 Advertencia si precio promoción > precio original.<br>**Criterio:** Promoción solo se activa si producto existe, precio y fechas son válidos. |
| **RF-16: Suspender cuenta empresarios que incumplan normas (admin)** | HU-14 | UC-09 Moderar usuarios y publicaciones | TC-47 Suspensión exitosa de empresa con confirmación.<br>TC-48 Error si intenta suspender elemento inexistente.<br>**Criterio:** Solo elementos válidos pueden ser suspendidos por el administrador. |


---

**Fecha:** 30 de septiembre del 2025  
**Versión:** #2  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo