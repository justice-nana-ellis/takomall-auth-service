import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from "yup";
import {PrismaClientKnownRequestError, PrismaClientValidationError} from "@prisma/client/runtime/library";
import {User} from "../controllers/auth.schema";
import {resetPasswordWithLink} from "../controllers/authController";

const SECRET_KEY = process.env.SECRET_KEY;
const prisma = new PrismaClient()

export const authService = {
    registerUser: async (email: string, password: string, full_name: string) => {
        try {
            return await prisma.user.create({
                data: {
                    email: email,
                    password: password,
                    full_name: full_name,
                }
            });
        } catch (error: any) {
            return error instanceof PrismaClientValidationError
                    ? 'Prisma Validation Error: One or more required fields missing'
                    : error instanceof PrismaClientKnownRequestError
                        ? error.code === 'P2002'
                            ? 'Credentials Already Taken!'
                            : error.message.includes('required')
                                ? 'One or more required fields are missing.'
                                : 'Prisma Error: ' + error.message
                        : 'Unknown Error: ' + error.message;
        }
    },
    loginUser: async (email: string, password: string) => {
        try {
            return await prisma.user.findUnique({
                where: {email: email}
            });
        } catch (error) {
            return error;
        }
        // Validate credentials and return a JWT token
    },
    resetPassword: async (id: number, newPassword: string) => {
        try {
            const hashedpwd: string = await argon.hash(newPassword)
            return prisma.user.update({
                    where: {id},
                    data: {
                        password: hashedpwd,
                    }
                }
            );
        } catch (error: any) {
            return error;
        }
    },
    forgetPassword: async (email: string): Promise<User|null> => {
        try {
            return await prisma.user.findUnique({
                where: {email: email}
            });
        } catch (error: any) {
            return error;
        }
    },
    resetPasswordWithLink: async (email: string, newPassword: string)=> {
        try {
            return await prisma.user.update({
                where: {email: email},
                data: {
                    password: newPassword,
                }
            });
        } catch (error: any) {
            return error;
        }
    }
}
