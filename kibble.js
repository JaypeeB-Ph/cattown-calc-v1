let kibblereward;


// GET USD VALUE OF KIBBLE REWARD

async function fetchKibblePrice() {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=kibble&vs_currencies=usd');
      const data = await response.json();
      const price = data.kibble.usd;
      return price;
  } catch (error) {
      console.error('Error fetching KIBBLE price:', error);
      return null;
  }
}

async function displayPrice() {
  const price = await fetchKibblePrice();
  if (price !== null) {
      document.getElementById('price-info').textContent = (price * kibblereward).toFixed(3) + " USD";
  } else {
      document.getElementById('price-info').textContent = 'Failed to fetch price';
  }
}

// Update price every 30 seconds
setInterval(displayPrice, 30000);


function calculate() {
  let E7 = parseFloat(document.getElementById('catsowned').value);
  let E22 = parseFloat(document.getElementById('tkibble').value);
  let E6 = parseFloat(document.getElementById('kibbleowned').value);
  let E21 = parseFloat(document.getElementById('tcats').value);
  const F47 = 10000; // Fixed value from Excel
  const F45 = 1000; // Fixed value from Excel

  // Perform calculation
  let result;
  if (E7 < 100) {
    result = 0;
} else {
    result = ((E22 * (F47 / 2 + ((F47 * E6 * 1000000000000000000) / (100000000 * 1000000000000000000) * 3 + 7 * (F47 * E7) / E21) * F45 / 10)) / Math.pow(10000, 2));
}

// Check if any input is empty or NaN
  if (isNaN(E7) || isNaN(E22) || isNaN(E6) || isNaN(E21) || E7 === '' || E22 === '' || E6 === '' || E21 === '') {
  document.getElementById('reward').textContent = "No rewards! 😾 Fill all the fields please 🐱 ";
}else{

  // Display result
  document.getElementById('reward').textContent = result.toFixed(3);
  kibblereward = result.toFixed(3);
  displayPrice();
  
}

  
  
  popup.style.display = 'block'; // Show popup
}

// Function to close popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none'; // Hide popup
}


function triggerConfetti() {
  // Trigger confetti effect
  confetti({
    particleCount: 300, // Number of confetti particles
    spread: 200, // Spread of the confetti particles
    origin: { y: 0.6 } // Origin point (0.6 = bottom of the screen)
  });
}