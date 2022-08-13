const router = require('express').Router();
const {  getUser, createUser, updateUser, deleteUser } = require('../controllers/user');
const authUser = require('../utils/midlewareAuth');

router.get('/:id',authUser,getUser)
//router.post('/create',createUser)
router.put('/:id',authUser,updateUser)
router.delete('/:id',authUser,deleteUser)

module.exports = router;