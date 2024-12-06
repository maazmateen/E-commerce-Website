const div = document.querySelector(".container-2")
let convert = JSON.parse(localStorage.getItem("cart"));
console.log(convert);
 
convert.forEach((item, id) => {
  fetch(`https://dummyjson.com/products/${item}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      const cartQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
      const savedQuantity = cartQuantities[id] || 1; 

      div.innerHTML += `
        <div class="cart-content">
          <div class="single-img">
            <img width="300px" src="${res.thumbnail}" alt="thumbnail">
          </div>
          <div class="product-content">
            <h1>Title: ${res.title}</h1>
            <h2>Category: ${res.category}</h2>
            <h3>Description: ${res.description}</h3>
            <h3>Rating: ${res.rating}</h3>
            <h3>Stock: ${res.stock}</h3>
            <h2>Price: $${res.price}</h2>
            <button id="plus" onclick="increment(${id} , ${res.price})">+</button>
            <h1 id="head-${id}">${savedQuantity}</h1>
            <button id="minus" onclick="decrement(${id} , ${res.price})">-</button>
            <h2 id = "item-price-${id}">Total Price: $${res.price * savedQuantity}</h2>
            <button id = "delete-btn" onclick = "deleteData(${id})">Delete</button>
            <button class = "buy-now-btn" onclick = "buyNow()">Buy now</button>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.error(err);
    });
});

  

function increment(id , price) {
  const head1 = document.querySelector(`#head-${id}`);
  const itemPrice = document.querySelector(`#item-price-${id}`);
  let currentQuantity = parseInt(head1.innerHTML);
  currentQuantity++; 
  head1.innerHTML = currentQuantity;
    
  const totalPrice = (price * currentQuantity).toFixed(2);
  itemPrice.innerHTML = `Total Price: $${totalPrice}`;
  updateLocalStorage(id, currentQuantity);
  }
  
function decrement(id , price) {
  const head1 = document.querySelector(`#head-${id}`);
  const itemPrice = document.querySelector(`#item-price-${id}`)
  let currentQuantity = parseInt(head1.innerHTML);
    
  if (currentQuantity > 1) {
    currentQuantity--; 
    head1.innerHTML = currentQuantity;
      
    const totalPrice = (price * currentQuantity).toFixed(2);
    itemPrice.innerHTML = `Total Price: $${totalPrice}`;
    updateLocalStorage(id, currentQuantity);
    }
  }
  
  function updateLocalStorage(id, quantity) {
    const cartQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
    cartQuantities[id] = quantity;
  
    localStorage.setItem("cartQuantities", JSON.stringify(cartQuantities));
  }
  

function deleteData(id){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      div.innerHTML = ""
    convert.splice(id , 1)
    const newcartstring = JSON.stringify(convert)
    localStorage.setItem("cart",newcartstring)
    convert.forEach((item, id) => {
      fetch(`https://dummyjson.com/products/${item}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
    
          const cartQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
          const savedQuantity = cartQuantities[id] || 1; 
    
          div.innerHTML += `
            <div class="cart-content">
              <div class="single-img">
                <img width="300px" src="${res.thumbnail}" alt="thumbnail">
              </div>
              <div class="product-content">
                <h1>Title: ${res.title}</h1>
                <h2>Category: ${res.category}</h2>
                <h3>Description: ${res.description}</h3>
                <h3>Rating: ${res.rating}</h3>
                <h3>Stock: ${res.stock}</h3>
                <h2>Price: $${res.price}</h2>
                <button id="plus" onclick="increment(${id} , ${res.price})">+</button>
                <h1 id="head-${id}">${savedQuantity}</h1>
                <button id="minus" onclick="decrement(${id} , ${res.price})">-</button>
                <h2 id = "item-price-${id}">Total Price: $${res.price * savedQuantity}</h2>
                <button id = "delete-btn" onclick = "deleteData(${id})">Delete</button>
                <button class = "buy-now-btn" onclick = "buyNow()">Buy now</button>
              </div>
            </div>
          `;
        })
        .catch((err) => {
          console.error(err);
        });
    });
}
}
)}
    


function buyNow(){
  Swal.fire({
    title: 'Are you sure you want to buy this product?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Your order have been submitted!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('chnages are not saved!', '', 'info')
    }
  })
}

