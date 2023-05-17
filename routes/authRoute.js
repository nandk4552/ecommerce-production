import express from 'express'
import { forgotPasswordController, getAllOrdersController, getOrdersController, orderStatusController, registerController, testController, updateProfileController } from '../controller/authController.js';
import { loginController } from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//* ROUTER OBJECT
const router = express.Router();

//** ROUTING

//* REGISETER ROUTE || POST METHOD
router.post('/register', registerController);

//* LOGIN ROUTE || POST METHOD
router.post('/login', loginController);


//* Forgot Password || POST METHOD
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);



//* protected USER route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})


//* protected ADMIN route auth 
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//* update profile auth 
router.put('/profile',requireSignIn, updateProfileController)

//**orders */
router.get(`/orders`,requireSignIn, getOrdersController)

//**orders */
router.get(`/all-orders`,requireSignIn,isAdmin, getAllOrdersController)


//**order status update */
router.put(`/order-status/:orderId`,requireSignIn,isAdmin, orderStatusController)

export default router;
