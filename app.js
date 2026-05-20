const paletteSize = document.getElementById("palette-size");
const colorFormat = document.getElementById("color-format");
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.getElementById("palette-container");  


function generateHexColor() {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return color;
}

function generateRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}       



generateBtn.addEventListener("click", () => {
    paletteContainer.innerHTML = ""; // Limpiar la paleta anterior
    const size = parseInt(paletteSize.value);
    const format = colorFormat.value;
    for (let i = 0; i < size; i++) {
        const color = format === "hex" ? generateHexColor() : generateRGBColor();
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color;
        colorBox.textContent = color;
        paletteContainer.appendChild(colorBox);
    }
});
