//Christopher & Kelvin JS

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Firebase login debug.
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
  
      if(user != null){
        console.log(user.email);
      }
  
    } else {
      // No user is signed in.
        console.log("Not logged in");
    }
  });

function login(loginForm, username, password) {
    firebase.auth().signInWithEmailAndPassword(username, password)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    
        setFormMessage(loginForm, "error", error.message);
    }).then(() => {
        setFormMessage(loginForm, "success", "logged in");
        window.location.href = "./index.html";
    });
}

function logout() {
    firebase.auth().signOut();
}

//Set error/success messages 
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}


//create error message
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}


//clear error message
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

//validates email
function validateEmail(){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//listen to submit button press
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    
    //opens registration tab and closes login tab
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform Fetch login
        // Grab username and password from text field
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        //validate login
        login(loginForm, username, password);
    });
});

//sets a check for queries
document.querySelectorAll(".form__input").forEach(inputElement => {
    inputElement.addEventListener("blur", e => {
        //sets a check for phone number
        if (e.target.id === "signupPhone" && e.target.value.length > 0 && e.target.value.length < 10) {
            setInputError(inputElement, "Phone number must be valid");
        }
    });

    inputElement.addEventListener("input", e => {
        clearInputError(inputElement);
    });
});