function calculate() {
  let E7 = parseFloat(document.getElementById('catsowned').value);
  let E22 = parseFloat(document.getElementById('tkibble').value);
  let E6 = parseFloat(document.getElementById('kibbleowned').value);
  let E21 = parseFloat(document.getElementById('tcats').value);
  const F47 = 10000; // Fixed value from Excel
  const F45 = 1000; // Fixed value from Excel

  // Perform the calculation
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
  // Display the result
  document.getElementById('reward').textContent = result.toFixed(0);
}

  
  
  popup.style.display = 'block'; // Show the popup
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none'; // Hide the popup
}
