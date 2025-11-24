var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const humburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const bars = document.querySelector('.fa-bars');
const whatsapp = document.querySelector('.whatsapp')
const facebook = document.querySelector('.facebok')

function toast(message, type = "success") {
    Toastify({
        text: message,
        duration: 1500,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background:"#f2bd12",
        },
    }).showToast();
}


whatsapp.addEventListener("dblclick",function(){
    let number="+923053905068"
    let url=`https://wa.me/${number}`
    window.open(url,'_blank')
})

facebook.addEventListener("dblclick",function(){
  window.open("https://www.facebook.com/profile.php?id=100086723404713", "_blank")
})

cartIcon.addEventListener("click", () =>
  cartTab.classList.add("cart-tab-active")
);
closeBtn.addEventListener("click", () => cartTab.classList.remove("cart-tab-active"));

humburger.addEventListener('click', () => {
  mobileMenu.classList.toggle("mobile-menu-active");
  bars.classList.toggle("fa-bars");
  bars.classList.toggle("fa-xmark");
});

let productlist = [];
let cartProduct = [];

const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".iteam").forEach((iteam) => {
    const quantity = parseInt(
      iteam.querySelector(".quantity-value").textContent
    );
    const price = parseFloat(
      iteam.querySelector(".iteam-total").textContent.replace("$", "")
    );

    totalPrice += price;
    totalQuantity += quantity;
  });

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};

const showCard = () => {
  productlist.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btn card-btn">Add to Cart</a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");
    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProduct = cartProduct.find((iteam) => iteam.id === product.id);
  if (existingProduct) {
    toast("Iteam already in your cart");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("$", ""));

  const cartIteam = document.createElement("div");
  cartIteam.classList.add("iteam");

  cartIteam.innerHTML = `
    <div class="iteam-image">
       <img src="${product.image}">
    </div>
    <div class="detail">
        <h4>${product.name}</h4>
        <h4 class="iteam-total">${product.price}</h4>
    </div>
    <div class="flex">
      <a href="#" class="quatity-btn minus">
          <i class="fa-solid fa-minus"></i>
      </a>
      <h4 class="quantity-value">${quantity}</h4>
      <a href="#" class="quatity-btn plus">
          <i class="fa-solid fa-plus"></i>
      </a>
    </div>
  `;

  cartList.appendChild(cartIteam);
  updateTotals();

  const plusBtn = cartIteam.querySelector(".plus");
  const quantityValue = cartIteam.querySelector(".quantity-value");
  const iteamTotal = cartIteam.querySelector(".iteam-total");
  const minusBtn = cartIteam.querySelector(".minus");

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    iteamTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotals();
  });

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      iteamTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cartIteam.classList.add("slide-out");

      setTimeout(() => {
        cartIteam.remove();
        cartProduct = cartProduct.filter((iteam) => iteam.id !== product.id);
        updateTotals();
      }, 300);
    }
  });
};

const initapp = () => {
  fetch("products.json")
    .then((Response) => Response.json())
    .then((data) => {
      productlist = data;
      showCard();
    });
};

initapp();
