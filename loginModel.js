//Replace success message with error message
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

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform Fetch login
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        //add database and check for database

        //temp login solution
        if(username == "user" && password == "pass") { //temp login username and password
            window.location.href = "./index.html";
        } else {
            //Error message when login incorrect
            setFormMessage(loginForm, "error", "Invalid username/password combination");
            //console.log("fail");
            //console.log(username);
            //console.log(password);
        }        
        
    });
});