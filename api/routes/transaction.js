const router = require('express').Router();
const {  setTranssaction, getTranssaction, updateTransaction, deleteTransaction } = require('../controllers/transaction');
const authUser  = require('../utils/midlewareAuth');

router.post('/:id',authUser, setTranssaction)
router.get('/:id',authUser, getTranssaction)
router.put('/:id',authUser, updateTransaction)
router.delete('/:id',authUser, deleteTransaction)
module.exports = router;