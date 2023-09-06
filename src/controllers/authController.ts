import { Request, Response } from 'express';
import * as argon from 'argon2';

import {signToken} from "../helpers/signToken";
import {jwtDecoder} from "../helpers/jwtDecoder"
import { authService } from '../services/authService';
import {signupSchema, User, PasswordMatch} from "./auth.schema";
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
import {sendEmail} from "../helpers/sendEmail";
dotenv.config();

// @ts-ignore
const secret:string = process.env.SECRET_KEY;

export const signup = async (req: Request, res: Response) => {
    const { email, password, full_name } = req.body;
    try {
        const { error } = signupSchema.validate({ email, password, full_name });
        if (error) return res.status(400).json({ error: error.details[0].message.replace(/"/g, '') });
        const hash =  await argon.hash(password);
        const user = await authService.registerUser(email, hash, full_name);
        res.json(user);
    } catch (error) {
        throw error;
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // @ts-ignore
        const user: User|null|undefined = await authService.loginUser(email, password);
        if(!user) return res.status(500).json('Incorrect Credentials');
        // @ts-ignore
        const pwdMatch: PasswordMatch = await argon.verify(user.password, password)
        if(!pwdMatch) return res.json('Incorrect Credentials');
        // @ts-ignore
        const token: string = await signToken(user.id, user.email);
        res.json({
            msg: 'logged in Successfully 🌿',
            access_token: token,
        });
    } catch (error) {
        return res.status(401).json({ error: "Failed to login" });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newpassword } = req.body;
    try {
        const user: User = jwtDecoder(token, secret);
        await authService.resetPassword(user.id, newpassword);
        return res.status(200).json({ status: "Password Changed Successfully 🌿" });
    } catch (error) {
        return res.status(409).json({ error: "Failed to change password" });
    }
};

export const forgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const existingUser: User|null = await authService.forgetPassword(email);
        if (!existingUser) return res.status(200).json({ error: "User Does Not Exists" })
        const token: string = jwt.sign(
            {
                // @ts-ignore
                id: existingUser.id,
                // @ts-ignore
                email: existingUser.email },
            secret,
            { expiresIn: "30m"}
        );
        // @ts-ignore
        const link = `http://localhost:3001/auth/reset-password/?id=${existingUser.id}&token=${token}`;
        await sendEmail(link, email, "Reset Password");
        return res.status(200).json(`Link Sent to your Mail 🌿`);
    }catch(error) {
        return error
    }
}

export const resetPasswordWithLink = async(req: Request, res: Response) => {
    try {
        const {id, token} = req.query
        const { newPassword } = req.body;
        //@ts-ignore
        const decoded = await jwtDecoder(token, secret);
        const hash =  await argon.hash(newPassword);
        const existingUser = await authService.resetPasswordWithLink(decoded.email, hash);
        return res.status(200).json({ status: "Password Changed Successfully 🌿" });
    } catch (error: any) {
        return res.status(403).json('Invalid Token');
    }

}
