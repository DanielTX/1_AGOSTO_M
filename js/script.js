document.addEventListener('DOMContentLoaded', function() {
    const matrixHearts = document.getElementById('matrixHearts');
    const heartSymbols = ['❤', '♥', '💖', '💗', '💘', '💓'];
    
    // Variables para todos los carruseles
    const carousels = [
        { element: document.getElementById('leftCarousel'), delay: 0 },
        { element: document.getElementById('rightCarousel'), delay: 0.5 },
        { element: document.getElementById('bottomLeftCarousel'), delay: 1 },
        { element: document.getElementById('bottomRightCarousel'), delay: 1.5 },
        { element: document.getElementById('centerLeftCarousel'), delay: 2 },
        { element: document.getElementById('centerRightCarousel'), delay: 2.5 },
        { element: document.getElementById('centerTopCarousel'), delay: 3 },
        { element: document.getElementById('centerBottomCarousel'), delay: 3.5 }
    ];
    
    let carouselIntervals = [];
    
    function createMatrixHearts() {
        const heart = document.createElement('div');
        heart.className = 'heart-matrix';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = 2 + Math.random() * 3 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = 10 + Math.random() * 20 + 'px';
        matrixHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    setInterval(createMatrixHearts, 100);
    
    // Función para crear orden aleatorio de imágenes para cada carrusel
    function createRandomImageOrder() {
        const baseImages = [
            "img/img1.png",
            "img/img2.png", 
            "img/img3.png",
            "img/img4.png",
            "img/img5.png",
            "img/img6.png",
            "img/img7.png",
            "img/img8.png",
            "img/img9.png",
            "img/img10.png"
        ];
        
        // Crear una copia y mezclarla
        const shuffledImages = [...baseImages];
        for (let i = shuffledImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
        }
        
        return shuffledImages;
    }
    
    // Función para configurar carrusel con imágenes aleatorias
    function setupCarouselWithRandomImages(carousel) {
        const randomImages = createRandomImageOrder();
        const slides = carousel.querySelectorAll('.carousel-slide');
        
        slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            // Asignar imagen aleatoria a cada slide
            img.src = randomImages[index % randomImages.length];
            img.alt = `Foto ${index + 1}`;
        });
    }
    
    // Función para cambiar slide del carrusel
    function nextSlide(carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const activeSlide = carousel.querySelector('.carousel-slide.active');
        const currentIndex = Array.from(slides).indexOf(activeSlide);
        const nextIndex = (currentIndex + 1) % slides.length;
        
        // Remover clase active del slide actual
        activeSlide.classList.remove('active');
        activeSlide.classList.add('prev');
        
        // Agregar clase active al siguiente slide
        slides[nextIndex].classList.add('active');
        slides[nextIndex].classList.remove('prev');
        
        // Limpiar clase prev después de la transición
        setTimeout(() => {
            slides.forEach(slide => slide.classList.remove('prev'));
        }, 800);
    }
    
    // Función para iniciar carruseles con efecto escalonado
    function startCarousels() {
        carousels.forEach((carousel, index) => {
            setTimeout(() => {
                // Configurar imágenes aleatorias para este carrusel
                setupCarouselWithRandomImages(carousel.element);
                
                // Mostrar carrusel con animación
                carousel.element.classList.add('active');
                
                // Iniciar cambio automático cada 2 segundos con offset
                const interval = setInterval(() => {
                    nextSlide(carousel.element);
                }, 2000);
                
                carouselIntervals.push(interval);
            }, carousel.delay * 1000);
        });
    }
    
    const heartBtn = document.getElementById('heartBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    
    heartBtn.addEventListener('click', function() {
        hiddenMessage.style.display = 'block';
        
        // Iniciar carruseles con efecto escalonado
        startCarousels();
        
        // Efecto de explosión de corazones
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createExplosion(x, y);
            }, i * 50);
        }
    });
    
    function createExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        explosion.style.position = 'fixed';
        explosion.style.left = x + 'px';
        explosion.style.top = y + 'px';
        explosion.style.color = `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;
        explosion.style.fontSize = '25px';
        explosion.style.zIndex = '100';
        explosion.style.transform = 'scale(0)';
        explosion.style.animation = `pop 0.5s forwards, fadeOut 0.5s 0.5s forwards`;
        
        document.body.appendChild(explosion);
        
        setTimeout(() => {
            explosion.remove();
        }, 1000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pop {
            to { transform: scale(1) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.5) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
        }
    `;
    document.head.appendChild(style);
});