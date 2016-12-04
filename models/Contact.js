import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    image: { type: String },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    lat: { type: Number },
    lon: { type: Number },
});

export default mongoose.model('Contact', ContactSchema);
