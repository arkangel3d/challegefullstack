const balanceCalculate = (type, balance, amount,previosAmount,deleted)=>{
    const balanceNum= Number(balance);
    const amountNum = Number(amount);
    const previosAmountNum = Number(previosAmount || 0)
    let result = 0;

    if(amountNum === previosAmountNum) return amountNum;

    if(type ==='income'){
        if(deleted){
            result = balanceNum - amountNum;
            return result.toFixed(2) 
        };
    
    const currentBalance = balanceNum - previosAmountNum;
     result = currentBalance + amountNum;
     return result.toFixed(2)
    }
    if(type ==='expense'){
        if(deleted){
            result = balanceNum + amountNum;
            return result.toFixed(2) 
        };
        const currentBalance = balanceNum + previosAmountNum;
        result = currentBalance - amountNum;
        return result.toFixed(2)

    }
};

module.exports = balanceCalculate;