import mongoose, {Schema} from 'mongoose'

const houseSchema = new Schema( {
    house_type: {
        type: String,
        enum: [ "independent", "flat", "duplex", "studio" ],
        required: true,
        index: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    price: {
        type: Number,
        required: true,
    },
    negotiable: {
        type: String,
        enum: [ "yes", "no", "maybe" ],
        required: true
    },
    owner_details: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
    },
    status: {
        type: String,
        enum: [ "active", "inactive" ],
        required: true
    }
}, {timestamps: true} )

export const House = mongoose.model( "House", houseSchema )