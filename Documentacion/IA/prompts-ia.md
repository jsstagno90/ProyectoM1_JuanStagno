# Documentación de uso de IA

# Prompt 1
CONTEXTO: Estoy practicando HTML, CSS y JavaScript puro (sin frameworks).

Nivel: principiante. 

 OBJETIVO: Crear una página generadora de paletas de colores aleatorios usando manipulación del DOM. INSTRUCCIONES: 
 1. Crear dinámicamente cajas de colores. 
 2. El usuario debe poder elegir generar 6, 8 o 9 colores. 
 3. Cada caja debe tener un color aleatorio distinto. 
 4. Mostrar dentro de cada caja el valor del color generado. 
 5. Permitir elegir entre colores en formato HEX o HSL. 
 6. Agregar un botón para generar una nueva paleta. 
 7. Usar addEventListener y manipulación del DOM. 
 8. Mostrar las cajas usando CSS Grid responsive. 
 9. Centrar el contenido de la página. 

 RESTRICCIONES: 
 * No usar frameworks ni librerías. 
 * No usar APIs externas ni fetch. * Usar únicamente HTML, CSS y JavaScript puro. 
 * Mantener el código simple y entendible para principiantes. 
 * Usar buenas prácticas básicas de indentación y nombres de variables. FORMATO DE LA 
 
 RESPUESTA: 

 * Separar HTML, CSS y JavaScript. 
 * Explicar brevemente qué hace cada parte del código. 
 * Incluir comentarios simples dentro del JavaScript.

# Resultado 1

- index.html completo
- syles.css completo
- app.js completo




# Prompt 2

pasame un estilo css para las cajas de colores, que pase el mouse por encima y se agranden un poquito

# Resultado 2

.color-box {
    transition: transform 0.3s;
}

.color-box:hover {
    transform: scale(1.07);
}




# Prompt 3

Necesito hacer que las cajas de colores le pueda copiar el codigo del color al hacer click, que aparezca un cartelito html arriba en verde por unos segundos que diga, Color copiado!


# Resultado 3

Agrego lineas a:

- index.html
- syles.css
- app.js


# Prompt 4

necesito que cuando se genere el color, se genere el otro codigo abajo pero mas chiquito, ejemplo: HEX A1B2C3 y abajo el color en hsl pero mas chiquito, y visceversa


# Resultado 4

Agrega ambos codigos del color HSL y HEX


# Prompt 5

como puedo hacer para bloquear un color? osea cuando se generen los colores q aparezca un candadito y si lo apreto despues ese color queda bloqueado y se generan todos los otros

# Resultado 5
-pensemos la lógica
-codigo html y js
