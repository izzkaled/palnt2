// جلب بيانات السلة من LocalStorage أو مصدر آخر
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// عرض المنتجات في صفحة الدفع
function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // تنظيف السلة

    let total = 0; // إجمالي السعر

    cartItems.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">${item.price} ريال</div>
                <div class="quantity">الكمية: ${item.quantity}</div>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    document.getElementById('total-amount').innerText = total; // تحديث الإجمالي
}

// التعامل مع إتمام عملية الشراء
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let payment = document.getElementById('payment').value;

    // هنا يمكن إضافة الكود الخاص بإرسال البيانات إلى الخادم أو معالجة الدفع
    alert(`تم إتمام الشراء بنجاح! \n الاسم: ${name} \n العنوان: ${address} \n الهاتف: ${phone} \n طريقة الدفع: ${payment}`);
    localStorage.removeItem('cart'); // مسح السلة بعد إتمام الشراء

    // يمكن إعادة توجيه المستخدم إلى صفحة أخرى بعد إتمام العملية
});

// عرض المنتجات عند تحميل الصفحة
displayCartItems();
