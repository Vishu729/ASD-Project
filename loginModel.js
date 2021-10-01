//Christopher JS

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
        window.location.href = "./editProfile.html";
    })
    .catch(function(error) {
        // Handle Errors here. Sets error messages made by firebase authentication
        //var errorCode = error.code;
        var errorMessage = error.message;
    
        setFormMessage(loginForm, "error", errorMessage);
    });

    
}

<<<<<<< HEAD
=======
//Logout functionality, unvalidate user
>>>>>>> christopher
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


//listen to submit button press in login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform Fetch login
        // Grab username and password from text field
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        //validate login
        login(loginForm, username, password);
<<<<<<< HEAD
       
=======
>>>>>>> christopher
    });
});