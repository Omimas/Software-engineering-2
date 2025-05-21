// Ortak bölümleri yükleme fonksiyonu
async function loadHTML(id, url) {
  const response = await fetch(url);
  const text = await response.text();
  document.getElementById(id).innerHTML = text;
}

// Sayfa yüklenince header ve footer'ı yükle
window.onload = () => {
  loadHTML('header', 'partials/header.html').then(() => {
    setupSearch();
  });
  loadHTML('footer', 'partials/footer.html');
  loadCategory('home');
};

// Arama kutusunu ayarla
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  searchInput.addEventListener('focus', () => {
    if (searchInput.value === '') {
      searchInput.placeholder = '';
    }
  });

  searchInput.addEventListener('blur', () => {
    if (searchInput.value === '') {
      searchInput.placeholder = 'search';
    }
  });

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query === '') {
      alert('Please enter a search term.');
      return;
    }
    displaySearchResults(query);
  });

  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
}

// Arama sonuçlarını göster
function displaySearchResults(query) {
  const content = document.getElementById('content');
  const lowerQuery = query.toLowerCase();

  let allProducts = [];
  Object.values(productsData).forEach(arr => {
    allProducts = allProducts.concat(arr);
  });

  const results = allProducts.filter(p => p.name.toLowerCase().includes(lowerQuery));

  if (results.length === 0) {
    content.innerHTML = `<h2>Search results for "${query}"</h2><p>No products found.</p>`;
    return;
  }

  let html = `<h2>Search results for "${query}"</h2><div class="product-list">`;
  results.forEach(p => {
    html += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <strong>${p.name}</strong>
       <span>${p.price.toFixed(2)} PLN</span>
        <button onclick="alert('Added ${p.name} to cart!')">Add to Cart</button>
      </div>
    `;
  });
  html += '</div>';
  content.innerHTML = html;
}

// Ürün verileri
const productsData = {
  home: [
    { name: "Welcome to Omimas!", price: 0, image: "" }
  ],
  electronics: [
    { name: "Lenovo", price: 2999.99, image: "images/laptop1.jpg" },
    { name: "MacBook", price: 2999.99, image: "images/laptop2.jpg" },
    { name: "MacBook Pro", price: 2999.99, image: "images/laptop3.jpg" },
    { name: "Asus", price: 2999.99, image: "images/laptop5.jpg" },
  ],
  fashion: [
    { name: "T-Shirt", price: 99.99, image: "https://via.placeholder.com/220?text=T-Shirt" },
    { name: "Sneakers", price: 149.99, image: "https://via.placeholder.com/220?text=Sneakers" }
  ],
  "home-living": [
    { name: "Sofa", price: 899.99, image: "https://via.placeholder.com/220?text=Sofa" },
    { name: "Lamp", price: 59.99, image: "https://via.placeholder.com/220?text=Lamp" }
  ],
  sports: [
    { name: "Football", price: 49.99, image: "https://via.placeholder.com/220?text=Football" },
    { name: "Tennis Racket", price: 129.99, image: "https://via.placeholder.com/220?text=Tennis+Racket" }
  ],
  books: [
    { name: "JavaScript Guide", price: 39.99, image: "https://via.placeholder.com/220?text=JS+Guide" },
    { name: "CSS Mastery", price: 29.99, image: "https://via.placeholder.com/220?text=CSS+Mastery" }
  ]
};

// Kategori yükleme
function loadCategory(category) {
  const content = document.getElementById('content');

  if (category === 'home') {
    content.innerHTML = `
      <div class="slider-container">
        <img id="slider-image" src="images/discount1.jpg" alt="Discount Banner">
      </div>

      <h2 class="section-title">Populer Products</h2>
      <div class="product-list">
        <div class="product-card">
          <img src="images/Ürün1.jpg" alt="Product 1">
          <strong>Product 1</strong>
          <div class="stars">⭐⭐⭐⭐☆</div>
          <span>99.99 PLN</span>
        </div>
        <div class="product-card">
          <img src="images/Ürün2.jpg" alt="Product 1">
          <strong>Product 2</strong>
          <div class="stars">⭐⭐⭐☆☆</div>
          <span>149.99 PLN</span>
        </div>
        <div class="product-card">
          <img src="images/Ürün3.jpg" alt="Product 1">
          <strong>Product 3</strong>
          <div class="stars">⭐⭐⭐⭐⭐</div>
          <span>199.99 PLN</span>
        </div>
      </div>
    `;

    startSlider();
    return;
  }

  const products = productsData[category] || [];
  if (products.length === 0) {
    content.innerHTML = `<h2>${capitalize(category)}</h2><p>No products found.</p>`;
    return;
  }

  let html = `<h2>${capitalize(category)}</h2><div class="product-list">`;
  products.forEach(p => {
    html += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <strong>${p.name}</strong>
       <span>${p.price.toFixed(2)} PLN</span>
        <button onclick="alert('Added ${p.name} to cart!')">Add to Cart</button>
      </div>
    `;
  });
  html += '</div>';
  content.innerHTML = html;
}

// Metin baş harfini büyük yap
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Slider başlat
function startSlider() {
  const sliderImages = [
    "images/discount1.jpg",
    "images/discount2.jpg",
    "images/discount3.jpg"
  ];
  let currentSlide = 0;
  const sliderEl = document.getElementById("slider-image");

  if (!sliderEl) return;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    sliderEl.src = sliderImages[currentSlide];
  }, 3000);
}
