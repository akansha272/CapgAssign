// Function to calculate EMI based on loan amount, interest rate, and loan duration (months)
function calculateEMI(loanAmount, annualInterestRate, loanDurationMonths) {
    let monthlyInterestRate = annualInterestRate / 12 / 100; // Convert annual rate to monthly rate
    let emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanDurationMonths)) / 
              (Math.pow(1 + monthlyInterestRate, loanDurationMonths) - 1);
    return emi;
}

// Function to handle EMI calculation based on the user's inputs and salary
function calculateLoanDetails() {
    // Get user inputs
    let salary = parseFloat(document.getElementById('salary').value);
    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let loanDuration = parseInt(document.getElementById('loanDuration').value);
    let interestRate = parseFloat(document.getElementById('interestRate').value);
    
    // Calculate EMI
    let emi = calculateEMI(loanAmount, interestRate, loanDuration);

    // Check if EMI exceeds 50% of salary
    let maxEMI = salary * 0.50;
    let resultMessage = '';

    // If EMI exceeds 50% of salary, we need to adjust the duration
    if (emi > maxEMI) {
        // Increase the loan duration until EMI is within the acceptable range
        let adjustedLoanDuration = loanDuration;
        let adjustedEMI = emi;

        // Increase the loan duration month by month until EMI fits within the 50% salary limit
        while (adjustedEMI > maxEMI) {
            adjustedLoanDuration++; // Increase loan duration by 1 month
            adjustedEMI = calculateEMI(loanAmount, interestRate, adjustedLoanDuration);
        }

        // Construct the result message with the adjusted loan duration and EMI
        resultMessage = `
            Your EMI of ₹${emi.toFixed(2)} exceeds 50% of your salary. 
            We suggest increasing your loan duration to ${adjustedLoanDuration} months.
            <br><strong>Suggested EMI:</strong> ₹${adjustedEMI.toFixed(2)} 
            <br><strong>Suggested Loan Duration:</strong> ${adjustedLoanDuration} months
        `;
    } else {
        // If EMI is within the 50% salary limit, show the original EMI and duration
        resultMessage = `
            Your EMI is ₹${emi.toFixed(2)}. This is within the acceptable limit of 50% of your salary.
            <br><br>
            <strong>Loan Duration:</strong> ${loanDuration} months
        `;
    }

    // Display the result on the page
    document.getElementById('emiResult').innerHTML = resultMessage;
}

// Attach the event listener to the form submission or button click
document.getElementById('calculateBtn').addEventListener('click', calculateLoanDetails);
