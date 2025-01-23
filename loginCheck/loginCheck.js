import userSchema from '../model/userSchema.js';
import bcrypt from "bcryptjs"

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