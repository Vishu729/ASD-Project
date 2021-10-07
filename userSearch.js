// Kennedy JS
const db = firebase.firestore();

//finds user and display information
async function searchUser(username) {
  
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
      //If found acquires user info and initates details to be rendered
      setFormMessage(searchForm, "success", "User Found!");

      console.log(doc.id, '=>', doc.data());
      var address = doc.data().address;
      var username = doc.data().email;
      var firstName = doc.data().firstName;
      var lastName = doc.data().lastName;
      var phone = doc.data().phone;

      console.log("Rendering");
      renderDetails(address, username, firstName, lastName, phone);
      console.log("Rendered");

    });
  }
}

//Update user data function.
// function updateUser(){
//   var userNow = firebase
// }

//Print User Information
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

//Listens to submit button and initiates search user function.
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", e => {
      e.preventDefault();
      var username=document.getElementById("username").value;
      console.log(username);
      searchUser(username);
  });
});

//Error/Success message.
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

