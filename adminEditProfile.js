const db = firebase.firestore();

async function renderDetails(email, address, phone, firstName, lastName) {
    const emailField = document.querySelector("#email");
    console.log("Called");
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
        console.log(doc.id, '=>', doc.data());
        var email = doc.data().email;
        var address = doc.data().address;
        var phone = doc.data().phone;
        var firstName = doc.data().firstName;
        var lastName = doc.data().lastName;
        renderDetails(email, address, phone, firstName, lastName);
      });
    }
  }

  //listen to submit button press
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector("#adminEdit");
    searchForm.addEventListener("submit", e => {
        e.preventDefault();
        var email=document.getElementById("email").value;
        var address=document.getElementById("address").value;
        var phone=document.getElementById("phone").value;
        var firstName=document.getElementById("firstName").value;
        var lastName=document.getElementById("lastName").value;

        renderDetails(email, address, phone, firstName, lastName);
    });
  });

  