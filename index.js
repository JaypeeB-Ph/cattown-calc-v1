// ETH AND KIBBLE price display

let ethpricevar = 0;
const catprice = 0.000086;

const FETCH_INTERVAL = 30000; // 30 seconds
        const STORAGE_KEY = 'lastFetchTime';

        async function fetchCryptoPrices() {
            try {
                const lastFetchTime = localStorage.getItem(STORAGE_KEY);
                const now = Date.now();

                if (lastFetchTime && now - lastFetchTime < FETCH_INTERVAL) {
                    console.log('Skipping fetch to avoid too many requests');
                    return;
                }

                localStorage.setItem(STORAGE_KEY, now.toString());

                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,kibble&vs_currencies=usd');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Update Ethereum price
                const ethPrice = data.ethereum.usd;
                document.getElementById('ethprice').textContent = "ETH price: " + `$${ethPrice.toLocaleString('en-US')}`;
                ethpricevar = ethPrice;

                // Update Kibble price
                const kibblePrice = data.kibble.usd;
                document.getElementById('kibbleprice').textContent = "KIBBLE price: " + `$${kibblePrice}`;
            } catch (error) {
                document.querySelectorAll('.price').forEach(element => {
                    element.textContent = 'Error fetching price';
                });
                console.error('Error fetching cryptocurrency prices:', error);
            }
        }

        // Fetch prices immediately on page load
        fetchCryptoPrices();

        // start the interval to fetch prices periodically
        setInterval(fetchCryptoPrices, FETCH_INTERVAL);


// ETH YIELD CALCULATOR

// Function to calculate ROI
function calculateROI(capital) {
  
  const eth = ethpricevar;
  const roi = (capital / eth) / catprice;

  return roi.toFixed(0); 
}

// Function to display the popup with ROI results
function displayPopup() {
  const capitalInput = document.getElementById('capital');
  const capital = parseFloat(capitalInput.value);
  if (isNaN(capital) || capital <= 0) {
      alert('Please enter a valid capital amount.');
      return;
  }

  if (ethpricevar <= 0) {
    alert('Please wait for the coin prices to load.');
    return;
  }else{
    const catscount = calculateROI(capital);
    const popup = document.getElementById('popup');
    const cats = document.getElementById('cats');
    cats.textContent = (catscount * 1).toLocaleString('en-US');
    const fpersecond = catscount;
    document.getElementById('fps').textContent = ' ' + (fpersecond * 1).toLocaleString('en-US'); 
    document.getElementById('fpm').textContent = ' ' + (fpersecond * 60).toLocaleString('en-US'); 
    document.getElementById('fph').textContent = ' ' + ((fpersecond * 60)* 60).toLocaleString('en-US');
    document.getElementById('cph').textContent = ' ' + (((fpersecond * 60)* 60) / 8640000).toFixed(2);
    document.getElementById('cpd').textContent = ' ' + ((((fpersecond * 60)* 60) / 8640000) * 24).toFixed(1);

    const ethyield = ((((fpersecond * 60)* 60) / 8640000) * 24).toFixed(1);
    document.getElementById('epd').textContent = ' ' + (ethyield * catprice).toFixed(8);
    document.getElementById('roi').textContent = ' ~' + (((capital/ethpricevar) / (ethyield * catprice).toFixed(8) / 30)).toFixed(1);
    const oneYearGrowth = ((ethyield * catprice) * 365) * ethpricevar;
    document.getElementById('apy').textContent = ' ' + calculateAPY(capital,oneYearGrowth).toFixed(2);
    popup.style.display = 'block'; // Show popup
  }

}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none'; // Hide popup
}


const calcButton = document.querySelector('.ethroi-btn');
calcButton.addEventListener('click', displayPopup);



// HOW TO PLAY MODAL
window.onload = function() {
    const modal = document.getElementById('videoModal');
    const closeButton = document.getElementById('close');
  
    // Check if modal has been shown before
    const modalShown = localStorage.getItem('modalShown');
  
    if (!modalShown) {
      // If modal has not been shown, display it
      modal.style.display = 'block';
  
      // Close modal when close button is clicked
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        // Set flag in local storage to indicate that modal has been shown
        localStorage.setItem('modalShown', 'true');
      });
    }
  };


  // CALCULATE APY

  function calculateAPY(capital, finalResult) {
    // Calculate APY
    const APY = Math.pow(finalResult / capital, 1) - 1;

    // Convert APY to percentage
    const APYPercentage = APY * 100;

    return APYPercentage;
}
  