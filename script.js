let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  alert(item + " added to cart!");
}

function viewCart() {
  let summary = cart.map(c => `${c.item} - Tsh ${c.price}`).join("\n");
  alert("Your Cart:\n" + summary);
}

function toggleService() {
  const service = document.querySelector('input[name="service"]:checked').value;
  document.getElementById("dineInFields").style.display = service === "Dine In" ? "block" : "none";
  document.getElementById("deliveryFields").style.display = service === "Delivery" ? "block" : "none";
}

function togglePayment() {
  const payment = document.querySelector('input[name="payment"]:checked').value;
  document.getElementById("mobileFields").style.display = payment === "Mobile Pay" ? "block" : "none";
  document.getElementById("cardFields").style.display = payment === "Card" ? "block" : "none";
}

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const service = document.querySelector('input[name="service"]:checked').value;
  const payment = document.querySelector('input[name="payment"]:checked').value;

  const formData = new FormData(e.target);
  const extra = Object.fromEntries(formData.entries());

  const order = {
    cart,
    service,
    payment,
    extra
  };

  try {
    const res = await fetch("https://unseparating-leandro-gravest.ngrok-free.dev/webhook-test/webhook-test/ffd01a1e-14ca-466c-b8cc-54eee5deb5aa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    const data = await res.json();
    document.getElementById("response").textContent = "Order placed successfully!";
    cart = [];
  } catch (err) {
    document.getElementById("response").textContent = "Error placing order.";
  }
});
