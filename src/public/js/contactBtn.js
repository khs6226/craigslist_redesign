const contactBtn = $('.contact-seller-btn');
const info = $('.post-contact');

contactBtn.on('click', () => {
    contactBtn.css('display', 'none');
    info.css('display', 'block');
})