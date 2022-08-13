const router = require('express').Router();
const {  setTranssaction } = require('../controllers/transaction');
const authUser  = require('../utils/midlewareAuth');

router.post('/:id', authUser,setTranssaction)


module.exports = router;