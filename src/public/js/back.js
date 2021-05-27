$('.back-btn').on('click', () => {
    window.history.back();
})

$('.submit-button').on('click', (e) => {
  e.preventDefault();
  alert('Thank you for contacting us!');
})