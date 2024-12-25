$(document).ready(function() {
  // scroll header
  $(window).scroll(function () { 
    if(scrollY>130){
      $('.header_wrapper .header').addClass('active')
    }else{
      $('.header_wrapper .header').removeClass('active')
    }
    
  });
  // slide products
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
  // slide reviews
    var slide = new Swiper('.reviews_items',{
      slidesPerView:3,
      spaceBetween:60,
      navigation:{
        prevEl:'.reviews .prev',
        nextEl:'.reviews .next',
      }
    })
  // hover partners
    $('.partners_item').hover(
      function () {
        // Hozirgi elementga active klassini qo'shish
        $('.partners_item').removeClass('active');
        $(this).addClass('active');
  
        // // Oldingi elementni olish va active qo'shish
        // $(this).prev('.partners_item').addClass('active');
        // Hoverdan chiqishda barcha active klasslarini olib tashlash
      }
    );
    // calculate
    $(document).ready(function () {
      // Radio tugmalarni tanlaganda progress barni yangilash
      $('input[name="location"]').on('change', function () {
        updateProgress();
      });
    
      // Progress barni yangilash funksiyasi
      function updateProgress() {
        const totalOptions = $('input[name="location"]').length; // Barcha radio tugmalar soni
        const selectedIndex = $('input[name="location"]:checked').parent().index(); // Tanlangan radio indexi
        const progress = ((selectedIndex + 1) / totalOptions) * 100; // Prosentni hisoblash
        $('.progres_thumb').css('width', `${progress}%`); // Progress bar kengligini o'zgartirish
        $('.progress_number').text(progress+'%')
      }
    
      // "Назад" tugmasi logikasi (agar kerak bo'lsa)
      $('.prev_btn').on('click', function () {
        const currentChecked = $('input[name="location"]:checked');
        const prevRadio = currentChecked.parent().prev().find('input[name="location"]');
        if (prevRadio.length) {
          prevRadio.prop('checked', true).trigger('change');
        }
      });
    
      // "Далее" tugmasi logikasi (agar kerak bo'lsa)
      $('.next_btn').on('click', function () {
        const currentChecked = $('input[name="location"]:checked');
        const nextRadio = currentChecked.parent().next().find('input[name="location"]');
        if (nextRadio.length) {
          nextRadio.prop('checked', true).trigger('change');
        }
      });
    
      // Dastlab progressni yangilash
      updateProgress();
    });
    // tabs
    $('.quation_request').hide();
    $('.quation_request:first').show();
    $('.quation_item').click( function () {
      // Hamma tugmalar va ma'lumotlardan `active` klassini olib tashlash
      $('.quation_item').removeClass('active');
      $('.quation_request').fadeOut(0);
      // Joriy tugmaga `active` klassini qo'shish
      $(this).addClass('active');
      
      // Tegishli ma'lumotni ko'rsatish
      const target = $(this).data('target');
      $('.quation_request#request' + target).fadeIn(200);
      console.log($('.quation_request#request' + target).show());
      
    });
    
    
  });
  