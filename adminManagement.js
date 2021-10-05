//Logout functionality, unvalidate user
function logout() {
    firebase.auth().signOut();
    window.location.href = "./index.html";
}