import { Router } from 'express';

const router = Router();

//Registro
router.post('/register', (req, res) => {
    res.send('registro');
});

//inicio de session
router.post('/login', (req, res) => {
    res.send('login');
});

//logout
router.get("/logout",);

//recuperar contrasena
router.post('/recoverpassword',);
router.put('/recoverpassword/:token',);

export default router;