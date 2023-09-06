import express from 'express';
import {signup, signin, resetPassword, forgetPassword, resetPasswordWithLink} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup)
      .post('/signin', signin)
      .post('/reset-password', resetPassword)
      .post('/forget-password', forgetPassword);
router.get('/reset-password', resetPasswordWithLink);

export default router;
