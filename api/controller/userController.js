import User from "../models/usermodel.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'
export let test = (req, res) => {
    res.send('Hello test being called !!!')
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You Can Update your Own account'));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                },
            },
            { new: true }

        );
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)

    }

}