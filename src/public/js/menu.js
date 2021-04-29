
$('.menu-icon').click((e) => {
    console.log('click')
    $('.nav-menu-container').toggleClass('show-menu', 500);
    if ($('.menu-icon').attr('src') == './img/menu.svg') {
        $('.menu-icon').attr('src', './img/close.svg');
    } else {
        $('.menu-icon').attr('src', './img/menu.svg'); 
    }
})