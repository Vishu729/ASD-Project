//Christopher JS
//Firebase firestore database
const db = firebase.firestore();
var userId;
var credential;


//VALIDATION
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//FIRBASE FUNCTIONS

//REAUTHENTICATE
function reauthenticate(editForm, password, user) {
  //retreive authentication
  credential = firebase.auth.EmailAuthProvider.credential(
    firebase.auth().currentUser.email,
    password
  );
  
  //set user
  currentUser = firebase.auth().currentUser;

  currentUser.reauthenticateWithCredential(credential)
  .then(function() {
    // User re-authenticated.

    //retrieve details
    setFormMessage(editForm, "success", "Details Updated");
    const firstNameField = document.querySelector("#first--name");
    const lastNameField = document.querySelector("#last--name");
    const emailField = document.querySelector("#username");
    const addressField = document.querySelector("#address");
    const phoneField = document.querySelector("#phone");
  
    var firstName = firstNameField.value;
    var lastName = lastNameField.value;
    var email = emailField.value;
    var address = addressField.value;
    var phone = phoneField.value;

    //reauthenticate
    updateAuthenticator(user, firstName, lastName, email, address, phone, editForm);
  })
  .catch(function(error) {
    // An error happened.
    var errorMessage = error.message;
    console.log("reauthenticate error");
    setFormMessage(editForm, "error", errorMessage);
  });
}

//update authenticator
async function updateAuthenticator(user, firstName, lastName, email, address, phone, editForm) {
  //carless user checker
  if (validateEmail(email)){
    firebase.auth().currentUser.updateEmail(email)
    .then(() => {
      // Email updated!
      updateDatabase(user, firstName, lastName, email, address, phone);
    })
    .catch((error) => {
      // An error occurred
      var errorMessage = error.message;
      setFormMessage(editForm, "error", errorMessage);
    });  
  }
  else {
    setFormMessage(editForm, "error", "Invalid email sytnax");
  }
}

//Update database 
async function updateDatabase(user, firstName, lastName, email, address, phone) {
  const customerRef = db. collection('customers');
  await customerRef.doc(user).set({
    address: address,
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone
  }); 
  const doc = await customerRef.doc(user).get();
  console.log(doc.data());
}

//UPDATE VIEW

//Sets current details to the text fields except for password
async function renderDetails(firstName, lastName, email, phone, address) {
  const firstNameField = document.querySelector("#first--name");
  const lastNameField = document.querySelector("#last--name");
  const emailField = document.querySelector("#username");
  const addressField = document.querySelector("#address");
  const phoneField = document.querySelector("#phone");

  firstNameField.value = firstName;
  lastNameField.value = lastName;
  emailField.value = email;
  addressField.value = address;
  phoneField.value = phone;
}

//finds user and displays current details to text fields
async function findUser(email) {
  //find user from customer database by email
  const snapshot = db.collection('customers');
  const userDoc = await snapshot.where('email', '==', email).get();
  if (userDoc.empty) {
    //debug message if can't find user
    console.log("Nothing matched");
  } else {
    userDoc.forEach(doc => {
      //display details if user found
      console.log(doc.id, '=>', doc.data()); // debug
      userId = doc.id;
      var firstName = doc.data().firstName;
      var lastName = doc.data().lastName;
      var email = doc.data().email;
      var phone = doc.data().phone;
      var address = doc.data().address;
      renderDetails(firstName, lastName, email, phone, address);
    });
  }
}

//Sets current details to text field
function setCurrentDetails() {
    // Retrieve user info from database
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
    
        if(user != null){
          //debug to find user email
          console.log(user.email);
          //find user from database
          //print();
          findUser(user.email);
        }
    
      } else {
        // No user is signed in.
          console.log("Not logged in");
      }
    });
}

//logout function
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
function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

//clear text field error
function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

//listen to submit button press
document.addEventListener("DOMContentLoaded", () => {
    const editForm = document.querySelector("#edit");
    const password = document.querySelector("#password");

    console.log(password);
    setCurrentDetails();

    editForm.addEventListener("submit", e => {
        e.preventDefault();

        //perform update
        reauthenticate(editForm, password.value, userId);
    });

    //error handling for inputs
    document.querySelectorAll(".form__input").forEach(inputElement => {
      inputElement.addEventListener("blur", e => {
          if (e.target.id === "username" && !validateEmail(e.target.value)) {
            setInputError(inputElement, "Invalid email syntax");
          }
      });

      inputElement.addEventListener("input", e => {
          clearInputError(inputElement);
      });
    });
});