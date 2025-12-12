📄 EFACT Frontend – Visor de Documentos (PDF, XML, CDR)

Aplicación Angular Standalone que permite autenticación mediante OAuth2, consumo de la API de EFACT y visualización de comprobantes electrónicos (PDF, XML y CDR).

Implementa:

✔ Login con OAuth2

✔ Guard y servicio de autenticación

✔ Proxy para evitar CORS

✔ Visor de documentos con estilo corporativo EFACT

✔ Panel lateral tipo miniatura

✔ Descarga / visualización directa

✔ Cierre de sesión seguro

📌 1. Tecnologías utilizadas

Tecnología	Versión

Angular Standalone	17+

TypeScript	5+

RxJS	7+

HTML / SCSS	—

OAuth2 Password Grant	—

📁 2. Estructura principal del proyecto

app/auth/services/auth.service.ts

app/auth/guards/auth.guard.ts

app/auth/pages/login/login.component.ts

app/auth/pages/login/login.html

app/auth/pages/login/login.scss

app/documents/documents.component.ts

app/documents/documents.component.html

app/documents/documents.component.scss

app/app.routes.ts

app/app.config.ts

app/app.ts / app.html / app.scss

proxy.conf.json


🚀 3. Cómo iniciar el proyecto
Instalar dependencias
npm install

Ejecutar con proxy (recomendado)
npm start


Este comando activa:

Angular Dev Server (ng serve)

Proxy hacia la API real de EFACT

URL de acceso:

http://localhost:4200/login

🔐 4. Autenticación OAuth2

El login utiliza el endpoint:

POST /api-efact-ose/oauth/token


Se envía:

grant_type=password

username

password

Authorization: Basic base64(client:secret)

El token se guarda en localStorage con la llave:

efact_access_token


El guard redirige a /login si no existe token.

📄 5. Consumo y visualización de documentos

El módulo de documentos permite cargar:

▶ PDF

Se obtiene como Blob, se convierte en URL segura y se muestra en un <iframe>.

▶ XML

Se muestra en formato legible usando <pre class="xml-viewer">.

▶ CDR

Funciona igual que XML (respuesta textual).

Endpoints consumidos:

GET /api-efact-ose/v1/pdf/:ticket
GET /api-efact-ose/v1/xml/:ticket
GET /api-efact-ose/v1/cdr/:ticket

🎨 6. Interfaz corporativa EFACT

La interfaz replica la estética general de EFACT Web:

✔ Header con logo
✔ Tabs superiores (Documento / Crear / Convertir a Factura Negociable)
✔ Panel lateral negro tipo visor PDF
✔ Área principal oscura
✔ Botones PDF, XML y CDR con colores corporativos
✔ Botón moderno para "Cerrar sesión"

El archivo styles.scss define la paleta central:

$efact-pink: #e61a73;
$efact-pink-soft: #ff6ba3;
$efact-blue: #0097d7;
$efact-dark: #111827;
$efact-gray: #6b7280;
$efact-bg: #f9fafb;

🧩 7. Explicación de las fases del proyecto
🟣 Fase 0 – Configuración base

Creación del proyecto Angular Standalone.

Configuración de rutas, appConfig y bootstrap.

Estilos globales y paleta corporativa EFACT.

Configuración de environment y proxy.

Archivos clave:

main.ts

app.config.ts

app.routes.ts

environment.ts

styles.scss

proxy.conf.json

🟣 Fase 1 – Autenticación

Implementación de login usando OAuth2 Password Grant.

Creación de AuthService.

Guard para proteger /documents.

Diseño moderno del formulario.

Archivos clave:

auth.service.ts

auth.guard.ts

login.component.ts / html / scss

🟣 Fase 2 – Seguridad aplicada

Botón “Cerrar sesión” que limpia token y redirige.

Header corporativo con usuario y estilo profesional.

Control de navegación.

Archivos clave:

logout() en AuthService

logout() en DocumentsComponent

Header HTML + SCSS

🟣 Fase 3 – Visor de documentos

Consumo de PDF, XML, CDR desde API EFACT.

Conversión segura de PDF (Blob → SafeResourceUrl).

Visualización estilizada con panel lateral.

Vista vacía, carga y errores.

Archivos clave:

documents.service.ts

documents.component.*

🌐 8. Configuración del Proxy

Archivo: proxy.conf.json

{
  "/api-efact-ose": {
    "target": "https://odin-dev.efact.pe",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}


Ejecutar Angular con:

npm start

🧪 9. Pruebas recomendadas
Caso	Resultado esperado
Login con credenciales válidas	Redirige a /documents
Login inválido	Mensaje de error
Acceder a /documents sin token	Redirige a /login
Ver PDF	Se visualiza en iframe
Ver XML / CDR	Se muestra en formato texto blanco
Cerrar sesión	Limpia token + redirige a login
📦 10. Build para producción
ng build

Pueden correr 2 maneras 

Usuario :20111193035
Contraseña : 61a77b6fda77c3a2d6b28930546c86d7f749ccf0bd4bad1e1192f13bb59f0f30

ng serve -o
ng serve --proxy-config proxy.conf.json

<img width="1919" height="1003" alt="image" src="https://github.com/user-attachments/assets/0d831c11-2163-4bfc-a866-b36ba7f604a1" />

