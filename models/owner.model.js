import mongoose, {Schema} from 'mongoose'

const ownerSchema = new Schema( {
    name: {
        type: String,
        required: true,
        index: true
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone:{
        type:Number,
        required:true,
    }
}, {timestamps: true} )

export const Owner = mongoose.model( "Owner", ownerSchema )