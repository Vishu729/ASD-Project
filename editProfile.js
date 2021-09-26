//Christopher JS
//Firebase firestore database
const db = firebase.firestore();
// Firebase login debug.
/*
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
  
      if(user != null){
        console.log(user.email);
        const snapshot = db.collection('customers').doc('SFgvexR2tEKnNMueHLvx').get();
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      }
  
    } else {
      // No user is signed in.
        console.log("Not logged in");
    }
  });
*/

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

async function findUser(email) {
  const snapshot = db.collection('customers');
  const userDoc = await snapshot.where('email', '==', email).get();
  if (userDoc.empty) {
    console.log("Nothing matched");
  } else {
    userDoc.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      var firstName = doc.data().firstName;
      var lastName = doc.data().lastName;
      var email = doc.data().email;
      var phone = doc.data().phone;
      var address = doc.data().address;
      renderDetails(firstName, lastName, email, phone, address);
      //console.log(firstName + " " + lastName + " " + email + " " + phone + " " +  address);
      /*
        to retrieve individual data you type
        doc.data().Name; replace Name with field name;
      */
    });
  }
  
}

function setCurrentDetails() {
    // Retrieve user info from database
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
    
        if(user != null){
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


//listen to submit button press
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    setCurrentDetails();
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform Update method from firebase firestore.
        // Grab details from text field and update database and authentication details
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        //perform update
        login(loginForm, username, password);
       
    });
});