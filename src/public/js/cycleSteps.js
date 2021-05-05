const stepOne = $('#step-1');
const stepTwo = $('#step-2');
const stepThree = $('#step-3');

const back = $('.button-back');
const next = $('.button-next');

stepTwo.css('display', 'none');
stepThree.css('display', 'none');

let steps = [stepOne, stepTwo, stepThree];
next.on('click', (e) => {
    for (let i = 0; i < steps.length; i++) {
        steps[0].css('display', 'none');
        steps[i].css('display', 'none'); 
    }
})