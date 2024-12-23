$(document).ready(function() {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4, 
      spaceBetween: 100, 
      navigation: {
        nextEl: '.products .prev',
        prevEl: '.products .next',
      },
      breakpoints: {
        0: {
            slidesPerView: 1.2,  
  
          },
        556: {
            slidesPerView: 2.4,  
  
          },
        768: {
          slidesPerView: 3,  

        },
        1024: {
            slidesPerView: 4,  // Mobilda faqat 1 ta slayd ko'rsatish
          },
      }
    });
  });
  