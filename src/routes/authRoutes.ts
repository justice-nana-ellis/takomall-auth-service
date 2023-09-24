import express from 'express';
import { validateToken } from '../middlewares/tokenValidater'
import {signup, signin, resetPassword, forgetPassword, resetPasswordWithLink, logout} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup)
      .post('/signin', signin)
      .post('/reset-password', validateToken, resetPassword)
      .post('/forget-password', forgetPassword)
      .post('/logout', logout);
router.get('/reset-password', resetPasswordWithLink);

export default router;
