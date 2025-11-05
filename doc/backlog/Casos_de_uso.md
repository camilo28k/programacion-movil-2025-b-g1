# 🎯 Casos de Uso (explicación + especificación + diagrama)

## 3.1 ¿Qué es un caso de uso?  
Un caso de uso describe las interacciones entre un actor y el sistema para alcanzar un objetivo específico.  
Permite entender el comportamiento del sistema, flujos principales y excepciones posibles.

---

## 3.2 Especificación de Casos de Uso  

### UC-01: Registrar cuenta
| **Campo** | **Descripción** |
|-----------|-----------------|
| ID | UC-01 |
| Nombre | Registrar cuenta |
| Actor primario | Usuario (emprendedor o comprador) |
| Interesados | Usuario (acceso), Soporte (reducción de incidencias) |
| Precondiciones | La app está instalada |
| Postcondiciones (éxito) | Usuario registrado con estado `pending` y token enviado al correo institucional |
| Postcondiciones (fallo) | Mensaje de error si el correo no es válido o ya existe |
| Flujo principal | 1. Usuario ingresa: *first_names, last_names, email, phone, username, password y role*.<br>2. El sistema valida que el correo termine en **@corhuila.edu.co**.<br>3. Si es válido, se crea el registro en `user_account` con estado `pending` y se envía token de verificación. |
| Extensiones | • Correo ya registrado → mostrar error.<br>• Correo con dominio inválido → mostrar error. |
| Reglas de negocio | • El correo debe contener dominio **@corhuila.edu.co**.<br>• Contraseña ≥ 6 caracteres. |
| RF/RNF relacionados | • RF-01, RF-02, RF-03<br>• RNF-01<br>• RS-01, RS-03 |

---

### UC-02: Iniciar sesión
| **Campo** | **Descripción** |
|-----------|-----------------|
| ID | UC-02 |
| Nombre | Iniciar sesión |
| Actor primario | Usuario (emprendedor o comprador) |
| Interesados | Usuario (acceso), Soporte |
| Precondiciones | Usuario registrado y activo |
| Postcondiciones (éxito) | Sesión activa y acceso a funcionalidades según rol |
| Postcondiciones (fallo) | Mensaje de error, posibilidad de reintento |
| Flujo principal | 1. Usuario ingresa *username o email* y *password*.<br>2. El sistema valida credenciales.<br>3. Si son correctas, crea la sesión y redirige a la pantalla principal. |
| Extensiones | • Credenciales inválidas → mostrar error.<br>• 5 intentos fallidos → bloqueo temporal. |
| Reglas de negocio | • Solo usuarios registrados pueden iniciar sesión. |
| RF/RNF relacionados | • RF-04<br>• RNF-01<br>• RS-02, RS-03 |

---

### UC-03: Crear empresa
| **Campo** | **Descripción** |
|-----------|-----------------|
| ID | UC-03 |
| Nombre | Crear empresa |
| Actor primario | Emprendedor |
| Interesados | Usuario (perfil completo) |
| Precondiciones | Usuario activo y sin empresa asociada |
| Postcondiciones (éxito) | Empresa creada y disponible para agregar productos |
| Postcondiciones (fallo) | No se crea la empresa; mensaje de error por datos inválidos o empresa existente |
| Flujo principal | 1. Emprendedor inicia sesión.<br>2. Selecciona “Crear empresa”.<br>3. Ingresa: *name, description, url (logo/foto/imagen)*.<br>4. El sistema guarda la empresa asociada a su `owner_account_id`. |
| Extensiones | • Usuario ya tiene empresa → mostrar error.<br>• Datos incompletos → mensaje de validación. |
| Reglas de negocio | • Cada usuario solo puede tener una empresa registrada. |
| RF/RNF relacionados | • RF-06 (si se incluye formalmente como nueva función de creación de empresa)<br>• RNF-01<br>• RS-04 |

---

### UC-04: Publicar producto o servicio
| **Campo** | **Descripción** |
|-----------|-----------------|
| ID | UC-04 |
| Nombre | Publicar producto o servicio |
| Actor primario | Emprendedor |
| Interesados | Usuario (comprador) |
| Precondiciones | Usuario con empresa registrada |
| Postcondiciones (éxito) | Producto creado y visible en el catálogo general |
| Postcondiciones (fallo) | Producto no creado; mensaje de error por datos inválidos |
| Flujo principal | 1. Emprendedor accede a su empresa.<br>2. Selecciona “Agregar producto/servicio”.<br>3. Ingresa: *title, description, price, promotion_price (opcional), url (imagen/foto)*.<br>4. El sistema guarda el producto vinculado a la empresa. |
| Extensiones | • Imagen no válida → mostrar error.<br>• Precio negativo → mensaje de validación. |
| Reglas de negocio | • El producto debe estar vinculado a una empresa existente.<br>• La imagen debe pesar ≤ 5MB. |
| RF/RNF relacionados | • RF-06, RF-08<br>• RNF-03<br>• RS-04 |

---

### UC-05: Ver catálogo general
| **Campo** | **Descripción** |
|-----------|-----------------|
| ID | UC-05 |
| Nombre | Ver catálogo general |
| Actor primario | Comprador |
| Interesados | Usuario |
| Precondiciones | Usuario registrado |
| Postcondiciones (éxito) | Listado de productos visibles por categoría |
| Postcondiciones (fallo) | No se muestran productos; mensaje “No hay productos disponibles” |
| Flujo principal | 1. Comprador accede al catálogo general.<br>2. El sistema muestra productos: *title, description, price, promotion_price (si aplica), url (imagen/foto)*.<br>3. El usuario puede filtrar por categoría. |
| Extensiones | • Sin productos en categoría → mensaje “No hay productos disponibles”. |
| Reglas de negocio | • Solo se muestran productos activos y aprobados.<br>• El catálogo debe cargarse en ≤ 3 segundos. |
| RF/RNF relacionados | • RF-08, RF-09, RF-10<br>• RNF-02 |

---

### UC-06: Contactar emprendedor
| **Campo** | **Descripción** |
|-----------|-----------------|
| ID | UC-06 |
| Nombre | Contactar emprendedor |
| Actor primario | Comprador |
| Interesados | Usuario |
| Precondiciones | Producto visible |
| Postcondiciones (éxito) | Redirección a WhatsApp con el número del emprendedor |
| Postcondiciones (fallo) | No se abre WhatsApp; mensaje de error o alternativa |
| Flujo principal | 1. Comprador selecciona un producto.<br>2. Presiona “Contactar”.<br>3. El sistema abre `wa.me/{phone}`. |
| Extensiones | • Número no disponible → mostrar error.<br>• WhatsApp no instalado → mensaje alternativo. |
| Reglas de negocio | • Solo se permite contactar si el emprendedor tiene productos activos. |
| RF/RNF relacionados | • RF-09<br>• RS-03 |

---

### UC-07: Activar promoción
| **Campo** | **Descripción** |
|-----------|-----------------|
| ID | UC-07 |
| Nombre | Activar promoción |
| Actor primario | Emprendedor |
| Interesados | Usuario |
| Precondiciones | Producto existente sin promoción activa |
| Postcondiciones (éxito) | Promoción activada y visible en el catálogo |
| Postcondiciones (fallo) | Producto no actualizado; error por datos inválidos |
| Flujo principal | 1. Emprendedor selecciona un producto existente.<br>2. Ingresa el *promotion_price* deseado.<br>3. Activa la promoción mediante el campo `is_promotion`.<br>4. El sistema valida:<br>• Que *promotion_price* ≤ precio original.<br>5. Si la validación es correcta, se actualiza el producto con la promoción activa. |
| Extensiones | • Precio oferta mayor al original → advertencia y no activar. |
| Reglas de negocio | • Las promociones se activan sobre productos existentes.<br>• El precio promocional no puede ser mayor al original. |
| RF/RNF relacionados | • RF-10<br>• RNF-01<br>• RS-04 |

---

## 3.3 Diagrama de casos de uso (PlantUML)  

![Caso de Uso](../Imagenes/CASO_DE_USO.png)

---

## 3.4 Diagramas de actividad de las UC (opcional)  

#### UC-01: Registrar cuenta
![Diagrama UC-01](../Imagenes/UC-01.png)

---  

#### UC-02: Iniciar sesión
![Diagrama UC-02](../Imagenes/UC-02.png)

--- 

#### UC-03: Crear empresa
![Diagrama UC-03](../Imagenes/UC-03.png)

--- 

#### UC-04: Publicar producto o servicio
![Diagrama UC-04](../Imagenes/UC-04.png)

--- 

#### UC-05: Ver catálogo de productos
![Diagrama UC-05](../Imagenes/UC-05.png)

--- 

#### UC-06: Contactar emprendedor
![Diagrama UC-06](../Imagenes/UC-06.png)

--- 

#### UC-07: Activar promoción
![Diagrama UC-07](../Imagenes/UC-07.png)

---

**Fecha:** 5 de noviembre del 2025  
**Versión:** #4   
**Responsables:**  
- Danay Mariana Pereira Ospina  
- Harold Camilo Barrera Giraldo