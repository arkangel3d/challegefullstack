const router = require('express').Router();
const {  createTranssaction } = require('../controllers/transaction');

router.post('/:id',createTranssaction)


module.exports = router;