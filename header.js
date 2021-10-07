import {db} from "./firebase.js";
import { collection, getDocs,getDoc, doc, setDoc ,updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

async function getCartItems() {
    await onSnapshot(collection(db, "cart-item"), (doc) => {
        let ctr = 0;
        doc.forEach(element => {
            ctr += element.data().quantity ;
           
        });
        console.log("Total : ", ctr);
        setCartCounter(ctr);
    
    });
}

function setCartCounter(ctr) {
    // cart-qty-number
    
    
    console.log(ctr);
let doc =document.createElement("div");
doc.classList.add("cart-item-number", "absolute", "-top-1", "-right-1", "h-4", "w-4", "bg-white", "rounded-full", "flex", "justify-center", "items-center", "text-gray-800", "text-xs");
doc.innerHTML = `
${ctr}
`
document.querySelector(".cart-icon").appendChild(doc);
}


getCartItems();