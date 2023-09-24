import { Request, Response } from 'express';
import * as argon from 'argon2';

import {signToken} from "../helpers/signToken";
import {jwtDecoder} from "../helpers/jwtDecoder"
import { authService } from '../services/authService';
import * as cookie from 'cookie';
import jwt from 'jsonwebtoken';
import {signupSchema, signinSchema, resetPasswordSchema, User, PasswordMatch} from "./auth.schema";

import {verifyEmailTemplate, forgetPasswordEmailTemplate} from "../helpers/emailtemplete"
import * as dotenv from 'dotenv';
import {sendEmail} from "../helpers/sendEmail";
dotenv.config();

// @ts-ignore
const secret:string = process.env.SECRET_KEY;

export const signup = async (req: Request, res: Response) => {
    const { email, password, full_name } = req.body;
    try {
        const { error } = signupSchema.validate({ email, password, full_name });
        if (error) return res.status(422).send(error.details[0].message.replace(/"/g, ''));
        const hash =  await argon.hash(password);
        const user = await authService.registerUser(email, hash, full_name);
        sendEmail(verifyEmailTemplate(''), email, "Verify Email");
        // return res.status(200).send("Link Sent to your Mail");
        // res.json(user);
         const usernopassword = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
        };
        
        const obj = {
            message: "E-Mail verification link sent to your Mail: Please verify your E-Mail to activate your account",
            user: usernopassword
        };

        res.status(200).send(obj);
    } catch (error: any) {
        //console.log(error)
        if (typeof error === 'string') { // Check if it's a custom error message
            if (error.includes("Credentials Already Taken")) {
                return res.status(409).send("Credentials Already Taken");
            } else if (error.includes("reach database server ")) {
                return res.status(500).send("Database Connection Error: Please Try Again");
            }
        } else if (error.message.includes("reach database server ")) {
            return res.status(500).send("Database Connection Error: Unable to reach the hosted database");
        } else {
            return res.status(500).send("An unknown error occurred: Please Try Agian");
        }
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { error } = signinSchema.validate({ email });
        if (error) return res.status(422).send(error.details[0].message.replace(/"/g, ''));
        // @ts-ignore
        const user: User|null|undefined = await authService.loginUser(email, password);
        if(!user) return res.status(401).send("Incorrect Credentials");
        // @ts-ignore
        const pwdMatch: PasswordMatch = await argon.verify(user.password, password)
        if(!pwdMatch) return res.status(401).send("Incorrect Credentials");
        // @ts-ignore
        const token: string = await signToken(user.id, user.email, user.full_name);
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 3600 * 60 * 60 * 60, 
            sameSite: 'strict', 
            secure: true, 
            path: '/', 
        });
        res.json({
            msg: 'logged in Successfully 🌿',
            access_token: token,
        });
    } catch (error) {
        return res.status(500).send("An unknown error occurred");
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { newpassword } = req.body;
    try {
        const { error } = resetPasswordSchema.validate({ newpassword });
        if (error) return res.status(422).send(error.details[0].message.replace(/"/g, ''));
        const token = req.cookies.authToken;
        const user: User = jwtDecoder(token, secret);
        console.log(user)
        await authService.resetPassword(user.id, newpassword);
        res.status(200).send("Password Changed Successfully");
    } catch (error) {
        return res.status(409).send("Failed to change password");
    }
};

export const forgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const existingUser: User | null = await authService.forgetPassword(email);
        if (!existingUser) return res.status(404).send("User Does Not Exists");
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
        const link: string = `${process.env.HOST_URL}/auth/reset-password/?id=${existingUser.id}&token=${token}`;
        sendEmail(forgetPasswordEmailTemplate(link), email, "Reset Password");
        return res.status(200).send("Link Sent to your Mail");
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
        return res.status(200).send("Password Changed Successfully");
    } catch (error: any) {
        return res.status(403).json('Invalid Token');
    }

}

export const logout = async(req: Request, res: Response) => {
    try {
        res.clearCookie('authToken');
        // --frontend login link to be redirected on logout
        return res.status(200).send("Logged-out Successfully");
    } catch (error: any) {
        return res.status(403).send("Failed to Log Out");
    }

}
