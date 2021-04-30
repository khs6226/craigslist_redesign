
$('.menu-icon').click((e) => {
  let isIndex = $('body').hasClass('home');
  console.log('click');

  if(isIndex) {
    $('.nav-menu-container').toggleClass('show-menu', 500);
    if ($('.menu-icon').attr('src') == './img/menu.svg') {
      $('.menu-icon').attr('src', './img/close.svg');
    } else {
      $('.menu-icon').attr('src', './img/menu.svg');
    }
  } else {
    $('.nav-menu-container').toggleClass('show-menu', 500);
    if ($('.menu-icon').attr('src') == '/img/menu.svg') {
      $('.menu-icon').attr('src', '/img/close.svg');
    } else {
      $('.menu-icon').attr('src', '/img/menu.svg');
    }
  }
})