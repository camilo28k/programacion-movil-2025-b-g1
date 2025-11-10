# 🧾 Casos de Prueba – App-Nexo (Rama QA)

**Versión:** 1.0  
**Fecha:** 10 de noviembre de 2025  
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo  

---

## 📘 Estructura de Caso de Prueba

| Campo | Descripción |
|-------|--------------|
| **ID** | Identificador único (TC-XX) |
| **Título** | Qué valida la prueba |
| **Requisito** | RF / HU / UC asociado |
| **Prioridad** | Crítica, Alta, Media, Baja |
| **Precondiciones** | Estado inicial requerido |
| **Datos de prueba** | Valores o inputs |
| **Pasos** | Acciones a realizar |
| **Resultado esperado** | Resultado correcto del sistema |
| **Tipo** | Positiva / Negativa / Integración / Rendimiento |
| **Estado** | Passed / Failed / Not Run |
| **Evidencia** | Captura o log |
| **Responsable** | QA asignado |

---

## 🔹 Casos Funcionales

### TC-01 – Registro exitoso con correo institucional
- **RF:** RF-01, RF-02, RF-03  
- **Prioridad:** Crítica  
- **Precondición:** Usuario no registrado.  
- **Datos:** correo=juan@corhuila.edu.co; contraseña=123456  
- **Pasos:**  
  1. Abrir pantalla de registro.  
  2. Completar formulario con datos válidos.  
  3. Enviar formulario.  
- **Resultado esperado:** Cuenta creada (estado `pending`) y token enviado al correo institucional.  
- **Tipo:** Positiva  
- **Estado:** Passed ✅  

---

### TC-02 – Registro rechazado por dominio externo
- **RF:** RF-02  
- **Prioridad:** Alta  
- **Precondición:** N/A  
- **Datos:** correo=usuario@gmail.com  
- **Pasos:**  
  1. Abrir pantalla de registro.  
  2. Ingresar correo con dominio no institucional.  
  3. Enviar formulario.  
- **Resultado esperado:** El sistema muestra mensaje “solo se permiten correos @corhuila.edu.co”.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-03 – Contraseña menor a 6 caracteres
- **RF:** RF-01  
- **Prioridad:** Alta  
- **Precondición:** N/A  
- **Datos:** contraseña=abc  
- **Pasos:**  
  1. Completar registro con contraseña corta.  
  2. Enviar formulario.  
- **Resultado esperado:** Validación bloquea registro con mensaje “contraseña mínima de 6 caracteres”.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-04 – Correo válido pasa la validación
- **RF:** RF-02  
- **Prioridad:** Media  
- **Precondición:** N/A  
- **Datos:** correo=luisa@corhuila.edu.co  
- **Pasos:**  
  1. Ingresar correo institucional.  
  2. Continuar registro.  
- **Resultado esperado:** El correo es aceptado y se permite continuar.  
- **Tipo:** Positiva  
- **Estado:** Passed ✅  

---

### TC-05 – Correo con dominio inválido muestra error
- **RF:** RF-02  
- **Prioridad:** Media  
- **Datos:** correo=luisa@outlook.com  
- **Resultado esperado:** Mensaje de error: “correo no institucional”.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-06 – Activación de cuenta con token válido
- **RF:** RF-03  
- **Prioridad:** Crítica  
- **Precondición:** Token emitido hace <60s.  
- **Datos:** token=123456  
- **Pasos:**  
  1. Ingresar token recibido.  
  2. Confirmar activación.  
- **Resultado esperado:** Estado cambia a `active`; sistema permite login.  
- **Tipo:** Positiva  
- **Estado:** Passed ✅  

---

### TC-07 – Token inválido
- **RF:** RF-03  
- **Prioridad:** Alta  
- **Datos:** token=999999  
- **Resultado esperado:** Mensaje “token inválido”; no cambia estado de cuenta.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-08 – Token expirado permite reenvío
- **RF:** RF-03  
- **Prioridad:** Alta  
- **Precondición:** Token emitido hace >60s.  
- **Pasos:**  
  1. Ingresar token expirado.  
  2. Solicitar reenvío.  
- **Resultado esperado:** Mensaje “token expirado”; nuevo token enviado al correo.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-09 – Inicio de sesión exitoso
- **RF:** RF-04  
- **Prioridad:** Crítica  
- **Precondición:** Usuario activo.  
- **Pasos:**  
  1. Ingresar usuario y contraseña válidos.  
  2. Presionar *Iniciar sesión*.  
- **Resultado esperado:** Redirección al panel del rol correspondiente.  
- **Tipo:** Positiva  
- **Estado:** Passed ✅  

---

### TC-10 – Contraseña incorrecta
- **RF:** RF-04  
- **Prioridad:** Alta  
- **Datos:** contraseña=errónea  
- **Resultado esperado:** Mensaje “credenciales inválidas”.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-11 – Usuario inexistente
- **RF:** RF-04  
- **Prioridad:** Alta  
- **Datos:** usuario=noexiste@corhuila.edu.co  
- **Resultado esperado:** Mensaje “usuario no encontrado”.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-12 – Crear empresa exitosa
- **RF:** RF-05  
- **Prioridad:** Alta  
- **Precondición:** Usuario emprendedor sin empresa previa.  
- **Datos:** nombre=HuilApp Store; descripción=Tienda universitaria; imagen=logo.png  
- **Resultado esperado:** Empresa registrada y visible en perfil.  
- **Tipo:** Positiva  
- **Estado:** Passed ✅  

---

### TC-13 – Campos obligatorios vacíos en empresa
- **RF:** RF-05  
- **Prioridad:** Alta  
- **Datos:** nombre=“”; descripción=“x”  
- **Resultado esperado:** Validación de campos; no se crea empresa.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

### TC-14 – Imagen inválida para empresa
- **RF:** RF-05  
- **Prioridad:** Media  
- **Datos:** archivo=logo.exe  
- **Resultado esperado:** Mensaje “formato no permitido”.  
- **Tipo:** Negativa  
- **Estado:** Passed ✅  

---

## 🔹 Casos No Funcionales

### PERF-01 – Tiempo p95 del catálogo ≤ 800 ms
- **RNF:** RNF-P02  
- **Precondición:** Catálogo con ≥20 productos y red 4G/WiFi estable.  
- **Resultado esperado:** Respuesta HTTP ≤ 800 ms.  
- **Tipo:** Rendimiento  
- **Estado:** Passed ✅  

---

### PERF-02 – Carga de imagen ≤ 1.5 s
- **RNF:** RNF-P03  
- **Resultado esperado:** Imágenes cargan completamente en ≤1.5s (p95).  
- **Tipo:** Rendimiento  
- **Estado:** Passed ✅  
