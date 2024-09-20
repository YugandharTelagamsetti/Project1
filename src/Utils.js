import React from 'react'; 

const getTotalDateFormatted = (date) => {   
    let dateStr = null;  

     if (date !== 0) {     
        const options = { day: 'numeric', month: 'short', year: 'numeric' };     
        dateStr = new Date(date).toLocaleDateString(undefined, options);   
    } else {     
        dateStr = '-';   
    }   
        return dateStr; 
    }; 

    const getAmount = (amount) => {
        // Check if amount is a valid number
        console.log('Amount:', amount);

        if (typeof amount !== 'number' || isNaN(amount)) {
          return 'Invalid Amount';
        }
      
        // Format the number
        const indianFormat = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        });
      
        return indianFormat.format(amount);
      };

export { getTotalDateFormatted, getAmount };