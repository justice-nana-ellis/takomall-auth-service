import * as Joi from "joi";

export const signupSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Email is invalid. Please provide a valid email address.',
            'any.required': 'Email is required.',
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'any.required': 'Password is required.',
        }),
    full_name: Joi.string()
        .required()
        .messages({
            'any.required': 'Full name is required.',
        }),
});

export const signinSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Email is invalid. Please provide a valid email address.',
            'any.required': 'Email is required.',
        })
});

export const resetPasswordSchema = Joi.object({
    newpassword: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'New Password is required',
    }),
});

export interface User {
    id: number;
    email: string;
    full_name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define a type for pwdMatch
export type PasswordMatch = boolean;
