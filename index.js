function setCanvasSize() {
    var canvas = document.getElementById('myCanvas');
    canvas.width = 400;  // Establece el ancho deseado
    canvas.height = 200; // Establece el alto deseado
}

// Dibuja el texto en el canvas
function drawOnCanvas(text) {
    setCanvasSize(); // Asegura que el canvas tenga el tamaño correcto
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    ctx.font = '100px Arial';
    ctx.fillStyle = 'blue';
    
    // Calcula el ancho del texto y su posición
    var textWidth = ctx.measureText(text).width;
    var x = (canvas.width - textWidth) / 2;
    var y = canvas.height / 2 + 30;
    
    ctx.fillText(text, x, y);
}

// Convierte el canvas a SVG
function convertCanvasToSVG() {
    var canvas = document.getElementById('myCanvas');
    var svgHeader = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${canvas.width}" height="${canvas.height}" fill="transparent"/>
  <text x="${canvas.width / 2}" y="${canvas.height / 2 + 30}" font-family="Arial" font-size="100" fill="black" text-anchor="middle">${document.getElementById('textInput').value}</text>
</svg>`;
    
    var blob = new Blob([svgHeader], { type: 'image/svg+xml' });
    var url = URL.createObjectURL(blob);
    return url;
}

// Voltea la imagen
function flipImage() {
    var svgURL = convertCanvasToSVG();
    
    var img = new Image();
    img.src = svgURL;
    
    img.onload = function() {
        var flippedCanvas = document.createElement('canvas');
        var flippedCtx = flippedCanvas.getContext('2d');
        
        flippedCanvas.width = img.width;
        flippedCanvas.height = img.height;
        
        // Voltea la imagen horizontalmente
        flippedCtx.translate(flippedCanvas.width / 2, flippedCanvas.height / 2);
        flippedCtx.scale(-1, 1);
        flippedCtx.drawImage(img, -img.width / 2, -img.height / 2);

        var flippedDataURL = flippedCanvas.toDataURL('image/png'); // PNG soporta transparencia
        var flippedImg = document.getElementById('flippedImage');
        flippedImg.src = flippedDataURL;
    };
}

// Actualiza el texto en el canvas cuando el usuario lo cambia
function updateText() {
    var text = document.getElementById('textInput').value;
    drawOnCanvas(text);
}

// Descargar imagen
function downloadImage() {
    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL('image/png'); // Convierte el canvas a una URL de imagen PNG
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'imagen.png'; // Nombre del archivo descargado
    link.click();
}

// Descargar imagen volteada
function downloadFlippedImage() {
    var flippedImg = document.getElementById('flippedImage');
    var dataURL = flippedImg.src; // Obtiene la URL de la imagen volteada
    
    if (dataURL) {
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'imagen_volteada.png'; // Nombre del archivo descargado
        link.click();
    } else {
        alert('No hay imagen para descargar.');
    }
}

// Configura eventos y funciones cuando la página carga
window.onload = function() {
    drawOnCanvas('12'); // Dibuja el texto inicial
    flipImage();
    document.getElementById('textInput').addEventListener('input', updateText);
    // document.getElementById('downloadButton').addEventListener('click', downloadImage);
    document.getElementById('downloadFlippedButton').addEventListener('click', downloadFlippedImage); // Añade el manejador de eventos
};
