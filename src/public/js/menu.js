
$('.menu-icon').click((e) => {
  // let isIndex = $('body').hasClass('home');
  
  $('.nav-menu-container').toggleClass('show-menu', 500);
  if ($('.menu-icon').attr('src') == '/img/menu.svg') {
    $('.menu-icon').attr('src', '/img/close.svg');
    $('.back-btn').css('visibility', 'hidden');
  } else {
    $('.menu-icon').attr('src', '/img/menu.svg');
    $('.back-btn').css('visibility', 'visibile');
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