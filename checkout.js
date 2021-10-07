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


  //Creates new order
  async function createOrder(){
   
    
      
  }

  document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.querySelector("#checkoutForm");
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();

      var cardName=document.getElementById("cardName").value;
      var cardNumber=document.getElementById("cardNumber").value;
      var expirymonth=document.getElementById("expirymonth").value;
      var expiryYear=document.getElementById("expiryYear").value;
      var cvv=document.getElementById("cvv").value;
      console.log("Creating order...");
      createOrder(checkoutForm, cardName, cardNumber, expirymonth, expiryYear, cvv);
      console.log("Order created");
    });
  });

//Error/Success messages.
function setFormMessage(formElement, type, message) {
const messageElement = formElement.querySelector(".form__message");

messageElement.textContent = message;
messageElement.classList.remove("form__message--success", "form__message--error");
messageElement.classList.add(`form__message--${type}`);
}