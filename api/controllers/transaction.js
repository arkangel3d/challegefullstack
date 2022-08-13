const sequelize = require('../dataBase/dbConfig');
const { User } = sequelize.models;
const {income, expense} = require('../utils/balanceFunction');
const setTranssaction = async (req, res)=>{
    const userId = req.params.id;
    req.body.balance = Number.parseFloat(req.body.amount).toFixed(2);
    
    
    try {
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        if(req.body.type === 'income'){
            
            user.balance = income(user.balance,req.body.amount);
            
        }
        if(req.body.type === 'expense'){
           
            user.balance = expense(user.balance,req.body.amount);
        }
       
        await user.save();

        await user.createTranssaction(req.body);
    
        
        return res.status(201).json({message: 'Transaction created'});
    } catch (error) {
        return res.json({message: error});
    }; 
};

module.exports = {
    setTranssaction,
}