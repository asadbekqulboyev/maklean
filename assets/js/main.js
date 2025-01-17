
$(document).ready(function () {
  // slide products
  var swiper = new Swiper('.products .swiper-container', {
    slidesPerView: 4,
    spaceBetween: 100,
    loop:true,
    navigation: {
      nextEl: '.products .prev',
      prevEl: '.products .next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 35,
      },
      556: {
        slidesPerView: 2.4,
        spaceBetween: 75,
        
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
  $('.dropdown').click(function (e) { 
    e.preventDefault()
    $(this).next('.drop_lists').slideToggle()
    $(this).toggleClass('active')
   })
  // hover partners
  if (innerWidth>768) {
  $('.partners_item').hover(
    // if(innerWidth<)
    function () {
      // Hozirgi elementga active klassini qo'shish
      $('.partners_item').removeClass('active');
      $(this).addClass('active');
      
    }
  );
  }
  // tabs
  let maxHeight = 0;

  // Eng katta balandlikni topish
  $(".quation_request").each(function () {
    const height = $(this).outerHeight();
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  // Barcha elementlarga eng katta balandlikni qo'llash
  $(".quation_request").height(maxHeight);
  if(innerWidth<650){
    $('.quation_item.quation_mobile').click(function(){
      $(".request_mobile").slideUp(10)
      $('.quation_item.quation_mobile').removeClass('active')
      $(this).next(".quation_request.request_mobile").slideDown()
      $(this).addClass('active')
    })
    // 
    const items = $('.quation_items .request_mobile');
    const items2 = $('.quation_items .quation_mobile');
    let currentIndex = 0;
    // Funksiya: Faol elementni yangilash
    function updateContent() {
      items2.removeClass('active')
      items.slideUp(); // Barcha elementlardan "active"ni olib tashlash
      items.eq(currentIndex).slideDown(); // Hozirgi elementga "active" qo'shish
      items2.eq(currentIndex).addClass('active')
      $('#prev').prop('disabled', currentIndex === 0); // "Prev" tugmasini cheklash
      $('#next').prop('disabled', currentIndex === items.length - 1); // "Next" tugmasini cheklash
    }
    // Boshlang'ich holat
    updateContent();
    // Tugmalar uchun voqealar
    $('.quation_btn.prev').click(function () {
      if (currentIndex > 0) {
        currentIndex--;
        updateContent();
      }
    });
    $('.quation_btn.next').click(function () {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        updateContent();
      }
    })
    $('.deiver_header').click(function () {
      $(this).toggleClass('active')
      $(this).next('.deliver_lists').slideToggle()
    })
 }else{

  $('.desctop_container .quation_request:not(.request_mobile)').hide();
  $('.desctop_container .quation_request:not(.request_mobile):first').show();
  $('.desctop_container .quation_item').click(function () {
      // Hamma tugmalar va ma'lumotlardan `active` klassini olib tashlash
      $('.quation_item').removeClass('active');
      $('.quation_request').fadeOut(0);
      // Joriy tugmaga `active` klassini qo'shish
      $(this).addClass('active');
      // Tegishli ma'lumotni ko'rsatish
      const target = $(this).data('target');
      $('.quation_request#request' + target).fadeIn(200);
      
    });
    
  }
  
  // modal
  $('.open_modal').on('click', function (e) {
    $('.modal').fadeIn();
  });
  
  // Modalni yopish - modalning fonini bosganda
  $('.modal').on('click', function (e) {
    if ($(e.target).is('.modal')||$(e.target).is('.exit_modal')) {
      $(this).fadeOut();
    }
  });
  // deliver accardion

// checkbox is true
$('form').each(function () {
  const form = $(this); 
  const submitButton = form.find('button[type="submit"]');
  function checkFormCheckboxes() {
    const isChecked = form.find('input:checkbox:checked').length > 0;
    submitButton.prop('disabled', !isChecked);
  }
  checkFormCheckboxes();
  form.find('input:checkbox').on('change', checkFormCheckboxes);
  form.on('submit', function (event) {
    if (form.find('input:checkbox:checked').length === 0) {
      event.preventDefault();
    }
  });
});
// quiz
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
// aos 

// AOS.init();
});

AOS.init();