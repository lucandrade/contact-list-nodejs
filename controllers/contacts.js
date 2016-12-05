import HttStatus from 'http-status';
import response from '../config/response';

export default class UsersController {
    constructor(app) {
        this.model = app.datasource.models.Contact;
        this.user = null;
    }

    setUser(user) {
        this.user = user;
    }

    getAll() {
        return this.model.find({
            user: this.user.id,
        })
            .then(res => response.success(res))
            .catch(err => response.error(err.message));
    }

    getById(id) {
        return this.model.findById(id)
            .then(res => response.success(res))
            .catch(err => response.error(err.message));
    }

    create(data) {
        const insertData = data;
        insertData.user = this.user.id;
        return this.model.create(insertData)
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
