# 🔗 Matriz de Trazabilidad (REQ ↔ HU ↔ UC ↔ Test)

| **Requisito (RF)** | **Historias de Usuario (HU)** | **Casos de Uso (UC)** | **Pruebas (TC)** |
|--------------------|------------------------------|-----------------------|------------------|
| **RF-01:** El sistema debe permitir el registro de las personas con nombres, apellidos, correo institucional, teléfono, rol, nombre usuario y contraseña. | HU-01 | UC-01 Registrar cuenta | TC-01 Registro exitoso con correo institucional y contraseña ≥ 6.<br>TC-02 Correo duplicado → error.<br>TC-03 Contraseña con menos de 6 caracteres → error.<br>**Criterio:** Registro válido crea cuenta y envía token. |
| **RF-02:** El sistema debe validar que el correo contenga el dominio @corhuila.edu.co. | HU-01 | UC-01 Registrar cuenta | TC-04 Correo válido con dominio → permitido.<br>TC-05 Correo con dominio externo → error.<br>**Criterio:** Solo se aceptan correos institucionales. |
| **RF-03:** El sistema debe enviar un token de verificación al correo institucional con vigencia de 1 minuto y permitir solicitar uno nuevo si expira. Luego, permitir activación mediante dicho token. | HU-01, HU-03 | UC-01 Registrar cuenta | TC-06 Token válido → activa cuenta.<br>TC-07 Token inválido → error.<br>TC-08 Token expirado → reenviar token.<br>**Criterio:** La cuenta se activa solo con token validado. |
| **RF-04:** El sistema debe permitir iniciar sesión con correo institucional o usuario y contraseña previamente registrados. | HU-02 | UC-02 Iniciar sesión | TC-09 Inicio exitoso con credenciales válidas.<br>TC-10 Contraseña incorrecta → error.<br>TC-11 Usuario inexistente → error.<br>**Criterio:** Acceso solo con credenciales válidas. |
| **RF-05:** El emprendedor debe poder crear una empresa con nombre, descripción e imagen opcional. | HU-04 | UC-03 Crear empresa | TC-12 Empresa creada exitosamente.<br>TC-13 Campos obligatorios vacíos → error.<br>TC-14 Imagen inválida → error.<br>**Criterio:** Empresa registrada habilita creación de publicaciones. |
| **RF-06:** El emprendedor debe poder crear publicaciones de productos con título, descripción, precio, promoción (opcional) y foto. | HU-05 | UC-04 Publicar producto o servicio, UC-05 Activar promoción | TC-15 Publicación creada con datos válidos.<br>TC-16 Campos vacíos o inválidos → error.<br>TC-17 Activación de promoción exitosa (precio ≤ original).<br>TC-18 Precio oferta > original → advertencia.<br>**Criterio:** Publicación visible y promoción activa solo si cumple validaciones. |

---

**Fecha:** 14 de noviembre del 2025  
**Versión:** #5  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo