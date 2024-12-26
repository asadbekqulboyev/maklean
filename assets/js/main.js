$(document).ready(function () {
  // scroll header
  // $(window).scroll(function () { 
  //   if(scrollY>130){
  //     $('.header_wrapper .header').addClass('active')
  //   }else{
  //     $('.header_wrapper .header').removeClass('active')
  //   }
  // });
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
  var slide = new Swiper('.reviews_items', {
    slidesPerView: 3,
    loop:true,
    navigation: {
      prevEl: '.reviews .prev',
      nextEl: '.reviews .next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 20,

      },
      556: {
        slidesPerView: 1.8,
        spaceBetween: 30,

      },
      768: {
        spaceBetween: 40,
        slidesPerView: 2,
      },
      992: {
        spaceBetween: 50,

        slidesPerView: 2.5,
      },
      1159: {
        spaceBetween: 60,

        slidesPerView: 3,
      }
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
  // tabs
  $('.desctop_container .quation_request').hide();
  $('.desctop_container .quation_request:first').show();
  $('.desctop_container .quation_item').click(function () {
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
  
  // modal
  $('.open_modal').on('click', function (e) {
    $('.modal').fadeIn();
  });

  // Modalni yopish - modalning fonini bosganda
  $('.modal').on('click', function (e) {
    if ($(e.target).is('.modal')) {
      $(this).fadeOut();
    }
  });
  $('.deiver_header').click(function () {
    $(this).toggleClass('active')
    $(this).next('.deliver_lists').slideToggle()
  })
});

$(document).ready(function () {
  let currentQuestion = 0;
  const totalQuestions = 4;

  // Functions to show/hide questions
  function showQuestion(index) {
    $('.form_items').fadeOut(0);
    $(`.form_items[data-index="${index}"]`).fadeIn();
    updateProgress();
  }

  // Progress bar update function
  function updateProgress() {
    const completedInputs = $(".form_items input:checked").length;
    const progress = ((completedInputs + (currentQuestion === totalQuestions ? 1 : 0)) / (totalQuestions + 1)) * 100;
    $('.progres_thumb').css('width', `${progress}%`);
    $('.progress_number').text(`${Math.round(progress)}%`);
    if (progress == 100) {
      $('.form_quations').fadeOut(0)
      $('.form_inputs').fadeIn(0)
    } else {
      $('.form_quations').fadeIn()
      //  $('.form_inputs').fadeOut(0)
    }

  }
  // "Previous" button logic
  $('.prev_btn').on('click', function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });

  // "Next" button logic
  $('.next_btn').on('click', function () {
    const currentInputChecked = $(`.form_items[data-index="${currentQuestion}"] input:checked`).length;
    if (currentInputChecked === 0) {
      return;
    }
    if (currentQuestion < totalQuestions) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  });

  // Input change listener to update progress
  $(".form_items input").on("change", function () {
    updateProgress();
  });

  // Initial setup
  showQuestion(currentQuestion);

  // Submit form logic

});
