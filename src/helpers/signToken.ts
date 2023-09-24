
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export const signToken = async (id: number, email: string, full_name: string): Promise<string> => {
    const payload = {
        iss: 'Takomall Services',
        sub: id,    // the sub is a jwt convention - required to take a UNIQUE IDENTIFIER
        id,
        email,
        full_name
    }
    // @ts-ignore
    const secret: string = process.env.SECRET_KEY;

    // @ts-ignore
    return jwt.sign(
        payload,
        secret,
        {expiresIn: '20m'});
};
