import joi from "joi";

const catSchema = joi.object({
    name: joi.string().required(),
    imageUrl: joi.string().uri().required(),
    age: joi.string(),
    fivOrFelf: joi.string().valid('FIV', 'FELV', 'none', 'both'),
    isVacinat: joi.boolean(),
    isCastraded: joi.boolean(),
    description: joi.string().max(500)
});

export default catSchema;