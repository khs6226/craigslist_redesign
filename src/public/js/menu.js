const menuBtn = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.nav-menu');

menuBtn.on('click', (e) => {
    navMenu.classList.toggle('.show-menu')
})