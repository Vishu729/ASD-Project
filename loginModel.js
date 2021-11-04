//Christopher & Kelvin JS
const db = firebase.firestore();
const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#createAccount");

var passwordStrength;
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
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(() => {
        // if login is successful, set success message and send to next page
        setFormMessage(loginForm, "success", "logged in");
        window.location.href = "./index.html";
        return "Logged In";
    })
    .catch(function(error) {
        // Handle Errors here. Sets error messages made by firebase authentication
        //var errorCode = error.code;
        var errorMessage = error.message;
    
        setFormMessage(loginForm, "error", errorMessage);
        return "Incorrect Details";
    });
}

function register(createAccountForm, firstName, lastName, email, address, phone, password) {
    //check if details are correct
    // check if email is correct
    // check if password is strong
    if (!isEmail(email)) {
      setFormMessage(createAccountForm, "error", "Invalid email syntax");
      return "Invalid Email";
    }
    else if (passwordStrength === 0) {
      setFormMessage(createAccountForm, "error", "Password too weak");
      return "Weak Password";
    } 
    else {
      authenticateUser(firstName, lastName, email, address, phone, password);
      console.log("registered");
      return "Registered";
    }
}

async function updateDatabase (firstName, lastName, email, address, phone) {
    const customerRef = await db.collection('customers').add({
        address: address,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone
    });
    console.log('Added document with ID: ', customerRef.id);
    window.location.href = "./index.html";
    return "Database Updated";
}

async function authenticateUser(firstName, lastName, email, address, phone, password) {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
        //call succuss
        console.log(firstName + " -> " + lastName + " -> " + email + " -> " + address + " -> " + phone + " -> " + password);
        setFormMessage(createAccountForm, "success", "User has been created");
        updateDatabase(firstName, lastName, email, address, phone);
        console.log("print");
        return "User Authenticated";

    })
    .catch((error) => {
        const errorMessage = error.message;
        //call error dispaly
        setFormMessage(createAccountForm, "error", errorMessage);
        return "Error";
    });

}

//Logout functionality, unvalidate user
function logout() {
    firebase.auth().signOut();
}

function registration(){
        const customerRef = db.collection('customers')
        .add({
            address: 'address',
            email: 'email',
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone'
        });
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

function checkUsername(inputElement, value) {
    if(value === '') {
        setInputError(inputElement, 'Username cannot be blank');
    } else {
        clearInputError(inputElement);
    }
}

function checkEmail(inputElement, value) {
    if(value === '') {
		setInputError(inputElement, 'Email cannot be blank');
	} else if (!isEmail(value)) {
		setInputError(inputElement, 'Not a valid email');
	} else {
		clearInputError(inputElement);
	}
}

function validatePassword(inputElement, value) {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');

    if(strongPassword.test(value)){
        setInputError(inputElement, "Strong Password", 2);
        passwordStrength = 2;
    }
    else if (mediumPassword.test(value)){
        setInputError(inputElement, "Medium Password", 1);
        passwordStrength = 1;
    } 
    else {
        setInputError(inputElement, "Weak Password", 0);
        passwordStrength = 0;
    }
}


function comparePassword(inputElement, value) {
    const singupPass = document.getElementById('signupPass');
    var pass1 = singupPass.value;
    console.log(value + " -> " + pass1);
    if (value === pass1) {
        clearInputError(inputElement);
    } else {
        setInputError(inputElement, "Password does not match");
    }
}




function checkInputs(inputElement) {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setInputError(inputElement, 'Username cannot be blank');
	} else {
		clearInputError(inputElement);
	}
	
	if(emailValue === '') {
		setInputError(inputElement, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setInputError(inputElement, 'Not a valid email');
	} else {
		clearInputError(inputElement);
	}
	
	if(passwordValue === '') {
		setInputError(inputElement, 'Password cannot be blank');
	} else {
		clearInputError(inputElement);
	}
	
	if(password2Value === '') {
		setInputError(inputElement, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setInputError(inputElement, 'Passwords does not match');
	} else{
		clearInputError(inputElement);
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
        var username=document.getElementById("email").value.toLowerCase();
        var password=document.getElementById("password").value;

        //validate login
        login(loginForm, username, password);
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        var firstName=document.getElementById("signupFirstName").value;
        var lastName =document.getElementById("signupLastName").value;
        var password=document.getElementById("signupPass").value;
        var email=document.getElementById("signupEmail").value.toLowerCase();
        var phone=document.getElementById("signupPhone").value;
        var address =document.getElementById("signupAddress").value;
        // Perform Fetch login
        // Grab username and password from text field
        register(createAccountForm, firstName, lastName, email, address, phone, password);
    });
});

//sets a check for queries
document.querySelectorAll(".form__input").forEach(inputElement => {
    //add first and last name
    //add address
    inputElement.addEventListener("input", e => {
        if(e.target.id === "signupName" && e.target.value.length !== 0){
            checkUsername(inputElement, e.target.value);
        } 
        else if (e.target.id === "signupEmail" && e.target.value.length !== 0) {
            checkEmail(inputElement, e.target.value);
        }
        else if (e.target.id === "signupPass" && e.target.value.length !== 0) {
            validatePassword(inputElement, e.target.value);
            pass1 = e.target.value;
        }
        else if (e.target.id === "signupPass2" && e.target.value.length !== 0) {
            comparePassword(inputElement, e.target.value);
        }
        else if (e.target.id === "signupPass"){
            clearInputError(inputElement);
        }
    });
});


