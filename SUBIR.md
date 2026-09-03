# Cómo publicar este proyecto

Todo el trabajo está hecho y confirmado en git (rama `main`). La carpeta es:

```
C:\Users\julio\OneDrive\Escritorio\Promo carlos
```

---

## Opción A — Vercel directo (la más rápida, recomendada)

**No necesita GitHub.** Sube la carpeta tal cual y devuelve una URL pública en
menos de un minuto. Es la vía recomendada para enseñarle una primera versión al
cliente.

Abre una terminal en la carpeta del proyecto y corre:

```bash
npx vercel login
```

Elige *Continue with GitHub* (o email). Se abre el navegador, inicias sesión y
listo. Después:

```bash
npx vercel --prod
```

Responde a las preguntas:

| Pregunta | Respuesta |
|---|---|
| Set up and deploy? | **Y** |
| Which scope? | tu cuenta personal |
| Link to existing project? | **N** |
| Project name? | `vazal` (Enter para aceptar) |
| In which directory is your code located? | `./` (Enter) |
| Want to modify these settings? | **N** |

Al terminar imprime la URL, tipo `https://vazal.vercel.app`. Ésa es la que le
mandas al cliente. La página del rediseño queda en:

```
https://vazal.vercel.app/ventas-y-rentas.html
```

Para publicar cambios posteriores basta con volver a correr `npx vercel --prod`.

`vercel.json` ya trae las cabeceras de caché y seguridad; `.vercelignore` deja
fuera los archivos que no son parte del sitio.

---

## Opción B — Archivo único, sin publicar nada

Si prefieres no subir nada a internet todavía:

```bash
node build-demo.js
```

Genera `vazal-ventas-y-rentas-DEMO.html` (~1 MB): la página completa con todas
las imágenes incrustadas. Se envía por correo o WhatsApp y el cliente la abre
con doble clic, sin internet ni servidor.

---

## Opción C — GitHub + Vercel (para el repositorio definitivo)

El remoto configurado es <https://github.com/ggjyabook-star/vazalmaquinariapesada>.

**Estado actual:** la sesión de `gh` en esta computadora es `fercho159-aq`, que
solo tiene permiso de lectura. Un `git push` devuelve **403**. Hay que resolver
el permiso primero, de una de estas dos formas:

### C.1 — Cambiar de cuenta en la terminal

```bash
gh auth login --hostname github.com --git-protocol https --web
```

- Si pregunta *"You're already logged into github.com as fercho159-aq…"* responde **Y**.
- Muestra un código como `A1B2-C3D4`: cópialo, presiona Enter y en el navegador
  inicia sesión **como ggjyabook-star**, pega el código y autoriza.

```bash
gh auth setup-git
git push -u origin main
```

### C.2 — Dar acceso a la cuenta actual

Desde el navegador, con la cuenta ggjyabook-star:
**Settings → Collaborators → Add people → `fercho159-aq`**.
Al aceptarse la invitación:

```bash
git push -u origin main
```

### Después del push

1. Entra a <https://vercel.com/new>.
2. **Import Git Repository** → `ggjyabook-star/vazalmaquinariapesada`.
3. *Framework Preset*: **Other**. Deja vacíos *Build Command* e *Install Command*.
4. **Deploy**.

Desde entonces, cada push a `main` se publica solo.

---

## Opción D — Hosting actual de Vazal, por FTP

La página convive con el sitio que ya existe. Copia a la raíz de
`vazalmaquinariapesada.com`:

- `ventas-y-rentas.html` (reemplaza al actual)
- la carpeta `brand/` completa
- los `.webp` nuevos dentro de `images/` y `gallery/`

Las rutas `images/` y `gallery/` coinciden con las de producción, así que las
fotos originales no hace falta volver a subirlas. **No** subas `index.html`:
es solo la portada de vista previa del repositorio.

---

## Ver el sitio en local

```bash
node serve.js
```

Luego abre <http://localhost:5173/ventas-y-rentas.html>.
