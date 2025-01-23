import userSchema from '../model/userSchema.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs"

export const createData = async (req, res) => {
    const token = jwt.sign({
        data: 'Token Data'
    }, 'ourSecretKey', { expiresIn: '10m' }
    );

    try {
        const { email, userName, password } = req.body;
        if (await userSchema.findOne({ "$or": [{ email: email }] })) {
            res.json({
                status: 404,
                message: " email is already found"
            })
        }
        else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "bhaskar@itobuz.com",
                    pass: "jwkb cnej wzyf qvyj"
                }
            });
            const mailConfigurations = {
                from: 'bhaskar@itobuz.com',
                to: 'bhaskar@itobuz.com',
                subject: 'Email Verification',
                text: `Hi! There, You have recently visited 
                       our website and entered your email.
                       Please follow the given link to verify your email
                       http://localhost:3000/note/verify/${token} 
                       Thanks`
            };
            transporter.sendMail(mailConfigurations, function (error, info) {
                if (error) throw Error(error);
                console.log('Email Sent Successfully');
                console.log(info);
            });
            const addUser = await userSchema.create({
                email,
                userName,
                password,
                token,
            });
            if (addUser) {
                res.json({
                    status: 200,
                    message: "sucess"
                })
            }
        }

    }
    catch (error) {
        res.json({
            status: 404,
            message: " not sucess"
        })

    }
}

export const verifyData = async (req, res) => {
    try {
        const { token} = req.params;
        jwt.verify(token, 'ourSecretKey', async function (err, decoded) {
            if (err) {
                console.log(err);
                res.send("Email verification failed, possibly the link is invalid or expired");
            }
            else {
                res.send("Email verified successfully");
                const ans = await userSchema.findOne({token : token })
                if(ans){
                    ans.token="";
                    ans.verify = true;
                    ans.save();
                }
                else{
                    res.json({
                        status: 404,
                        message: "email not verified"
                    })
                }
            }
        });
    }
    catch (error) {
        res.json({
            status: 404,
            message: " not sucess"
        })

    }
}


export const checkLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const ans = await userSchema.findOne({ email: email })
        if (ans) {
            bcrypt.compare(password, ans.password, function (err, result) {
                if (err) throw err;
                console.log(result);

                if (result === true) {
                    res.json({
                        status: 200,
                        message: " valid user"
                    })
                } else {
                    res.json({
                        status: 404,
                        message: " wrong password"
                    })
                }
            });
        }
        else {
            res.json({
                status: 404,
                message: "wrong credintial"
            })
        }
    }
    catch (error) {
        res.json({
            status: 404,
            message: "not valid user"
        })

    }
}