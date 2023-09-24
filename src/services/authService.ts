import { Request, Response, response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from "yup";
import {PrismaClientKnownRequestError, PrismaClientValidationError, PrismaClientInitializationError} from "@prisma/client/runtime/library";
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
            if (error instanceof PrismaClientInitializationError) {
                throw 'Database Connection Error: Please Try Again';
            } else if (error instanceof PrismaClientValidationError) {
                throw 'Prisma Validation Error: One or more required fields missing';
            } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw 'Credentials Already Taken!';
            } else {
                throw 'Sign up Failed, Contact Support';
            }
        }
    },
    loginUser: async (email: string, password: string) => {
        try {
            return await prisma.user.findUnique({
                where: {email: email}
            });
        } catch (error: any) {
            throw 'Login Failed, Contact Support';
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
