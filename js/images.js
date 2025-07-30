// Configuración de imágenes para los carruseles
const imageConfig = {
    // Imágenes agregadas por el usuario
    images: [
        "img/img1.png",
        "img/img2.png", 
        "img/img3.png",
        "img/img4.png",
        "img/img5.png",
        "img/img6.png",
        "img/img7.png",
        "img/img8.png",
        "img/img9.png",
        "img/img10.png",
        "img/ramo.png"
    ]
};

// Función para actualizar todas las imágenes de los carruseles
function updateAllCarouselImages() {
    const carousels = document.querySelectorAll('.photo-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide img');
        
        slides.forEach((img, index) => {
            // Usar la imagen correspondiente del array, o la primera si no hay suficientes
            const imageIndex = index % imageConfig.images.length;
            img.src = imageConfig.images[imageIndex];
            img.alt = `Foto ${index + 1}`;
        });
    });
}

// Función para agregar nuevas imágenes dinámicamente
function addNewImage(imagePath) {
    imageConfig.images.push(imagePath);
    updateAllCarouselImages();
}

// Función para cambiar todas las imágenes de una vez
function changeAllImages(newImages) {
    imageConfig.images = newImages;
    updateAllCarouselImages();
}

// Función para mezclar las imágenes aleatoriamente
function shuffleImages() {
    for (let i = imageConfig.images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageConfig.images[i], imageConfig.images[j]] = [imageConfig.images[j], imageConfig.images[i]];
    }
    updateAllCarouselImages();
}

// Ejemplo de uso:
// Para agregar una nueva imagen:
// addNewImage("img/nueva-foto.jpg");

// Para cambiar todas las imágenes:
// changeAllImages([
//     "img/foto1.jpg",
//     "img/foto2.jpg", 
//     "img/foto3.jpg"
// ]);

// Para mezclar las imágenes aleatoriamente:
// shuffleImages();

// Actualizar imágenes cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Ya no mezclamos automáticamente, el nuevo sistema se encarga de esto
    // updateAllCarouselImages();
}); 