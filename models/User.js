import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String, required: [true, 'Preencha o campo nome'] },
    email: { type: String, required: [true, 'Preencha o campo email'] },
    password: { type: String, required: [true, 'Preencha o campo senha'] },
}, {
    versionKey: false,
});

UserSchema.set('toJSON', {
    transform: function userSchemaToJson(doc, ret) {
        const retJson = {
            id: ret._id,
            name: ret.name,
            email: ret.email,
        };
        return retJson;
    },
});

UserSchema.pre('save', function (next) {  // eslint-disable-line
    const user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, (err, salt) => {  // eslint-disable-line
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, (err, hash) => {  // eslint-disable-line
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
