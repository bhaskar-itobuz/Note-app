import userSchema from '../model/userSchema.js';
import jwt from 'jsonwebtoken';

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