const router = require('express').Router();
const {  setTranssaction } = require('../controllers/transaction');

router.post('/:id',setTranssaction)


module.exports = router;