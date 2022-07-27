const router = require('express').Router();
const {  getUser, createUser, updateUser, deleteUser } = require('../controllers/user');

router.get('/:id',getUser)
router.post('/create',createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)

module.exports = router;