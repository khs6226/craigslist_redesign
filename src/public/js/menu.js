
$('.menu-icon').click((e) => {
  // let isIndex = $('body').hasClass('home');

  $('.back-btn').toggleClass('back-btn-hide');
  $('.nav-menu-container').toggleClass('show-menu');
  
  if ($('.menu-icon').attr('src') == '/img/menu.svg') {
    $('.menu-icon').attr('src', '/img/close.svg');
    $('#map').css('display', 'none');
  } else {
    $('.menu-icon').attr('src', '/img/menu.svg');
    $('#map').css('display', 'block');
  }
  
})


// if(isIndex) {
//   $('.nav-menu-container').toggleClass('show-menu', 500);
//   if ($('.menu-icon').attr('src') == '/img/menu.svg') {
//     $('.menu-icon').attr('src', '/img/close.svg');
//   } else {
//     $('.menu-icon').attr('src', '/img/menu.svg');
//   }
// } else {
//   $('.nav-menu-container').toggleClass('show-menu', 500);
//   if ($('.menu-icon').attr('src') == '/img/menu.svg') {
//     $('.menu-icon').attr('src', '/img/close.svg');
//   } else {
//     $('.menu-icon').attr('src', '/img/menu.svg');
//   }
// }