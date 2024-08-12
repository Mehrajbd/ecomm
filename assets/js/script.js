'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}
document.addEventListener('DOMContentLoaded', () => {
  const userIcon = document.getElementById('user-icon');
  userIcon.addEventListener('click', handleUserIconClick);
});

function handleUserIconClick() {
  // Assume the user is logged in and we have a user ID
  const userId = getLoggedInUserId();
  
  // Fetch user data
  fetchUserData(userId)
    .then(userData => {
      // Display user data in a modal or redirect to user account page
      displayUserData(userData);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function getLoggedInUserId() {
  // Dummy function to get logged-in user ID
  // Replace this with your actual implementation
  return 123; // Example user ID
}

function fetchUserData(userId) {
  return fetch(`/api/user/${userId}`)
    .then(response => response.json());
}

function displayUserData(userData) {
  // Example of displaying user data in a modal
  const modalContent = `
    <div class="user-modal">
      <h2>${userData.name}'s Account</h2>
      <p>Email: ${userData.email}</p>
      <p>Order History: ${userData.orderHistory.join(', ')}</p>
      <button id="logout-btn">Logout</button>
    </div>
  `;
  // Assuming you have a function to show the modal
  showModal(modalContent);

  document.getElementById('logout-btn').addEventListener('click', handleLogout);
}

document.getElementById('user-icon').addEventListener('click', function() {
  window.location.href = 'user.html';
});
document.getElementById('quantity').addEventListener('input', calculateTotal);
document.getElementById('price').addEventListener('input', calculateTotal);

function calculateTotal() {
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;
  const total = quantity * price;
  document.getElementById('total').value = total.toFixed(2);
}

function generateOrderNumber() {
  return 'ORD' + Math.floor(Math.random() * 1000000);
}

function getRandomShippingAddress() {
  const addresses = [
    '123 Main St, Springfield, IL',
    '456 Elm St, Shelbyville, IL',
    '789 Oak St, Ogdenville, IL'
  ];
  return addresses[Math.floor(Math.random() * addresses.length)];
}

function getEstimatedDeliveryDate() {
  const today = new Date();
  const estimatedDelivery = new Date(today);
  estimatedDelivery.setDate(today.getDate() + 5); // Estimated delivery in 5 days
  return estimatedDelivery.toISOString().split('T')[0];
}

function checkout() {
  const orderNumber = generateOrderNumber();
  const shippingAddress = getRandomShippingAddress();
  const deliveryDate = getEstimatedDeliveryDate();

  const queryParams = new URLSearchParams({
    orderNumber: orderNumber,
    shippingAddress: shippingAddress,
    deliveryDate: deliveryDate
  });

  window.location.href = 'order-tracking.html?' + queryParams.toString();
}
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById('order-number').value = urlParams.get('orderNumber');
  document.getElementById('shipping-address').value = urlParams.get('shippingAddress');
  document.getElementById('delivery-date').value = urlParams.get('deliveryDate');
});
