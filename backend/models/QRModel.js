import mongoose from 'mongoose'

const Schema = mongoose.Schema

const QRSchema = new Schema({
    QRCode: {
        type: String,
        required: true,
    }
});

const QRCode = mongoose.model('QRCode', QRSchema)
export default QRCode