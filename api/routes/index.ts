import { Router } from 'express';
import auth from './auth';
import user from './user';
import transaction from './transaction';

const router = Router();

router.get('/test', (req, res) => {
    res.send('Hello World!');
});

router.use('/user', user );

router.use('/auth', auth );

router.use('/transaccion', transaction );

export default router;