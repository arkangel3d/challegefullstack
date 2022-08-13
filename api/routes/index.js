const router = require('express').Router();
const userRouter = require('./user');
const transactionRouter = require('./transaction');
const categoryRouter = require('./category');
router.get('/test',(req,res)=>{
    res.send('test');
})
router.use('/user',userRouter);
router.use('/transaction',transactionRouter);
router.use('/category',categoryRouter);

module.exports = router;