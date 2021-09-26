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

async function renderDetails() {
  const snapshot = db.collection('customers').doc('SFgvexR2tEKnNMueHLvx');
  const doc = await snapshot.get();
  console.log(doc.data());
}

async function findUser(email) {
  const snapshot = db.collection('customers');
  const userDoc = await snapshot.where('Email', '==', email).get();
  if (userDoc.empty) {
    console.log("Nothing matched");
  } else {
    userDoc.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
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

        // Perform Fetch login
        // Grab username and password from text field
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        //validate login
        login(loginForm, username, password);
       
    });
});