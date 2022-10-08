import joi from "joi";

const phoneNumberRegex = "^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$";

const formSchema = joi.object({
    applicantFullName: joi.string().required(),
    applicantEmail: joi.string().email().required(),
    applicantPhoneNumber: joi.string().pattern(new RegExp(phoneNumberRegex)).required(),
    applicantAge: joi.number().min(18).max(150).required(),
    aplicantAddress: joi.string().required()
});

export default formSchema;
