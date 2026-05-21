const paletteContainer = document.getElementById("palette-container");

const cantidadSelect = document.getElementById("cantidad");
const formatoSelect = document.getElementById("formato");

const btnGenerar = document.getElementById("btnGenerar");
const toast = document.getElementById("toast");
let mensajeTimeout;

function generarColorHEX() {

  const caracteres = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {

    const numeroRandom = Math.floor(Math.random() * 16);

    color += caracteres[numeroRandom];
  }

  return color;
}

function generarColorHSL() {

  const h = Math.floor(Math.random() * 360);

  const s = Math.floor(Math.random() * 100);

  const l = Math.floor(Math.random() * 100);

  return `HSL(${h}, ${s}%, ${l}%)`;
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
    s = Math.round(s * 100);
  }

  return `HSL(${h}, ${s}%, ${Math.round(l * 100)}%)`;
}

function hslStringToHex(hslStr) {
  const m = hslStr.match(/(\d+)\D+(\d+)%\D+(\d+)%/);
  if (!m) return "#000000";
  const h = Number(m[1]);
  const s = Number(m[2]) / 100;
  const l = Number(m[3]) / 100;

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hk = (h % 360) / 360;
    r = hue2rgb(p, q, hk + 1 / 3);
    g = hue2rgb(p, q, hk);
    b = hue2rgb(p, q, hk - 1 / 3);
  }

  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function crearPaleta() {

  paletteContainer.innerHTML = "";

  const cantidad = cantidadSelect.value;
  const formato = formatoSelect.value;

  for (let i = 0; i < cantidad; i++) {

    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");

    let color;
    let mainText = "";
    let subText = "";

    if (formato === "hex") {
      color = generarColorHEX();
      mainText = `HEX ${color}`;
      subText = hexToHsl(color);
    } else {
      color = generarColorHSL();
      mainText = color; // already like 'HSL(h, s%, l%)'
      subText = `HEX ${hslStringToHex(color)}`;
    }

    const cssColor = formato === "hex" ? color : color.replace(/^HSL/i, "hsl");
    colorBox.style.backgroundColor = cssColor;

    const mainSpan = document.createElement("div");
    mainSpan.classList.add("color-code");
    mainSpan.textContent = mainText;

    const subSpan = document.createElement("div");
    subSpan.classList.add("sub-code");
    subSpan.textContent = subText;

    colorBox.appendChild(mainSpan);
    colorBox.appendChild(subSpan);
    colorBox.addEventListener("click", () => {
      navigator.clipboard.writeText(color)
        .then(() => {
          toast.textContent = "¡Color copiado!";
          toast.classList.add("show");
          clearTimeout(mensajeTimeout);
          mensajeTimeout = setTimeout(() => {
            toast.classList.remove("show");
          }, 2000);
        })
        .catch(() => {
          toast.textContent = "No se pudo copiar.";
          toast.classList.add("show");
          clearTimeout(mensajeTimeout);
          mensajeTimeout = setTimeout(() => {
            toast.classList.remove("show");
          }, 2000);
        });
    });
    paletteContainer.appendChild(colorBox);
  }
}

btnGenerar.addEventListener("click", crearPaleta);

crearPaleta();