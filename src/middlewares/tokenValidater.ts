import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

import jwt from 'jsonwebtoken';
dotenv.config();

// @ts-ignore
const secret:string = process.env.SECRET_KEY;

// Middleware function to validate JWT tokens
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send("Unauthorised: Sign in to continue")

    //@ts-ignore
    jwt.verify(token, secret, async(err: Error, decoded: any) => {
        if (err) return res.status(401).send("Unauthorized");
        if (decoded.iss !== 'Takomall Services') return res.status(401).send("Unauthorized");
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) return res.status(401).send("Token has expired");
        //@ts-ignore
        req.token = decoded;
        next();
    });
}


