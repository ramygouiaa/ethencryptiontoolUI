// Get identity section elements
const getIdentityBtn = document.getElementById('get-identity-btn');
const publicKeyTextarea = document.getElementById('public-key-textarea');
const privateKeyTextarea = document.getElementById('private-key-textarea');
const addressTextarea = document.getElementById('address-textarea');

// Get encryption section elements
const publicKeyInput = document.getElementById('public-key-input');
const messageInput = document.getElementById('message-input');
const encryptMessageBtn = document.getElementById('encrypt-message-btn');
const encryptionSpinner = document.getElementById('encryption-spinner');//this is unused
const encryptedMessageTextarea = document.getElementById('encrypted-message-textarea');

// Get decryption section elements
const privateKeyInput = document.getElementById('private-key-input');
const encryptedMessageInput = document.getElementById('encrypted-message-input');
const decryptMessageBtn = document.getElementById('decrypt-message-btn');
const decryptionSpinner = document.getElementById('decryption-spinner');
const decryptedMessageTextarea = document.getElementById('decrypted-message-textarea');

// Show loading dialog
function showLoading() {
  $('.spinner').show();
  $('.loading-text').show();
}
// Hide loading dialog
function hideLoading() {
  $('.spinner').hide();
  $('.loading-text').hide();
}

// Get identity from server
async function getIdentity() {
  try {
    showLoading();
    const response = await fetch('https://ethereumencryptionservice.onrender.com/identity');
    const json = await response.json();
    privateKeyTextarea.value = json.privateKey;
    publicKeyTextarea.value = json.publicKey;
    addressTextarea.value = json.address;
    hideLoading();
  } catch (error) {
    console.error(error);
    hideLoading();
  }
}

// Encrypt message using server
async function encryptMessage() {
  try {
    showLoading();
    const response = await fetch('https://ethereumencryptionservice.onrender.com/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        publicKey: publicKeyInput.value,
        message: messageInput.value
      })
    });
    const json = await response.json();
    encryptedMessageTextarea.value = json.encryptedMessage;
    hideLoading();
  } catch (error) {
    console.error(error);
    hideLoading();
  }
}

// Decrypt message using server
async function decryptMessage() {
  try {
    showLoading();
    const response = await fetch('https://ethereumencryptionservice.onrender.com/decrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        privateKey: privateKeyInput.value,
        encryptedMessage: encryptedMessageInput.value
      })
    });
    const json = await response.json();
    decryptedMessageTextarea.value = json.decryptedMessage;
    hideLoading();
  } catch (error) {
    console.error(error);
    hideLoading();
  }
}

// Attach event listeners to buttons
getIdentityBtn.addEventListener('click', getIdentity);
encryptMessageBtn.addEventListener('click', encryptMessage);
decryptMessageBtn.addEventListener('click', decryptMessage);