"use strict";
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const modalEl = document.querySelector('.modal');
const openEl = document.querySelector('.open');
const cancelEl = document.querySelector('.close');
const email= document.querySelector('.register__email');
const confirmEmail = document.querySelector('.register__confirm');
const clickBtn= document.querySelector('.card__pic');
const subscribe = document.querySelectorAll("[data-target]");
const linkEl = document.querySelectorAll(".link");
let valid = true;
let timeout = null;

(function(){
// Menu Open    
hamburger.addEventListener("click", () =>{
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
})

// Menu close 
linkEl.forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}))

// Open modal
subscribe.forEach(openEl =>{
    openEl.addEventListener('click', () => {
    modalEl.showModal();
})
});

// Cancel button to close modal
cancelEl.addEventListener('click', () => {
    modalEl.close();
    window.location.reload()
});


email.addEventListener('email', (e) => {
    validateEmail();
    if(valid == false){
        e.preventDefault();
    }
});

// On input action
confirmEmail.addEventListener('input', (e) => {
    validateConfirmEmail();
    if(valid == false){
        e.preventDefault();
    }
    setTimeout(validateConfirmEmail, 3000);
});

// Listeners for validating the email field
email.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        validateEmail();
    }, 2000);
});

const validateEmail = () => {
    const emailValue = email.value.toLowerCase().trim();

    // Validation for email
    if(emailValue === ''){
        setError(email, 'This field is required');
        valid = false;
    }
    else if(!isValidEmail(emailValue)){
        setError(email, 'this field must be a valid email address including @');
        valid = false;
    }
    else{
        setSuccess(email);
        valid = true;
    }
    return valid;
};

const validateConfirmEmail = () => {
    const emailValue = email.value.toLowerCase().trim();
    const confirmEmailValue = confirmEmail.value.toLowerCase();

    // Validation for confirm email
    if(confirmEmailValue === '')
    {
        setError(confirmEmail, "Please confirm your email");
        valid = false;
    }
    else if(confirmEmailValue != emailValue){
        setError(confirmEmail, "email doesn't match");
        valid = false;
    }
    else{
        setSuccess(confirmEmail);
        valid = true;
    }
    return valid;
};

const setError = (element, message) => {
    const registerEmail = element.parentElement;
    const registerConfirmEmail = element.parentElement;
    const errorDisplay = registerEmail.querySelector('.error');
    errorDisplay.style.display = 'block';

    errorDisplay.innerText = message;
    registerEmail.classList.add('error');
    registerEmail.classList.remove('success');
    registerConfirmEmail.classList.add('error');
    registerConfirmEmail.classList.remove('success');
}

const setSuccess = element =>{
    const registerEmail = element.parentElement;
    const registerConfirmEmail = element.parentElement;
    const errorDisplay = registerEmail.querySelector('.error');

    errorDisplay.innerText = "";
    registerEmail.classList.add('success');
    registerEmail.classList.remove('error');
    registerConfirmEmail.classList.add('success');
    registerConfirmEmail.classList.remove('error');
}

// Validate email format
const isValidEmail = email =>{
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email.toLowerCase()));
}
})();