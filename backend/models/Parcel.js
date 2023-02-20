import mongoose from 'mongoose'

const Schema = mongoose.Schema

const parcelSchema = new Schema({
    parcelId: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
});

const Parcel = mongoose.model('Parcel', parcelSchema)
export default Parcel