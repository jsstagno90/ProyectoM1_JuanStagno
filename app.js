// Contenedor donde van las cajas
const paletteContainer = document.getElementById("palette-container");

// Selects
const cantidadSelect = document.getElementById("cantidad");
const formatoSelect = document.getElementById("formato");

// Botón
const btnGenerar = document.getElementById("btnGenerar");


// -----------------------------
// FUNCIÓN PARA COLOR HEX
// -----------------------------
function generarColorHEX() {

    const caracteres = "0123456789ABCDEF";

    let color = "#";

    // Genera 6 caracteres aleatorios
    for (let i = 0; i < 6; i++) {

        const numeroRandom = Math.floor(Math.random() * 16);

        color += caracteres[numeroRandom];
    }

    return color;
}


// -----------------------------
// FUNCIÓN PARA COLOR HSL
// -----------------------------
function generarColorHSL() {

    const h = Math.floor(Math.random() * 360);

    const s = Math.floor(Math.random() * 100);

    const l = Math.floor(Math.random() * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}


// -----------------------------
// CREAR PALETA
// -----------------------------
function crearPaleta() {

    // Limpiar cajas anteriores
    paletteContainer.innerHTML = "";

    // Cantidad elegida
    const cantidad = cantidadSelect.value;

    // Formato elegido
    const formato = formatoSelect.value;

    // Crear cajas
    for (let i = 0; i < cantidad; i++) {

        // Crear div
        const colorBox = document.createElement("div");

        // Agregar clase
        colorBox.classList.add("color-box");

        let color;

        // Elegir formato
        if (formato === "hex") {

            color = generarColorHEX();

        } else {

            color = generarColorHSL();
        }

        // Aplicar color
        colorBox.style.backgroundColor = color;

        // Mostrar texto del color
        colorBox.textContent = color;

        // Agregar caja al contenedor
        paletteContainer.appendChild(colorBox);
    }
}


// -----------------------------
// EVENTO BOTÓN
// -----------------------------
btnGenerar.addEventListener("click", crearPaleta);


// Generar una paleta al cargar
crearPaleta();