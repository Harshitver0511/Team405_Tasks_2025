import { User } from "../models/user.models.js";
import bcrypt from 'bcryptjs'

const generateAccessAndRefershToken = async(userId) => {
    try {
        const user = await User.findById(userId)

        if(!user){
            throw new Error("User not found while generating token")
        }

        // console.log(user)
        // console.log("Generating token")
    
        const accessToken = user.generateAccessToken()
        // console.log("Generated")
        const refreshToken =  user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save()
    
        return {accessToken, refreshToken}
    } catch (error) {
        console.log("Error generating access and refresh token")
    }
}

const registerUser = async(req, res) => {
    try {
        // getting full name, email and password from req body
        const { fullName, email, password} = req.body

        // validation
        if(!fullName && !email && !password){
            throw new Error("All fields are required")
        }

        // checking if user already exists
        const isExistingUser = await User.findOne({email})

        if(isExistingUser){
            return res
                    .status(400)
                    .json({message : "User already present ! LOGIN"})
        }

        // bcrypt the password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        // creating new user
        const newUser = new User({
            fullName : fullName,
            email : email,
            password : hashedPassword
        })

        await newUser.save()

        return res
                .status(200)
                .json({
                    message : "User registered successfully!",
                    success : true,
                    newUser
                })
    } 
    catch (error) {
        return res
                .status(500)
                .json({error : "Error registering user !"})
    }
}

const loginUser = async(req, res) => {
    // email based authentication
    try {
        const {email, password} = req.body
    
        if(!email && !password){
            throw new Error("All fields are required")
        }
    
        // check if user is present
        const isUserPresent = await User.findOne({email})
    
        // if user is not present throw the error
        if(!isUserPresent){
            return res
                    .status(400)
                    .json({
                        message : "User not found! Register first",
                        success : false
                    })
        }
    
        // if user is found check the password
        const validatePassword = await bcrypt.compare(password, isUserPresent.password)
    
        if(!validatePassword){
            throw new Error("Password is invalid ! Please check your password and try again")
        }
    
        const user = await User.findOne({email}).select("-password")
    
        // if password is valid then generate the access token
        const { refreshToken, accessToken } = await generateAccessAndRefershToken(user._id)
    
        const options = {
            httpOnly : true,
            secure : true
        }
    
        return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    message : "User logged in successfully!",
                    user,
                    refreshToken, 
                    accessToken
                })
    } catch (error) {
        return res.status(500).json({
            message : "Error logging in!"
        })
    }

}

const getProfile = async(req, res) => {
    try {
        const user = req.user
    
        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }
    
        return res  
                .status(200)
                .json({
                    message : "User fetched successfully",
                    success : true,
                    user
                })
    } 
    catch (error) {
        return res
                .status(500)
                .json({
                    message : "Error fetching user details"
                })
    }
}

const logoutUser = async(req, res) => {
    try {
        const user = req.user

        if(!user){
            throw new Error("User not found")
        }

        const loggedOutUser = await User.findByIdAndUpdate(user?._id, {
            $set : {refreshToken : ""}
        },{new : true})

        const options = {
            httpOnly : true,
            secure : true
        }

        return res
                .status(200)
                .clearCookie("refreshToken", options)
                .clearCookie("accessToken", options)
                .json({
                    message : "Logged out successfully !",
                    success : true
                })

    } 
    catch (error) {
        return res.status(500).json({
            message : "Error logging out!"
        })
    }
}

export {registerUser,loginUser, logoutUser, getProfile}