// Grab the elements
const investAmount = document.getElementById('investAmount');
const propertyType = document.getElementById('propertyType');
const calcBtn = document.getElementById('calcBtn');
const resultDisplay = document.getElementById('resultDisplay');

// Only run the calculator logic IF the calcBtn exists on this page
if (calcBtn) {
    function calculateReturn() {
        const amount = parseFloat(investAmount.value);
        const roi = parseFloat(propertyType.value);

        if (isNaN(amount) || amount <= 0) {
            resultDisplay.innerHTML = `Estimated Annual Profit: <strong>₹0</strong>`;
            return;
        }

        const profit = Math.round(amount * roi);
        const formattedProfit = profit.toLocaleString('en-IN');
        resultDisplay.innerHTML = `Estimated Annual Profit: <strong>₹${formattedProfit}</strong>`;
    }

    calcBtn.addEventListener('click', calculateReturn);       
    propertyType.addEventListener('change', calculateReturn); 
    investAmount.addEventListener('input', calculateReturn);  
}

// The progress bar function can stay outside, as multiple pages might use it
function simulateInvest(barId) {
    const bar = document.getElementById(barId);
    if (!bar) return; // safety check
    
    let currentWidth = parseInt(bar.style.width);
    if (currentWidth < 100) {
        currentWidth += 5; 
        bar.style.width = currentWidth + "%";
        bar.innerText = currentWidth + "%";
    } else {
        alert("Project is fully funded!");
    }
}
// --- Details Page Logic ---
const actualInvestAmount = document.getElementById('actualInvestAmount');
const confirmInvestBtn = document.getElementById('confirmInvestBtn');
const dynamicReturn = document.getElementById('dynamicReturn');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');
const detailProgress = document.getElementById('detailProgress');

// Only run this if we are on the details.html page
if (actualInvestAmount && confirmInvestBtn) {
    const minInvestment = 50000;
    const projectROI = 0.10; // 10%

    // 1. Real-time ROI display as user types
    actualInvestAmount.addEventListener('input', function() {
        const amount = parseFloat(actualInvestAmount.value);
        
        // Hide success message if they start typing again
        successMsg.style.display = 'none';

        if (isNaN(amount) || amount <= 0) {
            dynamicReturn.innerText = "₹0";
            errorMsg.style.display = 'none';
            return;
        }

        // Show error if below minimum, but still calculate so they see what it *would* be
        if (amount < minInvestment) {
            errorMsg.style.display = 'block';
        } else {
            errorMsg.style.display = 'none';
        }

        const profit = Math.round(amount * projectROI);
        dynamicReturn.innerText = "₹" + profit.toLocaleString('en-IN');
    });

    // 2. Validate and Confirm Investment on Button Click
    confirmInvestBtn.addEventListener('click', function() {
        const amount = parseFloat(actualInvestAmount.value);

        // Validation Check
        if (isNaN(amount) || amount < minInvestment) {
            errorMsg.style.display = 'block';
            
            // Add a little shake animation to the input for bad UI feedback (Optional but cool)
            actualInvestAmount.style.border = "2px solid red";
            setTimeout(() => actualInvestAmount.style.border = "1px solid #ccc", 2000);
            return;
        }

        // If valid: Show success message
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        actualInvestAmount.value = ''; // Clear the input
        dynamicReturn.innerText = "₹0"; // Reset preview

        // 3. Dynamically update the funding progress bar
        let currentWidth = parseInt(detailProgress.style.width);
        if (currentWidth < 100) {
            currentWidth += 2; // Simulate a 2% bump from their investment
            if (currentWidth > 100) currentWidth = 100; // Cap at 100%
            detailProgress.style.width = currentWidth + "%";
            detailProgress.innerText = currentWidth + "%";
        }
    });
}