document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.project-card');
  
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150); 
    });
  }

  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carouselContainer => {
    const track = carouselContainer.querySelector('.carousel-track');
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const nextBtn = carouselContainer.querySelector('.carousel-btn.next');
    const prevBtn = carouselContainer.querySelector('.carousel-btn.prev');

    if (track && slides.length > 0) {
      let currentIndex = 0;
      let slideInterval;
      const slideDelay = 6000; 

      const updateCarousel = () => {
        slides.forEach(slide => {
          slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
      };

      const nextSlide = () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
      };

      const prevSlide = () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
      };

      const startTimer = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDelay);
      };

      const stopTimer = () => {
        clearInterval(slideInterval);
      };

      const resetTimer = () => {
        stopTimer();
        startTimer();
      };

      carouselContainer.addEventListener('mouseenter', stopTimer);
      carouselContainer.addEventListener('mouseleave', startTimer);

      if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
          nextSlide();
          resetTimer();
        });

        prevBtn.addEventListener('click', () => {
          prevSlide();
          resetTimer();
        });
      }

      startTimer();
    }
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const allCarouselImages = document.querySelectorAll('.carousel-slide');

  if (lightbox && lightboxImg && lightboxClose) {
    
    allCarouselImages.forEach(img => {
      if (!img.closest('a')) {
          img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
          });
      }
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

function copyNumber() {
  const phoneNumber = "540-940-9335"; 

  navigator.clipboard.writeText(phoneNumber).then(() => {
    const tooltip = document.getElementById("copyTooltip");
    
    tooltip.classList.add("show");
    
    setTimeout(() => {
      tooltip.classList.remove("show");
    }, 2500);
    
  }).catch(err => {
    console.error('Failed to copy number: ', err);
  });
}

});