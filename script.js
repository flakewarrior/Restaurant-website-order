let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({item, price});
  total += price;
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  cart.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.item} - Tsh ${c.price}`;
    cartList.appendChild(li);
  });
  document.getElementById('cart-total').textContent = total;
}

function placeOrder() {
  const orderType = document.querySelector('input[name="orderType"]:checked')?.value;
  const payment = document.querySelector('input[name="payment"]:checked')?.value;
  const tableNumber = document.getElementById('tableNumber').value;
  const instructions = document.getElementById('instructions').value;

  if (!orderType || !payment) {
    alert("Please select order type and payment method.");
    return;
  }

  const orderData = {
    items: cart,
    total,
    orderType,
    payment,
    tableNumber,
    instructions
  };

  // Send to n8n workflow via ngrok webhook
  fetch("https://unseparating-leandro-gravest.ngrok-free.dev/rest/oauth2-credential/callback", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(orderData)
  })
  .then(res => res.json())
  .then(data => {
    alert("Order placed successfully!");
    cart = [];
    total = 0;
    renderCart();
  })
  .catch(err => {
    console.error(err);
    alert("Error placing order.");
  });
}
