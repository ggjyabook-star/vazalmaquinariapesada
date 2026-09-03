# Cómo subir este proyecto

Todo el trabajo ya está hecho y **confirmado en git** (rama `main`, 2 commits).
Solo falta empujarlo a GitHub y, si se quiere, publicarlo en Vercel.

La carpeta del proyecto es:

```
C:\Users\julio\OneDrive\Escritorio\Promo carlos
```

---

## 1. Subir a GitHub

El repositorio destino es <https://github.com/ggjyabook-star/vazalmaquinariapesada>
y hay que empujar con la cuenta **ggjyabook-star** (la sesión que quedó abierta en
esta computadora es de otra cuenta, `fercho159-aq`, que solo tiene permiso de lectura).

### Opción A — con GitHub CLI (recomendada)

Abre una terminal en la carpeta del proyecto y corre, uno por uno:

```bash
gh auth login --hostname github.com --git-protocol https --web
```

- Si pregunta *"You're already logged into github.com as fercho159-aq. Do you want to re-authenticate?"* responde **Y**.
- Muestra un código como `A1B2-C3D4`: cópialo, presiona Enter, y en el navegador
  inicia sesión **como ggjyabook-star**, pega el código y autoriza.

```bash
gh auth setup-git
```

```bash
git push -u origin main
```

### Opción B — sin cambiar de cuenta

Desde el navegador, con la cuenta ggjyabook-star:
**Settings → Collaborators → Add people → `fercho159-aq`**.
En cuanto se acepte la invitación, basta con correr:

```bash
git push -u origin main
```

### Si el remoto no existiera

```bash
git remote add origin https://github.com/ggjyabook-star/vazalmaquinariapesada.git
```

---

## 2. Publicar en Vercel

Es un sitio estático puro: **no hay build, no hay dependencias**.

1. Entra a <https://vercel.com/new>.
2. **Import Git Repository** → elige `ggjyabook-star/vazalmaquinariapesada`.
3. En *Framework Preset* deja **Other**.
4. Deja vacíos *Build Command* y *Install Command*. En *Output Directory* deja la raíz (`.`).
5. **Deploy**.

En menos de un minuto queda en línea. El archivo `vercel.json` ya trae las
cabeceras de caché para que las imágenes carguen instantáneamente en visitas
repetidas.

### Alternativa por terminal

```bash
npx vercel --prod
```

---

## 3. Subir al hosting actual de Vazal (opcional)

La página está pensada para convivir con el sitio que ya existe. Basta con
copiar por FTP estos archivos a la raíz de `vazalmaquinariapesada.com`:

- `ventas-y-rentas.html` (reemplaza al actual)
- la carpeta `brand/` completa
- los archivos `.webp` nuevos dentro de `images/` y `gallery/`

Las rutas `images/` y `gallery/` coinciden con las que ya usa el servidor, así que
las fotos originales no hace falta volverlas a subir. **No** subas `index.html`:
esa es solo la portada de vista previa del repositorio.

---

## Ver el sitio en local

```bash
node serve.js
```

Luego abre <http://localhost:5173/ventas-y-rentas.html>.
