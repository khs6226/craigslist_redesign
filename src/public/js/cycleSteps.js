const stepOne = $('#step-1');
const stepTwo = $('#step-2');
const stepThree = $('#step-3');

const back = $('.button-back');
const next = $('.button-next');
const submit = $('#new-post-submit')

stepTwo.css('display', 'none');
stepThree.css('display', 'none');


let steps = [stepOne, stepTwo, stepThree];
let i = 0;

// checks the current step and applies buttons dynamically
function checkStep() {
    if (i == 2) {
        next.css('display', 'none');
        submit.css('display', 'block')
    } else {
        next.css('display', 'block');
        submit.css('display', 'none')
    }
    
    if (i == 0) {
        back.css('visibility', 'hidden');
    } else {
        back.css('visibility', 'visible');
    }
}

checkStep();

next.on('click', (e) => {
    i++;
    steps[i-1].css('display', 'none');
    steps[i].css('display', 'flex');

    checkStep();
});

back.on('click', (e) => {
    i-- 
    steps[i+1].css('display', 'none');
    steps[i].css('display', 'flex');

    checkStep();
})