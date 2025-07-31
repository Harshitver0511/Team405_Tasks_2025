import {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"

const postUser = AsyncHandler(async(req,res) => {
    const {userName, email, password} = req.body

    if([userName, email, password].some((field) => field?.trim() == "")){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({email})

if(existedUser){
    throw new ApiError(409, "User already exists..")
}
 
const user = await User.create(
    {
        userName,
        email,
        password,
    }
)

const createdUser = await User.findById(user._id).select(
    "-password"
)

if(!createdUser){
    throw new ApiError(500, "Something went wrong while Posting the User")
}

return res.status(201).json(
    new ApiResponse(200, createdUser,"User Posted successfully")
)
})

const getUsers = AsyncHandler(async(req, res)=>{
    const users = await User.find();
    if(users.length === 0){
        throw new ApiError(500,"Currently no user is present")
    }
    return res.status(201).json(
        new ApiResponse(200, users, "Users successfully returned")
    )
})
export {postUser, getUsers}