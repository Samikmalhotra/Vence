import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {body, validationResult} from 'express-validator';
import { BadRequestError, RequestValidationError, validateRequest } from '@samikmalhotra/microservices-helper';
import { User } from '../models/user';
import { PasswordManager } from '../services/password-manager';

const router =  express.Router();

router.post('/api/users/signin', [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
], validateRequest,
async(req: Request, res: Response) => {
    const {name,email,password} = req.body;
    
    const existingUser = await User.findOne({email});

    if(!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await PasswordManager.comparePassword(existingUser.password, password);

    if(!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    }

    res.status(200).json(existingUser);

})


