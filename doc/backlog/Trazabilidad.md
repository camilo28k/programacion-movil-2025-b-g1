# 🔗 Matriz de Trazabilidad (REQ ↔ HU ↔ UC ↔ Test)

| **Requisito (RF)** | **Historias de Usuario (HU)** | **Casos de Uso (UC)** | **Pruebas (TC)** |
|--------------------|------------------------------|-----------------------|------------------|
| **RF-01:** El sistema debe permitir el registro de las personas con nombres, apellidos, correo institucional, teléfono, rol, nombre usuario y contraseña. | HU-01 | UC-01 Registrar cuenta | TC-01 Registro exitoso con correo institucional y contraseña ≥ 6.<br>TC-02 Correo duplicado → error.<br>TC-03 Contraseña con menos de 6 caracteres → error.<br>**Criterio:** Registro válido crea cuenta y envía token. |
| **RF-02:** El sistema debe validar que el correo contenga el dominio @corhuila.edu.co. | HU-01 | UC-01 Registrar cuenta | TC-04 Correo válido con dominio → permitido.<br>TC-05 Correo con dominio externo → error.<br>**Criterio:** Solo se aceptan correos institucionales. |
| **RF-03:** El sistema debe enviar un token de verificación al correo institucional con vigencia de 1 minuto y permitir solicitar uno nuevo si expira. Luego, permitir activación mediante dicho token. | HU-01, HU-03 | UC-01 Registrar cuenta | TC-06 Token válido → activa cuenta.<br>TC-07 Token inválido → error.<br>TC-08 Token expirado → reenviar token.<br>**Criterio:** La cuenta se activa solo con token validado. |
| **RF-04:** El sistema debe permitir iniciar sesión con correo institucional o usuario y contraseña previamente registrados. | HU-02 | UC-02 Iniciar sesión | TC-09 Inicio exitoso con credenciales válidas.<br>TC-10 Contraseña incorrecta → error.<br>TC-11 Usuario inexistente → error.<br>**Criterio:** Acceso solo con credenciales válidas. |
| **RF-05:** El emprendedor debe poder crear una empresa con nombre, descripción e imagen opcional. | HU-03 | UC-03 Registrar empresa | TC-12 Empresa creada exitosamente.<br>TC-13 Campos obligatorios vacíos → error.<br>TC-14 Imagen inválida → error.<br>**Criterio:** Empresa registrada habilita creación de publicaciones. |
| **RF-06:** El emprendedor debe poder crear publicaciones de productos con título, descripción, precio, promoción (opcional) y foto. | HU-04, HU-05 | UC-04 Crear publicación | TC-15 Publicación creada con datos válidos.<br>TC-16 Campos vacíos o inválidos → error.<br>**Criterio:** Publicación aparece en el catálogo si es válida. |
| **RF-07:** El emprendedor debe poder editar o eliminar sus publicaciones. | HU-05 | UC-05 Gestionar publicación | TC-17 Edición exitosa.<br>TC-18 Eliminación confirmada.<br>TC-19 Cancelación → publicación permanece.<br>**Criterio:** Solo el dueño puede modificar o eliminar. |
| **RF-08:** El sistema debe mostrar un catálogo general con todas las publicaciones, clasificadas por categoría. | HU-06 | UC-06 Ver catálogo | TC-20 Se muestran las publicaciones.<br>TC-21 Catálogo vacío → mensaje “No hay publicaciones disponibles”.<br>TC-22 Filtrado exitoso por categoría.<br>**Criterio:** Siempre lista publicaciones o muestra mensaje alternativo. |
| **RF-09:** Cada publicación debe mostrar título, descripción, precio, promoción (si aplica), foto y un botón para contactar al emprendedor por WhatsApp. | HU-07 | UC-07 Ver detalle de producto | TC-23 Se muestra información completa.<br>TC-24 WhatsApp abre correctamente.<br>TC-25 WhatsApp no disponible → mensaje de error.<br>**Criterio:** El detalle del producto siempre permite contacto directo. |
---

**Fecha:** 6 de noviembre del 2025  
**Versión:** #4  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo