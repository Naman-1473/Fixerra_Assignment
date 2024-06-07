import mongoose, {Schema} from 'mongoose'

const addressSchema = new Schema( {
    city:{
        type:String,
        required:true,
    },
    area:{
        type:String,
    },
    pincode:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
}, {timestamps: true} )

export const Address = mongoose.model( "Address", addressSchema )