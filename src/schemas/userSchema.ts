import joi from "joi";

const phoneNumberRegex = "^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$";

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().pattern(new RegExp(phoneNumberRegex)).required(),
    password: joi.string().min(4).max(30).required() 
});

export default userSchema;