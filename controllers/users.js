import HttStatus from 'http-status';
import jwt from 'jwt-simple';
import config from '../config/app';

const defaultResponse = (data, statusCode = HttStatus.OK) => ({
    data,
    statusCode,
});

const errorResponse = (message, statusCode = HttStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode);

export default class UsersController {
    constructor(User) {
        this.model = User;
    }

    login(username, pass) {
        return this.model.findOne({
            email: username,
        }).then(user => {
            if (user && user.comparePassword(pass)) {
                const payload = {
                    id: user._id,
                    email: user.email,
                };
                return defaultResponse({
                    token: `JWT ${jwt.encode(payload, config.jwt.secret)}`,
                });
            }

            return errorResponse(HttStatus['401'], HttStatus.UNAUTHORIZED);
        });
    }

    getAll() {
        return this.model.find({})
            .then(res => defaultResponse(res))
            .catch(err => errorResponse(err.message));
    }

    getById(id) {
        return this.model.findById(id)
        .then(res => defaultResponse(res))
        .catch(err => errorResponse(err.message));
    }

    create(data) {
        return this.model.create(data)
            .then(res => defaultResponse(res, HttStatus.CREATED))
            .catch(err => errorResponse(err.message, HttStatus.UNPROCESSABLE_ENTITY));
    }

    update(id, data) {
        return this.model.findByIdAndUpdate(id, {
            $set: data,
        })
            .then(() => this.model.findById(id))
            .then(res => defaultResponse(res))
            .catch(err => errorResponse(err.message, HttStatus.UNPROCESSABLE_ENTITY));
    }

    delete(id) {
        return this.model.remove({
            _id: id,
        })
            .then(() => defaultResponse('', HttStatus.NO_CONTENT))
            .catch(err => errorResponse(err.message, HttStatus.UNPROCESSABLE_ENTITY));
    }
}
