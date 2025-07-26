import { ApiError } from "../utils/ApiError.js";

const dummyAuth = async (req,res,next) => {
    const token = req.headers.token;
    if(token === "123abc"){
        next();
    }else {
        throw new ApiError(400, "User not verified")
    }
}

export {dummyAuth}