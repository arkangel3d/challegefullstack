

const income = (balance, income)=>{
    return Number.parseFloat(balance) + Number.parseFloat(income)
};

const expense = (balance, expense)=>{
    return Number.parseFloat(balance) - Number.parseFloat(expense);
}

module.exports = {
    income,
    expense
}