const mongoose = require('mongoose')

const StateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        enum: ['koshi', 'madhesh', 'bagmati', 'gandaki', 'lumbini', 'karnali', 'far-western']
    }
})

const DistrictSchema = new mongoose.Schema({
    districtName : String,
    StateSchema
})

const DistrictModel = mongoose.model("District", DistrictSchema)

const AddressSchema = { 
    stateName: {
        type: String,
        enum: ['koshi', 'madhesh', 'bagmati', 'gandaki', 'lumbini', 'karnali', 'far-western']
    },
    districtName: {
        type: mongoose.Types.ObjectId,
        ref: "District"
    },
    municipality: String,
    wardNo: Number

}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    role: {
        type : String,
        enum : ['admin', 'customer', 'seller'],
        default: "customer"
    },
    status: {
        type: String,
        enum : ['active', 'inactive'],
        default: 'inactive'
    },
    address: {
        temp : {...AddressSchema},
        perm: {...AddressSchema}
    },
    contact: String,
    image: String,
},
{
    autoIndex : true,
    autoCreate: true,
    timestamps: true
}
)

const UserModel = mongoose.model('User', UserSchema)

module.exports= UserModel