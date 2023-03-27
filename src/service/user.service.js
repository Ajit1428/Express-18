const Joi = require('joi')
const { ObjectId } = require('mongodb')
const UserModel =  require('../model/user.model') 


class UserService{
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
                contact: Joi.string().required(),
                image: Joi.string().empty()
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

    loginValidate = async (data) => {
        try 
        {
            let userValidationSchema = Joi.object({
                email: Joi.string().email({ minDomainSegments: 2 }).required(),
                password: Joi.string().required()
            
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

    registerUser = async (data) => {
        
        try 
        {
        let user = new UserModel(data)    
        return await user.save()
     
        }
        catch(err)
        {
            throw err
        }

    }

    getUserByEmail = async (email) => {
        try {
        let userDetails =  await UserModel.findOne({
            email: email
        })
        return userDetails
        } 
        catch(err) 
        {
            throw err
        }
            
    }

    getUserById = async (id) => {
        try 
        {
            let userDetails = await UserModel.findById(id)
            return userDetails
        } 
        catch (error) 
        {
            throw error
            
        }
    }
}

const userSer = new UserService();
module.exports = userSer;