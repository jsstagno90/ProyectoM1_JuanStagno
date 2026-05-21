const paletteContainer = document.getElementById("palette-container");

const cantidadSelect = document.getElementById("cantidad");
const formatoSelect = document.getElementById("formato");

const btnGenerar = document.getElementById("btnGenerar");

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

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function crearPaleta() {

    paletteContainer.innerHTML = "";

    const cantidad = cantidadSelect.value;
    const formato = formatoSelect.value;

    for (let i = 0; i < cantidad; i++) {

        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");

        let color;

        if (formato === "hex") {

            color = generarColorHEX();

        } else {
            color = generarColorHSL();
        }

        colorBox.style.backgroundColor = color;
        colorBox.textContent = color;
        paletteContainer.appendChild(colorBox);
    }
}


btnGenerar.addEventListener("click", crearPaleta);


crearPaleta();