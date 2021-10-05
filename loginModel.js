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


//Login Functionality - using firebase to authenticate and validate user.
function login(loginForm, username, password) {
    console.log()
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(() => {
        // if login is successful, set success message and send to next page
        setFormMessage(loginForm, "success", "logged in");
        window.location.href = "./editProfile.html";
    })
    .catch(function(error) {
        // Handle Errors here. Sets error messages made by firebase authentication
        //var errorCode = error.code;
        var errorMessage = error.message;
    
        setFormMessage(loginForm, "error", errorMessage);
    });
}

//Logout functionality, unvalidate user
function logout() {
    firebase.auth().signOut();
}

function googleRegistration(){
    const auth = firebase.getAuth();
}

//Set error/success messages 
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
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

//listen to submit button press
//listen to submit button press in login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

document.addEventListener('submit', e => {
        e.preventDefault();
        
        checkInputs();
});
    
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