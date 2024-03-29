const sequelize = require('../dataBase/dbConfig');
const { User, Transsaction  } = sequelize.models;

const getUser = async (req, res)=>{
    const id = req.params.id;
    try {

     const user = await User.findByPk(id,{include: [{model: Transsaction}]});
     if(!user){
        return res.status(404).json({message: 'User not found'});
     }
     return res.json(user);
    } catch (error) {
        return res.status(401).json({
            message:'reload the page and try again',
            error : error
        
        });
    }
    
};

const updateUser = async (req, res)=>{
    const id = req.params.id;
    try{
        const user = await User.update(req.body,{where: {id}});
        if(!user){
            return res.status(404).json({message: 'User not found'});
         }
        return res.status(201).json({message: 'User updated'});
    }catch(error){
        return res.status(401).json({
            message:'reload the page and try again',
            error : error
        
        });
    }
    
};
const deleteUser = async (req, res)=>{
    const id = req.params.id;
    try{
        const user = await User.destroy({where: {id}});
        if(!user){
            return res.status(404).json({message: 'User not found'});
         }
        return res.status(201).json({message: 'User deleted'});
    }catch(error){
        return res.status(401).json({
            message:'reload the page and try again',
            error : error
        
        });
    }
    
};

module.exports ={
    getUser,
    updateUser,
    deleteUser
};
