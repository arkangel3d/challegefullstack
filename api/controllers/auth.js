const sequelize = require('../dataBase/dbConfig');
const { User } = sequelize.models;
const { hash } = require('../utils/hash');
const { sign } = require('../utils/jwt');

const singIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {email},
            attributes : ['id', 'email', 'password', 'name', 'lastName', 'balance']});

        if(!user){
            return res.json({message: 'User not found'});
        }
        if(user){
            const hashPassword = await hash(password);
         
            if(hashPassword === user.password){
                const tokenJwt = await sign({id:user.id});
                
             const data = {
                token: tokenJwt,
                user: {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    balance: user.balance,
                },
                };
              
                return res.status(201).json(data);
            }
            return res.status(404).json({message: 'Password incorrect'});
        }

    } catch (err) {
        
    }
};

const singUp = async (req, res) => {
    //REGISTER
  
    const { email, password, name, lastName } = req.body;
    const hashPassword = await hash(password);
  
    try {
        const user = await User.findOne({where: {email}});
        
        if(!user){
        const createUser = await User.create({name,lastName,email, password: hashPassword});
        const tokenJwt = await sign({id:createUser.id});
        const dataUser ={
            token: tokenJwt,
            user: {
                id: createUser.id,
                name : createUser.name,
                lastName: createUser.lastName,
                email: createUser.email,
                balance: createUser.balance,
            }
           
        }
        return res.status(201).json(dataUser);
        }
        return res.json({message: 'User already exists'});
    } catch (err) {
        return res.json({message: err});
    }
};

module.exports = {
    singIn,
    singUp
};