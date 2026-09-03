# Vazal Maquinaria Pesada

Rediseño del sitio web de **Vazal Maquinaria Pesada** — *Generando Caminos*.
Venta y renta de maquinaria pesada y ligera, trenes completos para tendido de asfalto
y construcción de obra pública y privada. Metepec, Estado de México.

🔗 Sitio actual: <https://vazalmaquinariapesada.com>

---

## Qué hay en este repositorio

| Ruta | Descripción |
|---|---|
| `ventas-y-rentas.html` | Página **Ventas y Rentas** rediseñada. HTML + CSS + JS en un solo archivo, sin dependencias ni build. |
| `index.html` | Portada de vista previa que enlaza a la página rediseñada. |
| `images/` | Logotipo, iconos y fotografía de portada. |
| `gallery/` | Fotografías de obra y equipo (originales `.png` / `.jpg` + versiones `.webp` optimizadas). |
| `brand/` | Logotipo vectorial `SVG` reconstruido, icono de marca y favicons generados. |
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
  pantallas retina. Se reconstruyó como trazado SVG a partir del canal alfa, por lo que
  ahora es nítido a cualquier tamaño y sirve además para los favicons.
- **Accesibilidad y SEO** cuidados: jerarquía de encabezados, `alt` descriptivos, foco
  visible, `prefers-reduced-motion`, datos estructurados JSON-LD y Open Graph.

## Pendientes que dependen del cliente

Para reforzar la credibilidad ante compradores de obra pública conviene añadir, cuando
Vazal los proporcione:

- Logotipo en vectorial (`.ai`, `.svg` o `.pdf`) y fotografías en alta resolución.
- Años de operación, número de equipos propios y obras de referencia.
- Registro en padrón de contratistas, RFC / razón social y pólizas de seguro.
- URLs reales de Facebook, LinkedIn e Instagram.
