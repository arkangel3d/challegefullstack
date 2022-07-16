import { Router } from 'express';
import auth from './auth';
import user from './user';

const router = Router();

router.get('/test', (req, res) => {
    res.send('Hello World!');
});

router.use('/user', user );

router.use('/auth', auth );

export default router;