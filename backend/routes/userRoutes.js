import express from 'express';
const router = express.Router();
import {userRegistration, userLogin,loggedUser} from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route

router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/register', userRegistration)
router.post('/login', userLogin)



// Protected Routes

router.get('/loggeduser', loggedUser)


export default router