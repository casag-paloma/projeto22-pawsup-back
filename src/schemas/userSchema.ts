import joi from "joi";

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required() 
})

export default userSchema;