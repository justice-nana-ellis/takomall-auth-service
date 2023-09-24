
const jwt = require('jsonwebtoken');
import * as dotenv from 'dotenv';
dotenv.config();
export const jwtDecoder = (token: string, secretKey: string) => {
    try {
       return jwt.verify(token, secretKey);
    } catch (error: any) {
        // Handle verification errors, such as token expiration or invalid signature
        throw new Error('Token verification failed: ' + error.message);
    }
}