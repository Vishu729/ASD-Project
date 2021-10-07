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