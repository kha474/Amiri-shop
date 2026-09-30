<template>
  <div class="amiri-shop-app">

    <!-- NAVIGATION -->
    <nav>
      <div class="logo">
        Amiri<span>Shop</span>
      </div>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div class="cart" @click="openCart">
        🛒 Cart ({{ cartCount }})
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero" id="home">
      <div class="hero-content">
        <span class="hero-badge">🏗️ QUALITY • DURABLE • AFFORDABLE</span>

        <h1>
          Build, Farm &
          <span>Drive.</span>
        </h1>

        <p>
          Welcome to Amiri Shop — your one-stop destination for
          high-quality hardware, farm tools, and reliable car spare parts.
        </p>

        <div class="hero-buttons">
          <a href="#products" class="btn">Browse Products →</a>
          <a href="tel:0758458624" class="btn dark-btn">📞 Call Us</a>
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section id="products">
      <div class="section-title">
        <span class="small-title">OUR INVENTORY</span>
        <h2>Shop by <span>Category</span></h2>
        <p>Top quality tools and parts for every job.</p>
      </div>

      <!-- CATEGORY BUTTONS -->
      <div class="categories">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="{ selected: selectedCategory === category }"
        >
          {{ category }}
        </button>
      </div>

      <!-- SEARCH -->
      <div class="search-box">
        <span>🔍</span>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search hardware, tools, spare parts..."
        >
      </div>

      <!-- PRODUCTS GRID -->
      <div class="products-grid">

        <div
          v-for="item in filteredProducts"
          :key="item.id"
          class="product-card"
        >
          <div class="product-image">
            <img :src="item.image" :alt="item.name">
            <span class="category-tag">{{ item.category }}</span>
          </div>

          <div class="product-info">
            <h3>{{ item.name }}</h3>

            <p>{{ item.description }}</p>

            <div class="product-bottom">
              <div class="price">
                KSh {{ item.price }}
              </div>

              <button
                class="add-btn"
                @click="addToCart(item)"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

      </div>

      <div
        v-if="filteredProducts.length === 0"
        class="empty-search"
      >
        😔 No products found for "{{ searchQuery }}"
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features-section">

      <div class="section-title">
        <span class="small-title">WHY US?</span>
        <h2>Why <span>Amiri Shop?</span></h2>
      </div>

      <div class="features">

        <div class="feature">
          <div class="icon">✅</div>
          <h3>High Quality</h3>
          <p>We only stock durable and tested products.</p>
        </div>

        <div class="feature">
          <div class="icon">⚡</div>
          <h3>Fast Delivery</h3>
          <p>Quick delivery straight to your location.</p>
        </div>

        <div class="feature">
          <div class="icon">💰</div>
          <h3>Affordable</h3>
          <p>Competitive prices for all your needs.</p>
        </div>

        <div class="feature">
          <div class="icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>Pay instantly via M-Pesa or Bank transfer.</p>
        </div>

      </div>
    </section>

    <!-- ABOUT -->
    <section class="about" id="about">

      <div class="about-image">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
          alt="Amiri Shop hardware"
        >
      </div>

      <div class="about-content">

        <span class="small-title">ABOUT US</span>

        <h2>
          Built on Trust.
          <span>Delivered with Care.</span>
        </h2>

        <p>
          Amiri Shop is your trusted partner for hardware,
          farm tools, and car spare parts.
        </p>

        <p>
          We understand that your projects and vehicles need
          reliable parts. That's why we source only the best
          quality tools and spares to keep you running.
        </p>

        <a href="#products" class="btn">
          Shop Now →
        </a>

      </div>

    </section>

    <!-- CONTACT -->
    <section class="contact" id="contact">

      <span class="small-title">GET IN TOUCH</span>

      <h2>Need a specific part?</h2>

      <p>
        Call or WhatsApp us and we'll source it for you.
      </p>

      <div class="contact-buttons">

        <a
          href="tel:0758458624"
          class="btn black-btn"
        >
          📞 0758 458 624
        </a>

        <a
          href="https://wa.me/254758458624"
          target="_blank"
          class="btn whatsapp-btn"
        >
          💬 WhatsApp Us
        </a>

      </div>

    </section>

    <!-- FOOTER -->
    <footer>

      <div class="footer-logo">
        🏗️ Amiri<span>Shop</span>
      </div>

      <p>Quality Tools. Reliable Parts. Fair Prices.</p>

      <div class="footer-contact">
        📞 0758 458 624
      </div>

      <div class="footer-payment">
        💳 M-Pesa • 🏦 Bank Payment
      </div>

      <p class="copyright">
        © 2026 Amiri Shop. All Rights Reserved.
      </p>

    </footer>

    <!-- CART OVERLAY -->
    <div
      v-if="isCartOpen"
      class="cart-overlay"
      @click="closeCart"
    ></div>

    <!-- CART PANEL -->
    <div
      class="cart-panel"
      :class="{ active: isCartOpen }"
    >

      <div class="cart-header">
        <div>
          <span class="small-title">YOUR ORDER</span>
          <h2>Shopping Cart</h2>
        </div>

        <button
          class="close-cart"
          @click="closeCart"
        >
          ×
        </button>
      </div>

      <!-- EMPTY CART -->
      <div
        v-if="cart.length === 0"
        class="empty-cart"
      >
        <div>🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started.</p>

        <button
          class="btn"
          @click="closeCart"
        >
          Browse Products
        </button>
      </div>

      <!-- CART ITEMS -->
      <div v-else>

        <div
          v-for="item in cart"
          :key="item.id"
          class="cart-item"
        >

          <img
            :src="item.image"
            :alt="item.name"
          >

          <div class="cart-item-info">

            <strong>{{ item.name }}</strong>

            <span>
              KSh {{ item.price }} × {{ item.quantity }}
            </span>

            <div class="quantity">

              <button
                @click="decreaseQuantity(item)"
              >
                −
              </button>

              <b>{{ item.quantity }}</b>

              <button
                @click="increaseQuantity(item)"
              >
                +
              </button>

            </div>

          </div>

          <button
            class="delete-btn"
            @click="removeItem(item.id)"
          >
            🗑️
          </button>

        </div>

        <!-- TOTAL -->
        <div class="cart-summary">

          <div>
            <span>Subtotal</span>
            <strong>KSh {{ cartTotal }}</strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>Contact us</strong>
          </div>

          <hr>

          <div class="grand-total">
            <span>Total</span>
            <strong>KSh {{ cartTotal }}</strong>
          </div>

        </div>

        <!-- CHECKOUT -->
        <div class="checkout">

          <h3>Customer Details</h3>

          <input
            v-model="customerName"
            type="text"
            placeholder="Your name"
          >

          <input
            v-model="customerPhone"
            type="tel"
            placeholder="Your phone number"
          >

          <textarea
            v-model="customerAddress"
            placeholder="Delivery location / address"
          ></textarea>

          <h3>Payment Method</h3>

          <div class="payment-methods">

            <button
              :class="{ active: paymentMethod === 'M-Pesa' }"
              @click="paymentMethod = 'M-Pesa'"
            >
              📱 M-Pesa
            </button>

            <button
              :class="{ active: paymentMethod === 'Bank' }"
              @click="paymentMethod = 'Bank'"
            >
              🏦 Bank
            </button>

          </div>

          <!-- MPESA DETAILS -->
          <div
            v-if="paymentMethod === 'M-Pesa'"
            class="payment-box"
          >

            <h4>📱 M-Pesa Payment</h4>

            <p>
              Send payment to:
            </p>

            <strong class="payment-number">
              0758 458 624
            </strong>

            <p>
              After payment, keep your M-Pesa confirmation
              message for verification.
            </p>

          </div>

          <!-- BANK DETAILS -->
          <div
            v-if="paymentMethod === 'Bank'"
            class="payment-box"
          >

            <h4>🏦 Bank Payment</h4>

            <p>
              Bank payment details will be provided
              when you contact Amiri Shop.
            </p>

            <a
              href="tel:0758458624"
              class="payment-call"
            >
              📞 Call 0758 458 624
            </a>

          </div>

          <button
            class="checkout-btn"
            @click="checkout"
          >
            Complete Order →
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// -------------------------
// STATE
// -------------------------

const searchQuery = ref('')
const selectedCategory = ref('All')
const isCartOpen = ref(false)

const cart = ref([])

const customerName = ref('')
const customerPhone = ref('')
const customerAddress = ref('')

const paymentMethod = ref('M-Pesa')

// -------------------------
// CATEGORIES
// -------------------------

const categories = [
  'All',
  'Hardware',
  'Farm Tools',
  'Car Spare Parts',
  'Building Materials'
]

// -------------------------
// PRODUCTS
// -------------------------

const products = ref([
  // -------------------------
  // HARDWARE
  // -------------------------
  { id: 1, name: 'Claw Hammer', category: 'Hardware', description: 'Heavy-duty steel claw hammer.', price: 850, image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Screwdriver Set', category: 'Hardware', description: '6-piece precision screwdriver set.', price: 600, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Adjustable Wrench', category: 'Hardware', description: '10-inch adjustable wrench.', price: 1200, image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Tape Measure 5m', category: 'Hardware', description: 'Durable 5-meter measuring tape.', price: 450, image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Paint Brush Set', category: 'Hardware', description: 'Set of 3 different sized paint brushes.', price: 350, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80' },

  // -------------------------
  // FARM TOOLS
  // -------------------------
  { id: 6, name: 'Jembe (Hoe)', category: 'Farm Tools', description: 'Heavy-duty hand hoe for farming.', price: 700, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80' },
  { id: 7, name: 'Panga (Machete)', category: 'Farm Tools', description: 'Sharp steel machete for clearing.', price: 550, image: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?auto=format&fit=crop&w=800&q=80' },
  { id: 8, name: 'Watering Can 10L', category: 'Farm Tools', description: '10-liter plastic watering can.', price: 800, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80' },
  { id: 9, name: 'Wheelbarrow', category: 'Farm Tools', description: 'Sturdy steel wheelbarrow for heavy loads.', price: 6500, image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80' },
  { id: 10, name: 'Garden Rake', category: 'Farm Tools', description: '24-tooth garden rake for soil preparation.', price: 900, image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=800&q=80' },

  // -------------------------
  // CAR SPARE PARTS
  // -------------------------
  { id: 11, name: 'Oil Filter', category: 'Car Spare Parts', description: 'High-quality engine oil filter.', price: 1200, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80' },
  { id: 12, name: 'Brake Pads', category: 'Car Spare Parts', description: 'Ceramic front brake pads.', price: 3500, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80' },
  { id: 13, name: 'Spark Plug', category: 'Car Spare Parts', description: 'Iridium spark plug for smooth ignition.', price: 800, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80' },
  { id: 14, name: 'Wiper Blades', category: 'Car Spare Parts', description: 'Pair of durable windshield wiper blades.', price: 1500, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80' },
  { id: 15, name: 'Car Battery', category: 'Car Spare Parts', description: '12V heavy-duty car battery.', price: 12000, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80' },

  // -------------------------
  // BUILDING MATERIALS
  // -------------------------
  { id: 16, name: 'Cement 50kg', category: 'Building Materials', description: 'High-strength Portland cement.', price: 750, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { id: 17, name: 'Iron Sheets', category: 'Building Materials', description: 'Durable corrugated iron sheets.', price: 1200, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { id: 18, name: 'Nails 1kg', category: 'Building Materials', description: 'Assorted sizes of construction nails.', price: 200, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' }
])

// -------------------------
// FILTER PRODUCTS
// -------------------------

const filteredProducts = computed(() => {

  let items = products.value

  if (selectedCategory.value !== 'All') {
    items = items.filter(
      item => item.category === selectedCategory.value
    )
  }

  if (searchQuery.value) {
    items = items.filter(item =>
      item.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    )
  }

  return items
})

// -------------------------
// CART COUNT
// -------------------------

const cartCount = computed(() => {

  return cart.value.reduce(
    (total, item) => total + item.quantity,
    0
  )

})

// -------------------------
// CART TOTAL
// -------------------------

const cartTotal = computed(() => {

  return cart.value.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

})

// -------------------------
// ADD TO CART
// -------------------------

const addToCart = (item) => {

  const existingItem = cart.value.find(
    cartItem => cartItem.id === item.id
  )

  if (existingItem) {

    existingItem.quantity++

  } else {

    cart.value.push({
      ...item,
      quantity: 1
    })

  }

  isCartOpen.value = true
}

// -------------------------
// INCREASE
// -------------------------

const increaseQuantity = (item) => {
  item.quantity++
}

// -------------------------
// DECREASE
// -------------------------

const decreaseQuantity = (item) => {

  if (item.quantity > 1) {

    item.quantity--

  } else {

    removeItem(item.id)

  }

}

// -------------------------
// REMOVE
// -------------------------

const removeItem = (id) => {

  cart.value = cart.value.filter(
    item => item.id !== id
  )

}

// -------------------------
// CART
// -------------------------

const openCart = () => {
  isCartOpen.value = true
}

const closeCart = () => {
  isCartOpen.value = false
}

// -------------------------
// CHECKOUT
// -------------------------

const checkout = () => {

  if (cart.value.length === 0) {

    alert('Your cart is empty.')

    return
  }

  if (!customerName.value ||
      !customerPhone.value ||
      !customerAddress.value) {

    alert(
      'Please enter your name, phone number and delivery location.'
    )

    return
  }

  let order = cart.value
    .map(item =>
      `${item.name} x${item.quantity}`
    )
    .join(', ')

  const message =
    `Hello Amiri Shop!%0A%0A` +
    `New Order:%0A${order}%0A%0A` +
    `Total: KSh ${cartTotal.value}%0A` +
    `Customer: ${customerName.value}%0A` +
    `Phone: ${customerPhone.value}%0A` +
    `Location: ${customerAddress.value}%0A` +
    `Payment: ${paymentMethod.value}`

  window.open(
    `https://wa.me/254758458624?text=${message}`,
    '_blank'
  )

}

</script>

<style scoped>

/* =========================
   GLOBAL
========================= */

.amiri-shop-app {
  font-family:
    Inter,
    Arial,
    Helvetica,
    sans-serif;

  margin: 0;
  padding: 0;

  background: #f4f6f8;

  color: #222;

  min-height: 100vh;
}

.amiri-shop-app * {
  box-sizing: border-box;
}

/* =========================
   NAVIGATION
========================= */

nav {

  height: 75px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 0 8%;

  background: #2c3e50;

  color: white;

  position: sticky;

  top: 0;

  z-index: 1000;

}

.logo {

  font-size: 28px;

  font-weight: 900;

  color: #e67e22;

}

.logo span {
  color: white;
}

nav ul {

  display: flex;

  gap: 30px;

  list-style: none;

  margin: 0;

  padding: 0;

}

nav ul li a {

  color: white;

  text-decoration: none;

  font-weight: 600;

  transition: .3s;

}

nav ul li a:hover {
  color: #e67e22;
}

.cart {

  background: #e67e22;

  padding: 11px 18px;

  border-radius: 25px;

  font-weight: bold;

  cursor: pointer;

  transition: .3s;

}

.cart:hover {
  transform: scale(1.05);
}

/* =========================
   HERO
========================= */

.hero {

  min-height: 680px;

  display: flex;

  align-items: center;

  padding: 80px 8%;

  background:
    linear-gradient(
      rgba(0,0,0,.7),
      rgba(0,0,0,.7)
    ),
    url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=85");

  background-size: cover;

  background-position: center;

  color: white;

}

.hero-content {
  max-width: 700px;
}

.hero-badge {

  display: inline-block;

  background: rgba(230,126,34,.2);

  border: 1px solid #e67e22;

  color: #f39c12;

  padding: 9px 15px;

  border-radius: 30px;

  font-weight: bold;

  font-size: 13px;

  margin-bottom: 20px;

}

.hero h1 {

  font-size: 75px;

  line-height: .98;

  margin: 0 0 25px;

}

.hero h1 span {
  color: #e67e22;
}

.hero p {

  font-size: 20px;

  line-height: 1.7;

  margin-bottom: 30px;

  color: #eee;

}

.hero-buttons {

  display: flex;

  gap: 15px;

  flex-wrap: wrap;

}

.btn {

  display: inline-block;

  background: #e67e22;

  color: white;

  text-decoration: none;

  padding: 15px 28px;

  border-radius: 30px;

  font-weight: bold;

  border: none;

  cursor: pointer;

  transition: .3s;

}

.btn:hover {

  background: #d35400;

  transform: translateY(-3px);

}

.dark-btn {

  background: white;

  color: #2c3e50;

}

.dark-btn:hover {
  background: #eee;
}

/* =========================
   SECTIONS
========================= */

section {
  padding: 85px 8%;
}

.section-title {

  text-align: center;

  margin-bottom: 40px;

}

.small-title {

  color: #e67e22;

  font-size: 13px;

  font-weight: 800;

  letter-spacing: 2px;

}

.section-title h2 {

  font-size: 45px;

  margin: 8px 0;

}

.section-title h2 span {
  color: #e67e22;
}

.section-title p {
  color: #777;
}

/* =========================
   CATEGORIES
========================= */

.categories {

  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 10px;

  margin-bottom: 30px;

}

.categories button {

  border: 1px solid #ddd;

  background: white;

  padding: 10px 18px;

  border-radius: 25px;

  cursor: pointer;

  font-weight: 600;

  transition: .3s;

}

.categories button:hover,
.categories button.selected {

  background: #e67e22;

  color: white;

  border-color: #e67e22;

}

/* =========================
   SEARCH
========================= */

.search-box {

  max-width: 600px;

  margin: 0 auto 40px;

  background: white;

  border: 1px solid #eee;

  border-radius: 30px;

  display: flex;

  align-items: center;

  padding: 0 20px;

  box-shadow: 0 5px 20px rgba(0,0,0,.04);

}

.search-box span {
  font-size: 18px;
}

.search-box input {

  width: 100%;

  padding: 16px;

  border: none;

  outline: none;

  font-size: 16px;

  background: transparent;

}

/* =========================
   PRODUCTS
========================= */

.products-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(240px, 1fr));

  gap: 25px;

}

.product-card {

  background: white;

  border-radius: 20px;

  overflow: hidden;

  box-shadow:
    0 8px 30px rgba(0,0,0,.07);

  transition: .3s;

}

.product-card:hover {

  transform: translateY(-8px);

  box-shadow:
    0 15px 35px rgba(0,0,0,.12);

}

.product-image {

  position: relative;

}

.product-card img {

  width: 100%;

  height: 220px;

  object-fit: cover;

  display: block;

}

.category-tag {

  position: absolute;

  top: 15px;

  left: 15px;

  background: #e67e22;

  color: white;

  padding: 7px 12px;

  border-radius: 20px;

  font-size: 12px;

  font-weight: bold;

}

.product-info {
  padding: 22px;
}

.product-info h3 {

  font-size: 21px;

  margin: 0 0 8px;

}

.product-info p {

  color: #777;

  font-size: 14px;

  line-height: 1.5;

  min-height: 43px;

}

.product-bottom {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

}

.price {

  color: #e67e22;

  font-size: 21px;

  font-weight: 900;

}

.add-btn {

  background: #2c3e50;

  color: white;

  border: none;

  border-radius: 10px;

  padding: 11px 17px;

  cursor: pointer;

  font-weight: bold;

  transition: .3s;

}

.add-btn:hover {
  background: #e67e22;
}

.empty-search {

  text-align: center;

  color: #777;

  padding: 40px;

}

/* =========================
   FEATURES
========================= */

.features-section {
  background: #eef2f5;
}

.features {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(200px, 1fr));

  gap: 25px;

  text-align: center;

}

.feature {

  background: white;

  padding: 35px 20px;

  border-radius: 18px;

  box-shadow:
    0 5px 25px rgba(0,0,0,.05);

}

.feature .icon {

  font-size: 45px;

  margin-bottom: 15px;

}

.feature h3 {
  margin-bottom: 10px;
}

.feature p {

  color: #777;

  line-height: 1.6;

}

/* =========================
   ABOUT
========================= */

.about {

  background: #2c3e50;

  color: white;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 60px;

  align-items: center;

}

.about img {

  width: 100%;

  border-radius: 25px;

}

.about h2 {

  font-size: 50px;

  margin: 10px 0 20px;

}

.about h2 span {
  color: #e67e22;
}

.about p {

  color: #ccc;

  line-height: 1.8;

  margin-bottom: 20px;

}

/* =========================
   CONTACT
========================= */

.contact {

  background: #e67e22;

  color: white;

  text-align: center;

}

.contact h2 {

  font-size: 45px;

  margin: 10px 0;

}

.contact-buttons {

  display: flex;

  justify-content: center;

  gap: 15px;

  flex-wrap: wrap;

}

.black-btn {
  background: #2c3e50;
}

.whatsapp-btn {

  background: #25d366;

}

.black-btn:hover {
  background: #1a252f;
}

.whatsapp-btn:hover {
  background: #20b957;
}

/* =========================
   FOOTER
========================= */

footer {

  background: #2c3e50;

  color: white;

  text-align: center;

  padding: 45px 8%;

}

.footer-logo {

  font-size: 30px;

  font-weight: 900;

  color: #e67e22;

}

.footer-logo span {
  color: white;
}

.footer-payment {

  margin-top: 15px;

  color: #e67e22;

  font-weight: bold;

}

.footer-contact {

  margin-top: 12px;

  font-weight: bold;

}

.copyright {

  color: #7f8c8d;

  margin-top: 25px;

  font-size: 13px;

}

/* =========================
   CART OVERLAY
========================= */

.cart-overlay {

  position: fixed;

  inset: 0;

  background: rgba(0,0,0,.55);

  z-index: 1999;

}

/* =========================
   CART PANEL
========================= */

.cart-panel {

  position: fixed;

  right: -500px;

  top: 0;

  width: 430px;

  max-width: 95%;

  height: 100vh;

  background: white;

  z-index: 2000;

  box-shadow:
    -10px 0 40px rgba(0,0,0,.25);

  padding: 28px;

  transition: .4s;

  overflow-y: auto;

}

.cart-panel.active {
  right: 0;
}

.cart-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;

}

.cart-header h2 {

  margin: 5px 0 0;

}

.close-cart {

  border: none;

  background: #f5f5f5;

  width: 40px;

  height: 40px;

  border-radius: 50%;

  font-size: 25px;

  cursor: pointer;

}

/* =========================
   CART ITEMS
========================= */

.cart-item {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 15px 0;

  border-bottom: 1px solid #eee;

}

.cart-item img {

  width: 65px;

  height: 65px;

  border-radius: 10px;

  object-fit: cover;

}

.cart-item-info {

  flex: 1;

}

.cart-item-info strong {

  display: block;

  margin-bottom: 5px;

}

.cart-item-info span {

  font-size: 13px;

  color: #777;

}

.quantity {

  display: flex;

  align-items: center;

  gap: 12px;

  margin-top: 8px;

}

.quantity button {

  width: 28px;

  height: 28px;

  border: none;

  background: #2c3e50;

  color: white;

  border-radius: 50%;

  cursor: pointer;

}

.delete-btn {

  border: none;

  background: transparent;

  cursor: pointer;

}

/* =========================
   CART SUMMARY
========================= */

.cart-summary {

  margin-top: 25px;

}

.cart-summary > div {

  display: flex;

  justify-content: space-between;

  margin: 12px 0;

}

.cart-summary hr {

  border: none;

  border-top: 1px solid #ddd;

}

.grand-total {

  font-size: 22px;

  color: #e67e22;

}

/* =========================
   CHECKOUT
========================= */

.checkout {

  margin-top: 30px;

}

.checkout h3 {

  margin: 25px 0 12px;

}

.checkout input,
.checkout textarea {

  width: 100%;

  border: 1px solid #ddd;

  border-radius: 10px;

  padding: 15px;

  margin-bottom: 10px;

  outline: none;

  font-family: inherit;

}

.checkout textarea {

  height: 150px;

  resize: none;

}

.payment-methods {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 20px;

}

.payment-methods button {

  padding: 13px;

  border: 1px solid #ddd;

  background: white;

  border-radius: 10px;

  cursor: pointer;

  font-weight: bold;

}

.payment-methods button.active {

  background: #e67e22;

  color: white;

  border-color: #e67e22;

}

.payment-box {

  margin-top: 15px;

  background: #fff7ed;

  border: 1px solid #ffd6a5;

  border-radius: 12px;

  padding: 18px;

}

.payment-box h4 {

  margin-top: 0;

  color: #e67e22;

}

.payment-number {

  display: block;

  font-size: 25px;

  color: #111;

  margin: 10px 0;

}

.payment-call {

  color: #e67e22;

  font-weight: bold;

  text-decoration: none;

}

.checkout-btn {

  width: 100%;

  margin-top: 20px;

  padding: 16px;

  background: #e67e22;

  color: white;

  border: none;

  border-radius: 12px;

  font-size: 16px;

  font-weight: bold;

  cursor: pointer;

}

.checkout-btn:hover {
  background: #d35400;
}

/* =========================
   EMPTY CART
========================= */

.empty-cart {

  text-align: center;

  padding: 50px 10px;

  color: #777;

}

.empty-cart > div {

  font-size: 60px;

  margin-bottom: 15px;

}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  nav {

    padding: 0 5%;

  }

  nav ul {
    display: none;
  }

  .logo {
    font-size: 24px;
  }

  .hero {

    min-height: 600px;

    padding: 50px 6%;

  }

  .hero h1 {

    font-size: 52px;

  }

  .hero p {

    font-size: 17px;

  }

  section {

    padding: 60px 6%;

  }

  .section-title h2 {

    font-size: 35px;

  }

  .about {

    grid-template-columns: 1fr;

    gap: 35px;

  }

  .about h2 {

    font-size: 38px;

  }

  .contact h2 {

    font-size: 35px;

  }

  .cart-panel {

    width: 95%;

    padding: 20px;

  }

}

</style>