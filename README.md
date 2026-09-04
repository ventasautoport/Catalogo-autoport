# AUTOPORT Catálogo V3

Esta versión mantiene el catálogo de la V2 pero agrega un **panel privado con inicio de sesión por correo + contraseña** y guarda los cambios online con Firebase.

## Cambio de estructura solicitado

Las tres opciones:
- Tablillas microperforadas
- Tablillas ciega
- Tablillas esterilla

ya NO están dentro de Persianas. Ahora forman una categoría independiente llamada **TABLILLAS**.

## Importante sobre el acceso privado

GitHub Pages por sí solo es alojamiento estático y no puede guardar de forma segura una contraseña de administrador. Por eso esta versión usa Firebase Authentication + Firestore.

La contraseña NO se escribe en el código. Se crea y administra desde Firebase Authentication.

## Configuración inicial

1. Crear un proyecto en Firebase.
2. Registrar una aplicación Web.
3. Habilitar Authentication > Sign-in method > Email/Password.
4. Crear un usuario administrador con tu correo y una contraseña fuerte.
5. Crear Firestore Database.
6. Copiar la configuración de la aplicación Web a `firebase-config.js`.
7. Cambiar `ADMIN_EMAIL` por tu correo.
8. En Firestore Rules pegar `firestore.rules` y reemplazar el correo de ejemplo.
9. Volver a publicar estos archivos en GitHub Pages.

La documentación oficial de Firebase para correo + contraseña:
https://firebase.google.com/docs/auth/web/password-auth

## Fotos

El panel ya deja guardar URL de foto principal, ANTES y DESPUÉS. Si querés que desde el panel haya un botón "Subir foto" y que las imágenes queden almacenadas en la nube, hay que habilitar Cloud Storage de Firebase y añadir sus reglas.

Nota actual: Firebase indica que Cloud Storage requiere el plan Blaze para proyectos nuevos; revisá el plan y los límites/precios antes de activarlo.

## Flujo final

Cliente:
https://TUUSUARIO.github.io/TUREPOSITORIO/

Administrador:
https://TUUSUARIO.github.io/TUREPOSITORIO/login.html

Después de iniciar sesión correctamente:
https://TUUSUARIO.github.io/TUREPOSITORIO/admin.html


## V4 - diseño AUTOPORT
Esta versión usa el logo real proporcionado por AUTOPORT y una identidad visual basada en rojo, negro y blanco, con una estética más premium/industrial.
Las Tablillas siguen siendo una sección independiente de Persianas.
