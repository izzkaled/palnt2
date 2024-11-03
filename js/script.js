// تعريف العناصر الخاصة بالتنقل والواجهة
const barmenu = document.querySelector('.nav-bar');
let navbars = document.querySelector('#menu-bar');
let header3 = document.querySelector('.header-3');
let scrollTop = document.querySelector('.scroll-top');
let cart = document.querySelector('.cart-items-container');
let cartItems = []; // مصفوفة السلة لتخزين المنتجات المضافة

document.querySelector("#menu-bar").onclick = () => {
    navbars.classList.toggle('fa-times');
    barmenu.classList.toggle('active');
    cart.classList.remove('active');
}

window.onscroll = () => {
    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');
    if (window.scrollY > 250) {
        header3.classList.add('active');
    } else {
        header3.classList.remove('active');
    }
    if (window.scrollY > 250) {
        scrollTop.style.display = 'initial';
    } else {
        scrollTop.style.display = 'none';
    }
}

window.onload = () => {
    cart.classList.remove('active');
    userlogin.classList.remove('active');
    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');
}

const userlogin = document.querySelector('.login-form-container');
document.querySelector('#login-btn').onclick = () => {
    userlogin.classList.toggle('active');
    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');
    cart.classList.remove('active');
}
const closeLogin = document.querySelector('.login-form-container');
document.querySelector('#close-login-btn').onclick = () => {
    closeLogin.classList.remove('active');
}

document.querySelector('#cart-btn').onclick = () => {
    cart.classList.toggle('active');
    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');
}

// إعداد الـ Swiper للحركة
let swiper = new Swiper(".home-slider", {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

// عد تنازلي لقسم العروض
let countDate = new Date('Jan 1, 2025 00:00:00').getTime();

function countDown() {
    let now = new Date().getTime();
    let gap = countDate - now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s = Math.floor((gap % (minute)) / (second));

    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;
}

setInterval(function() {
    countDown();
}, 1000);

// إضافة المنتجات إلى السلة
function addToCart(productName, productPrice) {
    // البحث عن المنتج في السلة
    let product = cartItems.find(item => item.name === productName);

    if (product) {
        product.quantity += 1; // زيادة الكمية إذا كان المنتج موجود بالفعل
    } else {
        cartItems.push({ name: productName, price: productPrice, quantity: 1 }); // إضافة منتج جديد للسلة
    }

    updateCartDisplay(); // تحديث عرض السلة
}

function updateCartDisplay() {
    cart.innerHTML = ''; // تنظيف السلة قبل التحديث

    let total = 0; // إجمالي السعر

    cartItems.forEach(item => {
        // إنشاء عنصر HTML لكل منتج في السلة
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="fas fa-times" onclick="removeFromCart('${item.name}')"></span>
            <img src="./images/product1.jpg" alt="">
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">${item.price} ريال</div>
                <div class="quantity">الكمية: ${item.quantity}</div>
            </div>
        `;
        cart.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    // إضافة الإجمالي وسعر المنتجات
    let totalPrice = document.createElement('div');
    totalPrice.classList.add('cart-total');
    totalPrice.innerHTML = `<h3>الإجمالي: ${total} ريال</h3>`;
    cart.appendChild(totalPrice);

    // زر إتمام عملية الشراء
    let checkoutButton = document.createElement('a');
    checkoutButton.href = "#";
    checkoutButton.classList.add('btn');
    checkoutButton.id = 'checkout-btn';  // إضافة معرف فريد للزر
    checkoutButton.innerText = 'Checkout now';
    cart.appendChild(checkoutButton);

    // ربط زر "Checkout now" بالانتقال لصفحة الدفع
    document.querySelector('#checkout-btn').addEventListener('click', function(event) {
        // تحقق مما إذا كانت السلة تحتوي على منتجات
        if (cartItems.length > 0) {
            window.location.href = 'checkout.html'; // الانتقال إلى صفحة الشراء
        } else {
            event.preventDefault(); // منع الانتقال إذا كانت السلة فارغة
            alert('السلة فارغة، الرجاء إضافة منتجات قبل إتمام الشراء.');
        }
    });
}

// إزالة المنتج من السلة
function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item.name !== productName); // إزالة المنتج
    updateCartDisplay(); // تحديث عرض السلة
}

// ربط الأزرار بإضافة المنتجات للسلة
document.querySelectorAll('.product .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let productName = btn.parentElement.querySelector('h3').innerText;
        let productPrice = parseFloat(btn.parentElement.querySelector('.price').innerText.replace(' ريال', '').trim());
        addToCart(productName, productPrice);
    });
});
// إضافة المنتجات إلى السلة
function addToCart(productName, productPrice) {
    // البحث عن المنتج في السلة
    let product = cartItems.find(item => item.name === productName);

    if (product) {
        product.quantity += 1; // زيادة الكمية إذا كان المنتج موجود بالفعل
    } else {
        cartItems.push({ name: productName, price: productPrice, quantity: 1 }); // إضافة منتج جديد للسلة
    }

    // تحديث LocalStorage عند إضافة المنتجات
    localStorage.setItem('cart', JSON.stringify(cartItems));

    updateCartDisplay(); // تحديث عرض السلة
}

// عند تحديث السلة، إعادة تحميل بيانات السلة من LocalStorage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cartItems = JSON.parse(storedCart); // تحميل السلة من LocalStorage
    }
    updateCartDisplay();
}

// استدعاء دالة التحميل عند بداية تشغيل الصفحة
window.onload = function() {
    loadCartFromStorage();
};
