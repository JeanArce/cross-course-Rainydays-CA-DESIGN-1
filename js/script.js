function toggleContainer() {
    let container = document.querySelector('.mobile-menu');
    if (container.style.display === 'none') {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
}


let container = document.querySelector('.mobile-menu');
let hamburgerContainer = document.querySelector('.hamburger-icon-container');

document.addEventListener('click', function(event) {
    let isClickInsideContainer = container.contains(event.target);
    let isClickedHamburger = hamburgerContainer.contains(event.target);

    if (!isClickInsideContainer && !isClickedHamburger) {

      
        container.style.display = 'none';
        
        
    }
});
 

// below is for error validation in user page form

let nameEl = document.querySelector("#name");
let nameError = document.getElementById("nameError");

if(nameEl) {
    nameEl.addEventListener("input", function(event) {
        if(nameEl.value.length > 0) {
            nameError.style.display = 'none';
        } else {
            nameError.style.display = 'block';
        }
    });
}


let email = document.getElementById("email");
let emailError = document.getElementById("emailError");

if(email) {
    email.addEventListener("input", function(event) {
        if(validEmail(email.value)) {
            emailError.style.display = 'none';
        } else {
            emailError.style.display = 'block';
        }
    });
}

let password = document.querySelector("#password");
let passwordError = document.getElementById("passwordError");


if(password) {
    password.addEventListener("input", function(event) {
        if(password.value.length >= 6) {
            passwordError.style.display = 'none';
        } else {
            passwordError.style.display = 'block';
        }

    });
}

function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}




function submitUserForm(event) {
    event.preventDefault();
   
    if(nameEl.value.length == 0) {
        nameError.style.display = 'block';
    }

    if(!validEmail(email.value)) {
        emailError.style.display = 'block';
    }

    if(password.value.length < 6) {
        passwordError.style.display = 'block';
    }


}


function resetUserForm(event) {
    event.preventDefault();
    console.log('lets reset');
    nameEl.value = "";
    email.value = "";
    password.value = "";
    
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
}
  