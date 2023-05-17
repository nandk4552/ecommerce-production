import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//* Protected Routes token based
export const requireSignIn = (req, res, next) => {
    try {
        // decode token
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        // req = { ...req, user: decode }; // create a new object with the decoded user and extend it with req

        next();
    } catch (error) {
        console.log(error + "error in requireSignin");
    }
};

//* admin access
export const isAdmin = async (req, res, next) => {
    try {
        // find user by id
        const user = await userModel.findById(req.user._id);
        // if user role is not 1 (not admin) then return unauthorized access
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                error,
                message: "Unauthorized Access"
            })
        }
        else {
            // if admin access then go to next middleware
            next();
            
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });

    }
}