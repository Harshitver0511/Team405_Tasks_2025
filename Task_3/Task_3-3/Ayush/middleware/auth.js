import jwt from 'jsonwebtoken'
import { User } from '../models/user-model.js'

const verifyJWT = async(req,res, next) => {

    try {
        const token = req.cookies?.accessToken
        console.log("Token received:", token)

        if(!token){
            throw new Error("Unauthorized request")
        }

        const decodedInfo = jwt.verify(token, process.env.ACCESS_SECRET)

        const user = await User.findById(decodedInfo?._id)
        req.user = user

        next()
    } catch (error) {
        console.log("middleware error", error)
    }
}

export default verifyJWT