const router = require('express').Router();
const userRouter = require('./user');
const transactionRouter = require('./transaction');
router.get('/test',(req,res)=>{
    res.send('test');
})
router.use('/user',userRouter)
router.use('/transaction',transactionRouter)

module.exports = router;