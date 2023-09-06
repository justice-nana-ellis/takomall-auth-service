
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export const signToken = async (id: number, email: string): Promise<string> => {
    const payload = {
        sub: id,    // the sub is a jwt convention - required to take a UNIQUE IDENTIFIER
        email
    }
    // @ts-ignore
    const secret: string = process.env.SECRET_KEY;

    // @ts-ignore
    return jwt.sign(
        {id: id, email: email},
        secret,
        {expiresIn: '15m'});
};