const sequelize = require('../dataBase/dbConfig');
const { Category, Transsaction  } = sequelize.models;

const getCategorys = async (req, res)=>{
    const id = req.params.id;
    try {

     const categorys = await Category.findAll();
     if(!categorys){
        return res.status(404).json({message: 'Category not found'});
     }
     return res.json(categorys);
    } catch (error) {
     return res.json({message: error});
    }
    
};

const createCategory= async (req, res)=>{
    try{
        const category = await Category.create(req.body);
        return res.status(201).json(category);
    }catch(error){
        return res.json({message: error});
    }
    
};

const updateCategory= async (req, res)=>{
    const id = req.params.id;
    try{
        const user = await Category.update(req.body,{where: {id}});
        if(!user){
            return res.status(404).json({message: 'Category not found'});
         }
        return res.status(201).json({message: 'Category updated'});
    }catch(error){
        return res.json({message: error});
    }
    
};

const deleteCategory= async (req, res)=>{
    const id = req.params.id;
    try{
        const user = await Category.destroy({where: {id}});
        if(!user){
            return res.status(404).json({message: 'Category not found'});
         }
        return res.status(203).json({message: 'Category deleted'});
    }catch(error){
        return res.json({message: error});
    }
    
};
module.exports ={
    getCategorys,
    createCategory,
    updateCategory,
    deleteCategory
}