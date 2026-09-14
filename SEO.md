# SEO de Vazal Maquinaria Pesada

Estado del sitio, qué se corrigió en este repositorio y qué falta hacer en las
páginas que todavía no están rediseñadas.

Fecha de la revisión: **13 de septiembre de 2026**
Host canónico: **`https://vazalmaquinariapesada.com`** (sin `www`)

---

## 1. Los tres problemas graves que encontramos en producción

### 1.1 Las 9 páginas tienen el mismo `<title>`

Todas las páginas del sitio en vivo comparten exactamente este título:

> `Vazal Maquinaria Pesada - Vazal - Generando Caminos`

Para Google esto significa que ninguna página tiene un tema propio. No hay forma
de que `contacto.html` posicione para "contacto" ni que `maquinaria-ligera.html`
posicione para "renta de planta de luz". Es, con diferencia, lo que más frena al
sitio hoy.

**Se corrigió** en `ventas-y-rentas.html`.
**Falta** en las otras cinco páginas — los textos están en la sección 3.

### 1.2 `www` y sin `www` responden las dos con 200

```
https://vazalmaquinariapesada.com/      → 200
https://www.vazalmaquinariapesada.com/  → 200   (sin redirección)
```

Google ve dos sitios completos con el mismo contenido y reparte la autoridad
entre los dos. Encima, el sitemap anterior apuntaba a `www` mientras que las
páginas no declaran ningún `canonical`, así que no hay ninguna señal que
desempate.

**Solución incluida:** el archivo `.htaccess` de este repositorio redirige
`www` → sin `www` con un 301, y fuerza HTTPS.
**Acción:** subir `.htaccess` a la raíz del hosting.

### 1.3 Tres páginas duplicadas heredadas

| URL | Tamaño | Qué es |
|---|---|---|
| `/rentas.html` | 70.7 KB | Copia de Ventas y Rentas |
| `/respaldo.html` | 70.8 KB | Copia de Ventas y Rentas |
| `/home.html` | 52.9 KB | Copia de la portada |

Las tres estaban en el sitemap anterior, compitiendo contra las páginas buenas.

**Solución incluida:** salen del sitemap nuevo y el `.htaccess` las redirige con
un 301 a la página que corresponde.
**Antes de subir:** confirmar con Vazal que ninguna se use; si alguna sí se usa,
borrar esa línea del `.htaccess`.

> Ojo: **no** se bloquean en `robots.txt` a propósito. Si se bloquearan, Google
> no podría rastrearlas, nunca vería el 301 y seguirían indexadas para siempre.

---

## 2. Qué se hizo en `ventas-y-rentas.html`

### Fichas de equipo

Las 29 líneas de equipo eran una lista de nombres sueltos. Ahora cada una es una
ficha con **nombre, descripción de uso real y ancla propia**:

```
#eq-excavadora     #eq-motoconformadora   #eq-pavimentadora
#eq-retroexcavadora #eq-payloader         #eq-perfiladora   …
```

Esto cambia dos cosas:

- Google indexa términos que antes no existían en la página: "carga de material",
  "subrasante", "base hidráulica", "riego de liga", "bacheo", "cepa de tubería".
- Se puede enlazar directo a un equipo desde WhatsApp o desde una cotización:
  `…/ventas-y-rentas.html#eq-excavadora`.

### Panel de obra pública

Sección nueva `#obra-publica` dirigida a dependencias y contratistas, con los
tres órdenes de gobierno (federal, estatal, municipal), lo que Vazal resuelve en
un contrato y la documentación para concurso.

Cubre búsquedas que antes no tocaba ninguna página: "maquinaria para obra
pública", "renta de maquinaria para licitación", "proveedor de maquinaria
gobierno", "bacheo municipal".

### Preguntas frecuentes

Sección `#preguntas` con 8 preguntas reales y marcado `FAQPage`. Es el tipo de
resultado enriquecido más fácil de ganar en Google, y responde las objeciones
justo antes del formulario.

### Datos estructurados

El bloque JSON-LD pasó de 2 entidades a **5**, y se genera automáticamente
leyendo el propio HTML, así que no se puede desincronizar:

| Entidad | Contenido |
|---|---|
| `LocalBusiness` + `Organization` | Domicilio, dos teléfonos, dos contactos, 7 zonas atendidas, 10 temas, 7 servicios |
| `WebSite` | Identidad del sitio |
| `WebPage` + `BreadcrumbList` | Ruta de navegación |
| `ItemList` | Los 29 equipos con descripción y ancla |
| `FAQPage` | Las 8 preguntas |

Dentro de `LocalBusiness` va además un `OfferCatalog` con los 29 equipos
separados en pesada, ligera y tren de asfalto.

### Iconos rediseñados

Las cuatro tarjetas de líneas de equipo usaban PNG de clipart genérico en naranja y
turquesa, colores que no existen en la paleta de Vazal. Se sustituyeron por SVG
dibujados a la medida en ámbar, acero y negro: excavadora, plancha vibradora, casco
de obra sobre camino y vibrocompactador tándem. Los tres iconos de la franja ámbar
también cambiaron de genéricos (escudo, caja, globo) a propios del giro.

Además de verse de la marca, ahora son vectoriales: nítidos en cualquier pantalla y
sin peticiones de red.

---

## 2 bis. Página nueva: `notas.html`

Sección editorial con seis notas para clientes, pensada para posicionar por búsquedas
informativas y para sostener que Vazal sabe de lo que habla:

| # | Nota | Tipo |
|---|---|---|
| 01 | Trasladar una máquina por carretera federal | Normatividad |
| 02 | Lo que la STPS espera antes de encender | Seguridad |
| 03 | Qué revisar al recibir una máquina rentada | Recomendación |
| 04 | Compactación: por qué en capas | Técnica de obra |
| 05 | A dónde va legalmente el escombro | Normatividad |
| 06 | Cómo leer una cotización de renta | Recomendación |

Lleva `CollectionPage` + `ItemList` de seis `Article` en JSON-LD, y está enlazada
desde el menú, el pie y la sección de preguntas de Ventas y Rentas.

> **Antes de publicar:** las notas 01, 02 y 05 citan normas oficiales mexicanas
> (NOM-012-SCT-2-2017, NOM-004/017/031-STPS y NOM-161-SEMARNAT-2011). Las normas se
> reforman y cada estado y municipio añade lo suyo, así que conviene que el
> responsable técnico de Vazal confirme que las referencias siguen vigentes. La
> página incluye un aviso al pie que aclara que el contenido es informativo y no
> sustituye a la norma ni a una asesoría.

---

### Otros ajustes

- Descripción acortada a 155 caracteres para que Google no la corte.
- `og:image:alt` y `twitter:image:alt` para redes sociales.
- `hreflang` autorreferencial `es-mx` + `x-default`.
- `dns-prefetch` al dominio de Facebook por el iframe.
- Enlaces a las secciones nuevas desde el pie de página.

---

## 3. Títulos y descripciones para las páginas que faltan

Copiar tal cual dentro del `<head>` de cada página en producción. Los títulos
están por debajo de 60 caracteres y las descripciones por debajo de 155, que es
lo que Google alcanza a mostrar.

### `/` e `/index.html` — portada

```html
<title>Vazal Maquinaria Pesada | Renta y Venta en Edo. de México</title>
<meta name="description" content="Renta y venta de maquinaria pesada y ligera, trenes de asfalto y obra pública en toda México. Base en Metepec. Cotiza al 722 896 4282.">
<link rel="canonical" href="https://vazalmaquinariapesada.com/">
```

### `/quienes-somos-.html`

```html
<title>Quiénes Somos | Arrendadora Vazal, S.A. de C.V.</title>
<meta name="description" content="Arrendadora Vazal, S.A. de C.V.: maquinaria pesada para obra pública y privada, minería y petroquímica, con cobertura en toda la República.">
<link rel="canonical" href="https://vazalmaquinariapesada.com/quienes-somos-.html">
```

> La URL tiene un guion de más (`quienes-somos-.html`). Cambiarla ahora costaría
> más de lo que vale: habría que redirigir la vieja y se perdería el historial.
> Dejarla así y ganar en el título.

### `/obras.html`

```html
<title>Obras y Proyectos Ejecutados | Vazal Maquinaria Pesada</title>
<meta name="description" content="Obras de tendido de asfalto, terracerías, nivelación y excavación ejecutadas por Vazal en obra pública y privada en México.">
<link rel="canonical" href="https://vazalmaquinariapesada.com/obras.html">
```

> Esta es la página con más potencial sin explotar. Si Vazal aporta dependencia,
> tramo, año y monto de cada obra, se vuelve la prueba de credibilidad más fuerte
> del sitio frente a un comprador de gobierno.

### `/maquinaria-ligera.html`

```html
<title>Renta de Maquinaria Ligera en Toluca y Metepec | Vazal</title>
<meta name="description" content="Renta de planta de luz, compresor de aire, bailarina, plancha vibradora, bomba de agua y cortadora de concreto. Entrega en obra.">
<link rel="canonical" href="https://vazalmaquinariapesada.com/maquinaria-ligera.html">
```

### `/contacto.html`

```html
<title>Contacto | Vazal Maquinaria Pesada en Metepec</title>
<meta name="description" content="Cotiza maquinaria pesada y ligera. Tel. 722 896 4282 y 722 908 8883. Priv. Melchor Ocampo 179-227, Espíritu Santo, Metepec, Edo. de México.">
<link rel="canonical" href="https://vazalmaquinariapesada.com/contacto.html">
```

---

## 4. Qué subir a producción

Del hosting actual (Apache, por FTP):

| Archivo | Qué hace |
|---|---|
| `ventas-y-rentas.html` | La página rediseñada |
| `notas.html` | Página nueva de notas de obra |
| `sitemap.xml` | Reemplaza el anterior (tenía `www` y fechas de 2021) |
| `robots.txt` | Reemplaza el anterior (apuntaba al sitemap con `www`) |
| `.htaccess` | Redirecciones 301, compresión y caché — **revisar antes** |
| `images/` `gallery/` `brand/` | Solo los archivos nuevos |

**No subir** `index.html`: es la pantalla de vista previa del rediseño y
borraría la portada real. Lleva `noindex` justamente por eso.

### Después de subir

1. En Google Search Console, dar de alta la propiedad **sin `www`** y marcarla
   como preferida.
2. Reenviar `sitemap.xml`.
3. Pedir indexación de `ventas-y-rentas.html`.
4. Comprobar en el probador de resultados enriquecidos de Google que aparezcan
   `FAQPage`, `LocalBusiness` y `BreadcrumbList`.
5. Pedir indexación también de `notas.html`.
5. Verificar que `https://www.vazalmaquinariapesada.com` redirija con 301.

---

## 5. Pendientes que dependen de Vazal

Ordenados por lo que más mueve la aguja:

1. **Ficha de Google Business Profile.** Para búsquedas como "renta de maquinaria
   cerca de mí" pesa más que todo el resto junto. Hoy no está enlazada desde el sitio.
2. **Obras de referencia** con dependencia, tramo, año y monto, para `obras.html`.
3. **Registro en padrón de contratistas** y su número, si aplica. Hay un bloque
   preparado en el panel de obra pública, marcado con un comentario en el HTML.
4. **Coordenadas exactas del domicilio**, para añadir `geo` al `LocalBusiness`.
   No se inventaron a propósito: un pin mal puesto es peor que no tenerlo.
5. **Horario de atención**, para añadir `openingHoursSpecification`.
6. **Reseñas de clientes**, para poder marcar `AggregateRating`.

---

## 6. Nota sobre el despliegue en Vercel

`vercel.json` manda `X-Robots-Tag: noindex` en todo el despliegue. Es a
propósito: el despliegue de Vercel es una vista previa y no debe competir en
Google contra `vazalmaquinariapesada.com`.

**Si algún día el sitio real se muda a Vercel, hay que quitar esa cabecera**, o
el sitio entero quedará invisible para Google.
