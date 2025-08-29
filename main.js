// Lógica para el carrusel de testimonios
const carouselTrack = document.querySelector('.carousel-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;

function updateCarousel() {
    if (testimonialCards.length > 0) {
        const cardWidth = testimonialCards[0].offsetWidth;
        carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }
}

function changeTestimonial(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = testimonialCards.length - 1;
    } else if (currentIndex >= testimonialCards.length) {
        currentIndex = 0;
    }
    updateCarousel();
}

// Asegurarse de que el carrusel se actualice al cambiar el tamaño de la ventana
window.addEventListener('resize', updateCarousel);

// Cargar el carrusel al inicio
window.onload = updateCarousel;

// Lógica para mostrar/ocultar el menú desplegable de contacto
function toggleDropdown() {
    document.getElementById("contactDropdown").classList.toggle("show");
}

// Cierra el menú si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.contact-button')) {
        const dropdown = document.getElementById("contactDropdown");
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}

// Lógica para el menú de hamburguesa
const hamburgerButton = document.getElementById('hamburger-button');
const navLinks = document.getElementById('navLinks');

hamburgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Opcional: Cierra el menú cuando se hace clic en un enlace (navegación)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });

});

// Lógica para el modal en móviles, ahora se inicializa dentro de una función
function initializeModal() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    // Primero, removemos cualquier listener de clic previo para evitar duplicaciones.
    // Esto es crucial para que el código funcione en resize.
    const old_card = card.cloneNode(true);
    card.parentNode.replaceChild(old_card, card);
  });

  if (window.matchMedia("(max-width: 600px)").matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function() {
        const modalBg = document.querySelector('.modal-bg');
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
          <button class="modal-close">&times;</button>
          ${card.innerHTML}
        `;
        modalBg.classList.add('active');
        // Cerrar el modal
        modalContent.querySelector('.modal-close').onclick = () => {
          modalBg.classList.remove('active');
        };
        // También cerrar al tocar fuera del contenido
        modalBg.onclick = function(e) {
          if (e.target === modalBg) modalBg.classList.remove('active');
        };
      });
    });
  }
}

// Inicializar el modal al cargar la página y al cambiar el tamaño de la ventana
window.addEventListener('resize', initializeModal);

window.onload = initializeModal;