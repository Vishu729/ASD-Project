//temporary object array to contain user information.
var objUsers = [
    {
        username: "admin",
        customerName: "Admin"
    },
    {
        username: "Ken",
        customerName: "Ken"
    },
    {
        username: "Eshlad420",
        customerName: "Damo from Dapto"
    }
];

//basic search function to search for users by username.
function searchUser(){
    var username = document.getElementById("username").value;
    //for loop used to iterate through each element in the array.
    for(i = 0; i < objUsers.length; i++) {
        if(username == objUsers[i].username){
            window.location.href = "./index.html";
            console.log("User Found! your name is: " + objUsers[i].customerName);
            return;
        }
    }
    window.location.href = "./noUser.html";
    console.log("no user found");
}