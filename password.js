//Christopher JS
const db = firebase.firestore();
var credential;
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
function updatePassword(passwordForm, password) {
    if (passwordStrength != 0) {
        firebase.auth().currentUser.updatePassword(password)
        .then(() => {
            //update successful
            setFormMessage(passwordForm, "success", "Password Updated");
        })
        .catch((error) => {
            var errorMessage = error.message;
            setFormMessage(passwordForm, "error", errorMessage);
        });
    }
    else {
        setFormMessage(passwordForm, "error", "Password too weak");
    }
}

function reauthenticate(passwordForm, newPassword, currentPassword) {
    //retreive authentication
    credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      currentPassword
    );
    
    //set user
    currentUser = firebase.auth().currentUser;
  
    currentUser.reauthenticateWithCredential(credential)
    .then(function() {
      // User re-authenticated.
      //retrieve details
      //reauthenticate
      updatePassword(passwordForm, newPassword);
    })
    .catch(function(error) {
      // An error happened.
      var errorMessage = error.message;
      console.log("reauthenticate error");
      setFormMessage(passwordForm, "error", errorMessage);
    });
}

//validate
function validatePassword(password, inputElement) {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');

    if(strongPassword.test(password)){
        setInputError(inputElement, "Strong Password", 2);
        passwordStrength = 2;
    }
    else if (mediumPassword.test(password)){
        setInputError(inputElement, "Medium Password", 1);
        passwordStrength = 1;
    } 
    else {
        setInputError(inputElement, "Weak Password", 0);
        passwordStrength = 0;
    }
}

//Logout functionality, unvalidate user
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

//set text field error
function setInputError(inputElement, message, strength) {
    inputElement.classList.add("form__input--password-strength");
    if (strength === 0) {
        inputElement.parentElement.querySelector(".form__input-password-strength").style.color = "red";
    } else if (strength === 1) {
        inputElement.parentElement.querySelector(".form__input-password-strength").style.color = "orange";
    } else {
        inputElement.parentElement.querySelector(".form__input-password-strength").style.color = "green";
    }
    
    inputElement.parentElement.querySelector(".form__input-password-strength").textContent = message;
}
  
  //clear text field error
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--password-strength");
    inputElement.parentElement.querySelector(".form__input-password-strength").textContent = "";
}

//listen to submit button press in password
document.addEventListener("DOMContentLoaded", () => {
    const passwordForm = document.querySelector("#passwordChange");
    
    passwordForm.addEventListener("submit", e => {
        e.preventDefault();
        
        // Perform Fetch login
        // Grab username and password from text field
        var currentPassword=document.getElementById("current").value;
        var newPassword=document.getElementById("new").value;


        console.log(currentPassword + " -> " + newPassword);
        reauthenticate(passwordForm, newPassword, currentPassword);
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("input", e => {
            if(e.target.id === "new" && e.target.value.length !== 0){
                validatePassword(e.target.value, inputElement);
            } 
            else if (e.target.id === "new") {
                clearInputError(inputElement);
            }
        });
    });
});