const router = require('express').Router();
const { singIn, singUp } = require('../controllers/auth');

router.post('/login', singIn)
router.post('/register',singUp)
router.get('/logout',)

module.exports = router;