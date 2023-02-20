import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto'
import User from '../models/user.js';

let router = express.Router();

router.post('/forgot-password', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        else{
            console.log('User exists')
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000; //1 Hour

        console.log("Token: " + token);
        console.log("Expires: " + expires);
        console.log("User: " + user._id);

        // const checkUser = await user.findByIdAndUpdate(user._id, { resetPasswordToken: token, resetPasswordExpires: expires });

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;

        await user.save();

        console.log("User updated")

        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: "parcelrmsystem@hotmail.com",
                pass: "nothing5552471"
            }
        });

        const mailOptions = {
            from: 'parcelrmsystem@hotmail.com',
            to: req.body.email,
            subject: 'Link To Reset Password',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            console.log('sending mail')
            if (err) {
                console.error('there was an error: ', err);
            }
            
            return res.status(200).json({message: 'Recovery email sent'});
        });
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.get('reset-password/:token', async (req, res) => {
    try{
        const user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}});

        if(!user){
            return res.status(400).json({message: 'Password reset token is invalid or has expired'});
        }

        return res.status(200).json({message: 'Valid token'});
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.post('reset-password/:token', async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if (!user){
            return res.status(400).json({message: 'User does not exist'});
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        return res.status(200).json({message: 'Password reset successfully'});
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
});

export default router;