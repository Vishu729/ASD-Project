import {db} from "./firebase.js";
import { collection, getDocs,getDoc, doc, setDoc ,updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
async function  getItems(){
    const querySnapshot = await getDocs(collection(db, "items"));
    let items=[];
    querySnapshot.forEach((doc) => {
        items.push({
            id:doc.id,
            image:doc.data().image,
            name:doc.data().name,
            type:doc.data().type,
            Rating:doc.data().Rating,
            price:doc.data().price
        })
    });
    generateItems(items);
    
}

async function addToCart(item){
    console.log("add to cart function...")
    //let cartItem = db.collection("cart-items").doc(item.id);
    const cartItem = doc(db, "cart-item",item.id);
    const docSnap = await getDoc(cartItem);
 
        if(docSnap.exists()){
            updateDoc(cartItem,{
                quantity:docSnap.data().quantity+1
            })
        }else{
            setDoc(cartItem,{
                image:item.image,
                name:item.name,
                type:item.type,
                Rating:item.Rating,
                price:item.price,
                quantity : 1
            })
        
    }
    
}

function generateItems(items){
    
    items.forEach((item)=>{
        let doc=document.createElement("div");
        doc.classList.add("home-products", "mr-4");
        doc.innerHTML=`
            <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain" src="${item.image}" >
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
            ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
            ${item.type}
            </div>
            <div class="product-rating text-yellow-300 my-1">
            ⭐⭐⭐⭐⭐ ${item.Rating}
            </div>
            <div class="product-price font-bold text-gray-700">
            A${numeral(item.price).format("$0,0.00")}
            
            </div>
        `
        let addToCartEl=document.createElement("div");
        addToCartEl.classList.add("add-to-cart","h-8","w-28","bg-yellow-500","flex","items-center","justify-center","text-white","rounded","text-md","cursor-pointer","hover:bg-yellow-600")
        addToCartEl.innerHTML="Add to Cart";
        addToCartEl.addEventListener("click",function(){
            addToCart(item)
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".home-products").appendChild(doc);
    })
  
}
getItems();