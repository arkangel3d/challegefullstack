const { getCategorys, createCategory, updateCategory, deleteCategory } = require('../controllers/category');
const router = require('express').Router();

router.get('/',getCategorys);
router.post('/create',createCategory);
router.put('/:id',updateCategory);
router.delete('/:id',deleteCategory);

module.exports = router;