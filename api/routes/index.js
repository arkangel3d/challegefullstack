const router = require('express').Router();
const userRouter = require('./user');
router.get('/test',(req,res)=>{
    res.send('test');
})
router.use('/user',userRouter)

module.exports = router;