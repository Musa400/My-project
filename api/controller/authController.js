import User from '../models/usermodel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export let signup = async (req, res, next) => {
    const { username, email, password } = req.body
    let hashedpassword = bcryptjs.hashSync(password, 10)
    let newUser = new User({ username, email, password: hashedpassword })
    try {

        await newUser.save();
        res.status(201).json('User created Successfuly')
    } catch (error) {
        next(error)

    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User Not Founded"))
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Invalid Password or Password is not match"));

        const token = jwt.sign()


    } catch (error) {

    }
}