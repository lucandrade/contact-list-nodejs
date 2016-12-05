import HttStatus from 'http-status';
import jwt from 'jwt-simple';
import config from '../config/app';
import response from '../config/response';

export default class UsersController {
    constructor(app) {
        this.model = app.datasource.models.User;
    }

    login(username, pass) {
        return this.model.findOne({
            email: username,
        })
        .then(user => {
            if (user && user.comparePassword(pass)) {
                const payload = {
                    id: user._id,
                    email: user.email,
                };
                return response.success({
                    token: `JWT ${jwt.encode(payload, config.jwt.secret)}`,
                });
            }

            return response.error(HttStatus['401'], HttStatus.UNAUTHORIZED);
        });
    }

    getAll() {
        return this.model.find({})
            .then(res => response.success(res))
            .catch(err => response.error(err.message));
    }

    getById(id) {
        return this.model.findById(id)
            .then(res => response.success(res))
            .catch(err => response.error(err.message));
    }

    create(data) {
        return this.model.create(data)
            .then(res => response.success(res, HttStatus.CREATED))
            .catch(err => response.error(err.message, HttStatus.UNPROCESSABLE_ENTITY));
    }

    update(id, data) {
        return this.model.findByIdAndUpdate(id, {
            $set: data,
        })
            .then(() => this.model.findById(id))
            .then(res => response.success(res))
            .catch(err => response.error(err.message, HttStatus.UNPROCESSABLE_ENTITY));
    }

    delete(id) {
        return this.model.remove({
            _id: id,
        })
            .then(() => response.success('', HttStatus.NO_CONTENT))
            .catch(err => response.error(err.message, HttStatus.UNPROCESSABLE_ENTITY));
    }
}
