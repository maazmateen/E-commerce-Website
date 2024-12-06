const div = document.querySelector(".card");
const h1 = document.querySelector(".count");
h1.innerHTML = localStorage.getItem("itemCount") || 0;
let cartItems = [];
const Base_URL = fetch("https://dummyjson.com/products") 

.then((res)=> res.json())
.then((res)=>{
    console.log(res.products);
    res.products.map((item)=>{
        div.innerHTML += `<div class="content">
        <div class = "img">
           <img src="${item.thumbnail}" alt="img">
        </div>
           <h1>Title: ${item.title}</h1>
           <h1>Category: ${item.category}</h1>
           <h1>Price: $${item.price}</h1>
           <h3>Description: ${item.description.slice(0 , 20)}...</h3>
           <button class = "seemore-btn" onclick = "seeMore(${item.id})">See more...</button>      
           <button class = "addToCart-btn" onclick = "addToCart(${item.id})">Add to cart</button>
       </div>
        `
    })
    }).catch((err)=>{
        console.error(err);
        
    })


const checkDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
if (checkDataFromLocalStorage === null) {
    cartItems = [];
    } else {
      cartItems = [...checkDataFromLocalStorage];
    }
    
function seeMore(id){
    // console.log(id);
    localStorage.setItem("id", id)
    window.location = "singleProduct.html"
    
}    



function addToCart(id){
    // console.log(id);
    if(cartItems.indexOf((id)) === -1){
        cartItems.push((id))
        let itemCount = parseInt(localStorage.getItem("itemCount")) || 0;
        itemCount++;
        localStorage.setItem("itemCount" , itemCount)
        h1.innerHTML = itemCount;
        Swal.fire({
            title: "Good job!",
            text: "Item added to cart successfully!",
            icon: "success",
          });
       }else{
        Swal.fire({
            title: "Item is already in the cart",
            icon: "warning",
            confirmButtonColor: "#3085d6",
        })
    }
    console.log(cartItems);
}
    




function checkOut(){
    let convertArrIntoString = JSON.stringify(cartItems)
    localStorage.setItem("cart" , convertArrIntoString);
    window.location = "cart.html";
}


