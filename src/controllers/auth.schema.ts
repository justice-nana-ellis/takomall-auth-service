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
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{6,}$'))
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, and one digit.',
            'any.required': 'Password is required.',
        }),
    full_name: Joi.string()
        .required()
        .messages({
            'any.required': 'Full name is required.',
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