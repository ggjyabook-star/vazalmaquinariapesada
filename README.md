# Vazal Maquinaria Pesada

Rediseño y optimización SEO del sitio web de **Vazal Maquinaria Pesada** — *Generando Caminos*.
Venta y renta de maquinaria pesada y ligera, trenes completos para tendido de asfalto
y construcción de obra pública y privada. Metepec, Estado de México.

🔗 Sitio actual: <https://vazalmaquinariapesada.com>

---

## Qué hay en este repositorio

| Ruta | Descripción |
|---|---|
| `ventas-y-rentas.html` | Página **Ventas y Rentas** rediseñada y optimizada. HTML + CSS + JS en un solo archivo, sin dependencias ni build. |
| `sitemap.xml` | Sitemap nuevo: host canónico sin `www`, fechas reales, sin las páginas duplicadas. |
| `robots.txt` | Robots nuevo, apuntando al sitemap correcto. |
| `.htaccess` | Redirecciones 301 (`www` → sin `www`), compresión, caché y cabeceras. **Revisar antes de subir.** |
| `SEO.md` | Diagnóstico completo y los títulos/descripciones listos para las páginas que faltan. |
| `index.html` | Portada de vista previa. Lleva `noindex` — **no subir a producción**. |
| `images/` | Logotipo, iconos y fotografía de portada. |
| `gallery/` | Fotografías de obra y equipo (originales + versiones `.webp`). |
| `brand/` | Logotipo vectorial `SVG`, icono de marca y favicons. |
| `serve.js` | Servidor estático mínimo para previsualizar en local. |

## Vista previa local

```bash
node serve.js
```

Abre <http://localhost:5173/ventas-y-rentas.html>. No requiere instalar nada: usa solo el
módulo `http` de Node.

## Decisiones técnicas

- **Sin framework ni build.** Un único `.html` autocontenido que se puede subir por FTP al
  hosting actual sin tocar el resto del sitio. Las rutas `images/` y `gallery/` coinciden
  con las que ya existen en producción.
- **Imágenes optimizadas a WebP** con fallback `<picture>` a los archivos originales:
  2.85 MB → 555 KB (**-81 %**), decisivo en conexiones móviles.
- **Logotipo vectorizado.** El original solo existía como PNG de 140 × 33 px, borroso en
  pantallas retina. Se reconstruyó como trazado SVG a partir del canal alfa.
- **Datos estructurados generados desde el propio HTML.** El bloque JSON-LD se construye
  leyendo las fichas y las preguntas de la página, así que no puede desincronizarse del
  contenido visible.

## SEO

El detalle completo está en [`SEO.md`](SEO.md). En resumen, lo que se corrigió:

**En `ventas-y-rentas.html`**

- Las 29 líneas de equipo pasaron de ser una lista de nombres a **fichas con descripción
  de uso y ancla propia** (`#eq-excavadora`, `#eq-pavimentadora`, …), enlazables desde
  WhatsApp o desde una cotización.
- Sección nueva **`#obra-publica`** para dependencias de gobierno y contratistas: los tres
  órdenes de gobierno, lo que Vazal resuelve en un contrato y la documentación para concurso.
- Sección nueva **`#preguntas`** con 8 preguntas frecuentes y marcado `FAQPage`.
- JSON-LD ampliado de 2 a **5 entidades**: `LocalBusiness`+`Organization`, `WebSite`,
  `WebPage`+`BreadcrumbList`, `ItemList` con los 29 equipos y `FAQPage`.
- Descripción acortada a 155 caracteres, `og:image:alt`, `hreflang` y `dns-prefetch`.

**A nivel de sitio**

- `sitemap.xml` y `robots.txt` nuevos, con el host canónico **sin `www`**.
- `.htaccess` que redirige `www` → sin `www` con un 301 — hoy los dos hosts responden 200
  y Google ve el sitio duplicado.
- Las tres páginas heredadas duplicadas (`rentas.html`, `respaldo.html`, `home.html`)
  salen del sitemap y se redirigen.

### Lo más importante que sigue pendiente

Las otras cinco páginas del sitio **comparten el mismo `<title>`** que la portada, así que
ninguna puede posicionar por su cuenta. Los textos de reemplazo ya están escritos en
[`SEO.md`](SEO.md), sección 3, listos para copiar y pegar.

## Pendientes que dependen del cliente

Para reforzar la credibilidad ante compradores de obra pública conviene añadir, cuando
Vazal los proporcione:

- Ficha de Google Business Profile enlazada desde el sitio.
- Obras de referencia: dependencia, tramo, año y monto.
- Registro en padrón de contratistas, RFC / razón social y pólizas de seguro.
- Coordenadas exactas del domicilio y horario de atención.
- Logotipo en vectorial (`.ai`, `.svg` o `.pdf`) y fotografías en alta resolución.

## Historial y respaldo

| Referencia | Qué es |
|---|---|
| `v1.0-pre-seo` | Etiqueta con el sitio **tal como estaba antes** de la optimización. |
| `backup/pre-seo-2026-09-13` | Rama con ese mismo estado, por si hay que volver. |

Para volver al estado anterior:

```bash
git checkout backup/pre-seo-2026-09-13
```
