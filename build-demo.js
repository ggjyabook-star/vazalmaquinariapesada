const fs=require('fs'),path=require('path');
const ROOT=process.cwd();
let html=fs.readFileSync(path.join(ROOT,'ventas-y-rentas.html'),'utf8');

// 1. Colapsa <picture>: elimina el <source> webp y apunta el <img> al webp.
//    (webp es soportado por todos los navegadores desde 2020; evita duplicar 2.9 MB de fallbacks)
let collapsed=0;
html=html.replace(/<source\s+(data-)?srcset="([^"]+\.webp)"\s+type="image\/webp"\s*>\s*<img\s+(data-)?src="[^"]+"/g,
  (m,d1,webp,d2)=>{collapsed++;return '<img '+(d2||'')+'src="'+webp+'"';});

// 2. Incrusta cada archivo referenciado como data URI.
const MIME={'.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
let ok=0;const miss=[];const seen=new Set();
html=html.replace(/(images|gallery|brand)\/[A-Za-z0-9_.\-]+\.(webp|png|jpe?g|svg|ico)/g,(rel)=>{
  const f=path.join(ROOT,rel);
  if(!fs.existsSync(f)){miss.push(rel);return rel;}
  seen.add(rel);ok++;
  return 'data:'+MIME[path.extname(f).toLowerCase()]+';base64,'+fs.readFileSync(f).toString('base64');
});

const out=path.join(ROOT,'vazal-ventas-y-rentas-DEMO.html');
fs.writeFileSync(out,html);
console.log('<picture> colapsados:',collapsed);
console.log('Referencias incrustadas:',ok,'(',seen.size,'archivos distintos )');
if(miss.length)console.log('NO encontrados:',[...new Set(miss)].join(', '));
console.log('Tamaño final:',(fs.statSync(out).size/1048576).toFixed(2),'MB');
// 3. El manifest no aplica en un archivo suelto: se elimina para evitar un 404.
let h=fs.readFileSync(out,'utf8').replace(/\s*<link rel="manifest"[^>]*>/,'');
fs.writeFileSync(out,h);
console.log('Manifest eliminado. Tamaño:',(fs.statSync(out).size/1048576).toFixed(2),'MB');
