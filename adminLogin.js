//Kennedy JS

// Firebase login
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
  
      if(user != null){
        console.log("Logged in as: " + user.email);
      }
  
    } else {
      // No user is signed in.
        console.log("Not logged in");
    }
  });


//Login function 
function login(adminLogin, username, password) {
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(() => {
        // if login is successful, set success message and send to next page
        setFormMessage(adminLogin, "success", "logged in");
        window.location.href = "./adminManagement.html";
    })
    .catch(function(error) {
        //Error if log is not successful.
        var errorMessage = error.message;
    
        setFormMessage(adminLogin, "error", errorMessage);
    });  
}

//Logout functionality, unvalidate user
function logout() {
    firebase.auth().signOut();
    window.location.href = "./adminLogin.html";
    console.log("Logout successful!");
}

//listen to submit button press in login
document.addEventListener("DOMContentLoaded", () => {
    const adminLogin = document.querySelector("#adminLogin");
    adminLogin.addEventListener("submit", e => {
        e.preventDefault();
        // Gets username and password from text fields.
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;
        //Calls login function
        login(adminLogin, username, password);
    });
});

//Error/Success messages.
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}
