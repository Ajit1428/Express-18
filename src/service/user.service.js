const Joi = require('joi')

class UserService {
    validateUser = async (data) => {
        try 
        {
            let userValidationSchema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email({ minDomainSegments: 2 }),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
                role: Joi.string().required(),
                status: Joi.string().required(),
                address: Joi.string().empty(),
                contact: Joi.string().required()
            })

            let response = await userValidationSchema.validateAsync(data)
            if (response.details?.[0].message){
                throw response.details?.[0].message
            }
            else
            {
                return response
            }
        
        } 
        catch (err) 
        {
            if (err.details?.[0].message){

                throw err.details?.[0].message
            }
            else{
                throw err
            }
        }
    }
}

const userSer = new UserService();
module.exports = userSer;