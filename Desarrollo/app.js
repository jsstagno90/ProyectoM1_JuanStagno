const paletteContainer = document.getElementById("palette-container");

const cantidadSelect = document.getElementById("cantidad");
const formatoSelect = document.getElementById("formato");

const btnGenerar = document.getElementById("btnGenerar");
const toast = document.getElementById("toast");
let mensajeTimeout;
let lockedColors = []; // store locked color objects per index

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

  // Ajustar array de candados a la nueva cantidad
  const cantidad = parseInt(cantidadSelect.value, 10);
  const formato = formatoSelect.value;

  if (lockedColors.length > cantidad) {
    lockedColors = lockedColors.slice(0, cantidad);
  }
  while (lockedColors.length < cantidad) {
    lockedColors.push(null);
  }

  paletteContainer.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.dataset.index = i;

    let displayMain = "";
    let displaySub = "";
    let cssColor = "";

    const locked = lockedColors[i];
    if (locked) {
      // Use the locked color exactly as it was when locked
      displayMain = locked.displayMain;
      displaySub = locked.displaySub;
      cssColor = locked.cssColor;
      colorBox.classList.add("locked");
    } else {
      // Generate new color according to current formato
      if (formato === "hex") {
        const color = generarColorHEX();
        displayMain = `HEX ${color}`;
        displaySub = hexToHsl(color);
        cssColor = color;
      } else {
        const color = generarColorHSL();
        displayMain = color; // 'HSL(h, s%, l%)'
        displaySub = `HEX ${hslStringToHex(color)}`;
        cssColor = color.replace(/^HSL/i, "hsl");
      }
    }

    colorBox.style.backgroundColor = cssColor;

    const mainSpan = document.createElement("div");
    mainSpan.classList.add("color-code");
    mainSpan.textContent = displayMain;

    const subSpan = document.createElement("div");
    subSpan.classList.add("sub-code");
    subSpan.textContent = displaySub;

    // Botón candado
    const lockBtn = document.createElement("button");
    lockBtn.classList.add("lock-btn");
    lockBtn.title = "Bloquear color";
    lockBtn.innerText = locked ? "🔒" : "🔓";
    lockBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = Number(colorBox.dataset.index);
      if (lockedColors[idx]) {
        // desbloquear
        lockedColors[idx] = null;
        colorBox.classList.remove("locked");
        lockBtn.innerText = "🔓";
        toast.textContent = "Color desbloqueado";
      } else {
        // bloquear - guardar estado exacto mostrado
        lockedColors[idx] = {
          displayMain: mainSpan.textContent,
          displaySub: subSpan.textContent,
          cssColor: cssColor,
        };
        colorBox.classList.add("locked");
        lockBtn.innerText = "🔒";
        toast.textContent = "Color bloqueado";
      }
      toast.classList.add("show");
      clearTimeout(mensajeTimeout);
      mensajeTimeout = setTimeout(() => {
        toast.classList.remove("show");
      }, 1500);
    });

    colorBox.appendChild(lockBtn);
    colorBox.appendChild(mainSpan);
    colorBox.appendChild(subSpan);

    colorBox.addEventListener("click", () => {
      // Copiar el valor principal (HEX o HSL dependiendo de cómo fue mostrado)
      const textToCopy = mainSpan.textContent.includes("HEX") ? mainSpan.textContent.split(" ")[1] : mainSpan.textContent;
      navigator.clipboard.writeText(textToCopy)
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