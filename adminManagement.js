// Kennedy JS
// const admin = require('firebase-admin');
// const serviceAccount = require('./ServiceAccount.json');
// admin.initialiazeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
// const db = admin.firestore();
const db = firebase.firestore();
var userID;

//finds user and display information.
async function searchUser(username, form) {
  
  const snapshot = db.collection('customers');
  const userDoc = await snapshot.where('email','==', username).get();
  
  if (userDoc.empty) {
    //If user is not found & clearFields if user not found.
    setFormMessage(searchForm, "error", "User Not found!");
    console.log("User Not Found!");
    console.log("Clearing text fields...");
    clearFields();
    console.log("Text fields cleared!");
    
  } else {
    console.log("User Found!")
    userDoc.forEach(doc => {
      //If found, acquires user info and initiates details to be rendered.
      setFormMessage(searchForm, "success", "User Found!");
      userID = doc.id;
      console.log(doc.id, '=>', doc.data());
      var email = doc.data().email;
      var address = doc.data().address;
      var phone = doc.data().phone;
      var firstName = doc.data().firstName;
      var lastName = doc.data().lastName;



      console.log("Rendering details...");
      renderDetails(email, address, phone, firstName, lastName);
      console.log("details rendered");
    });
  }
}


//Update user information with information in text fields.
async function updateUser(email, address, phone, firstName, lastName, form) {
  const snapshot = db.collection('customers');
  await snapshot.doc(userID).set({
    email: email,
    address: address,
    phone: phone,
    firstName: firstName,
    lastName: lastName
  });

  const doc = await snapshot.doc(userID).get();
  console.log(doc.data());
  console.log("Information updated");
  setFormMessage(form, "success", "User Updated!");
  clearFields();
  console.log("Fields Cleared");
}

//Delete user account.
function deleteUser(){

}

//Print User Information.
async function renderDetails(email, address, phone, firstName, lastName) {
  
  const emailField = document.querySelector("#email");
  const addressField = document.querySelector("#address");
  const phoneField = document.querySelector("#phone");
  const firstNameField = document.querySelector("#firstName");
  const lastNameField = document.querySelector("#lastName");

  emailField.value = email;
  addressField.value = address;
  phoneField.value = phone;
  firstNameField.value = firstName;
  lastNameField.value = lastName;
}
//Clear text fields function.
async function clearFields(){
  const emailField = document.querySelector("#email");
  const addressField = document.querySelector("#address");
  const phoneField = document.querySelector("#phone");
  const firstNameField = document.querySelector("#firstName");
  const lastNameField = document.querySelector("#lastName");

  emailField.value = "";
  addressField.value = "";
  phoneField.value = "";
  firstNameField.value = "";
  lastNameField.value = "";
}

//Listens to submit button for search form.
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#searchForm");
  const userForm = document.querySelector("#userManagement");

  //Search form listeners
  searchForm.addEventListener("submit", e => {
      e.preventDefault();
      var username=document.getElementById("username").value;
      console.log("Searching for user...");
      searchUser(username);
  });


  //userForm Listeners
  userForm.addEventListener("submit", e => {
    e.preventDefault();
    var email=document.getElementById("email").value;
    var address=document.getElementById("address").value;
    var phone=document.getElementById("phone").value;
    var firstName=document.getElementById("firstName").value;
    var lastName=document.getElementById("lastName").value;
    console.log("Updating users account information...");
    updateUser(email, address, phone, firstName, lastName, userForm);
    console.log("User information has been updated!");
  });
});

//Error_Success message.
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

// admin.auth().getUserByEmail(email)
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   })
//   .catch((error) => {
//     console.log('Error fetching user data:', error);
//   });



