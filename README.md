# Cerutti Fabril

Sitio corporativo de una sola página, hecho con HTML, CSS y JavaScript sin frameworks ni dependencias de ejecución.

## Estructura

- `index.html`: página principal, contenido, metadatos y enlaces a recursos.
- `css/styles.css`: estilos, navegación responsive, galería y estados de accesibilidad.
- `js/main.js`: menú móvil, galería ampliada, validación local del formulario y controles opcionales de contacto.
- `assets/`: logo oficial, favicon, fotos originales y fotos de trabajos recuperadas de la versión anterior.
- `archive/`: respaldo histórico local, excluido del repositorio para evitar publicar contenido obsoleto.

## Ejecutar

Abrí `index.html` en el navegador o, desde esta carpeta, iniciá un servidor estático:

```bash
python3 -m http.server 8080
```

Luego visitá `http://localhost:8080`.

## Publicación

- El teléfono, correo, ubicación y WhatsApp visibles en el sitio son datos comerciales públicos.
- El formulario sólo valida los campos en el navegador y no transmite datos ni archivos. No recopila consultas hasta conectarlo a un servicio de formularios o backend.
- `archive/` contiene una copia histórica que no debe publicarse: puede tener datos de contacto de ejemplo y contenido obsoleto. Está excluida mediante `.gitignore`.
- El sitio es estático, sin API ni servidor propio. La protección contra ataques de disponibilidad depende del proveedor de hosting/CDN; Vercel anuncia mitigación DDoS automática para sus despliegues.

## Recursos

El encabezado y el pie usan `assets/logo.png` sobre una placa clara para mantener el contraste de la marca. El favicon cuadrado deriva del mismo logotipo. Las fotos antiguas incrustadas en el HTML fueron extraídas y convertidas a WebP para cargarlas como archivos separados.
