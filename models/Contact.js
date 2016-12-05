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
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    versionKey: false,
});

ContactSchema.set('toJSON', {
    transform: function userSchemaToJson(doc, ret) {
        const docJson = ret;
        docJson.id = docJson._id;
        delete docJson._id;
        return docJson;
    },
});

export default mongoose.model('Contact', ContactSchema);
