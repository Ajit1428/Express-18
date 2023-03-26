const { string } = require('joi')
const mongoose = require('mongoose')

const StateSchema = new mongoose.Schema({
    stateName: {
        type: string,
        enum: ['koshi', 'madhesh', 'bagmati', 'gandaki', 'lumbini', 'karnali', 'far-western']
    }
})

const DistrictSchema = new mongoose.Schema({
    districtName : string,
    StateSchema
})

const DistrictModel = mongoose.model("District", DistrictSchema)

const AddressSchema = new mongoose.Schema({ 
    StateSchema,
    districtName: {
        type: mongoose.Types.ObjectId,
        ref: "District"
    }
})

const UserSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: string,
        required: true,
        unique: true
    },
    password: {
        type : string,
        required: true
    },
    role: {
        type : string,
        enum : ['admin', 'customer', 'seller'],
        default: "customer"
    },
    status: {
        type: string,
        enum : ['active', 'inactive'],
        default: 'inactive'
    },
    address: {
        temp : AddressSchema,
        perm: AddressSchema
    },
    contact: string,
    image: string,
},
{
    autoIndex : true,
    autoCreate: true,
    timestamps: true
}
)

const UserModel = mongoose.model('User', UserSchema)

module.exports= UserModel