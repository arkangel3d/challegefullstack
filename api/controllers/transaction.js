const sequelize = require('../dataBase/dbConfig');
const { User, Transsaction  } = sequelize.models;

const createTranssaction = async (req, res)=>{
    const userId = req.params.id;
    try {
      console.log(userId);
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        if(req.body.type === 'ingreso'){
            user.amountTotal = parseFloat(user.amountTotal) + parseFloat(req.body.amount);
        }
        if(req.body.type === 'egreso'){
            user.amountTotal = parseFloat(user.amountTotal) - parseFloat(req.body.amount);
        }
        await user.save();
        await user.createTranssaction(req.body);
        
        return res.status(201).json({message: 'Transaction created'});
    } catch (error) {
        return res.json({message: error});
    }; 
};

module.exports = {
    createTranssaction,
}