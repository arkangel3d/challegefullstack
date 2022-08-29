const sequelize = require('../dataBase/dbConfig');
const { User, Transsaction } = sequelize.models;
const balanceCalculate = require('../utils/balanceCaluculate');

const setTranssaction = async (req, res)=>{
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
 
       user.balance = balanceCalculate(req.body.type,user.balance,req.body.amount,null,false)
        await user.save();

       let data= await user.createTranssaction(req.body);
     
        return res.status(201).json({message: 'Transaction created'});
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:'reload the page and try again',
            error : error
        
        });
    }; 
};

const getTranssaction = async (req, res)=>{
    const userId = req.params.id;
    try {
        const transactions = await User.findByPk(userId,{
            attributes: {
              exclude: ['password','name','lastName','email'] 
            },
            include: [
                {
                    model: Transsaction,
                    attributes: {
                      exclude: ['UserId'] 
                    }
                  }
           ]
        });

        if(!transactions){
            return res.status(404).json({message: 'Transactions not found'});
        };
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(401).json({
            message:'reload the page and try again',
            error : error
        
        });
    }
};

const updateTransaction = async (req, res) => {
    const {category, amount, description, idUser, type} = req.body;
    const id = req.params.id;
       
    try {
        const updateTransaction = await Transsaction.findByPk(id);
         if(!updateTransaction){
             return res.status(404).json({message: 'Transactions not found'});
         };
        const user = await User.findByPk(idUser,{
            attributes: {
              exclude: ['password','name','lastName','email'] 
            },
            include: [
                {
                    model: Transsaction,
                    attributes: {
                      exclude: ['UserId'] 
                    }
                  }
           ]
        });
        user.balance = balanceCalculate(type, user.balance,amount,updateTransaction.amount,false);
        await user.save();

         updateTransaction.amount = amount;
         updateTransaction.description = description;
         updateTransaction.category = category;
         await updateTransaction.save();
        
        return res.status(201).json({message:'transaction updated'});
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:'reload the page and try again',
            error : error
        
        });
    }
}
const deleteTransaction = async (req, res)=>{
    const id = req.params.id;
    const idUser = req.query.id;

    try{
        const user = await User.findByPk(idUser);
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        const deleteT = await Transsaction.findByPk(id);
        user.balance = balanceCalculate(deleteT.type, user.balance, deleteT.amount,null,true);
        await user.save();
        await deleteT.destroy()     
        return res.status(203).json({message:'transaction deleted'})
    }
    catch(error){
        console.log(error)
        return res.status(401).json({
            message:'reload the page and try again',
            error : error
        
        });
    }
};
module.exports = {
    setTranssaction,
    getTranssaction,
    updateTransaction,
    deleteTransaction
}
