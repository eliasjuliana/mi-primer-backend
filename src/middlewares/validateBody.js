import { post_userSchema } from "../helpers/validationSchemas/userSchemas.js";

export const validateBody = (request, response, next, schema) =>{

    const {body} = request;

    const {error} = schema.validate(body);

    if(error){
        response.status(400).json({
            data:null,
            message: error.details[0].message,
        });
        return
    }

    next();
};