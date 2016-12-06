import mongoose from 'mongoose';

describe('Routes Users', () => {
    const User = app.datasource.models.User;
    const userId = mongoose.Types.ObjectId();
    const defaultUser = {
        _id: userId,
        name: 'Defaut user',
        email: 'teste@teste.com',
        password: 'teste',
    };
    let token;
    beforeEach(done => {
        User
            .remove({})
            .then(() => User.create(defaultUser))
            .then(user => {
                token = jwt.encode({
                    id: user._id,
                    email: user.email,
                }, app.config.jwt.secret);
                done();
            });
    });
    describe('Route GET /auth', () => {
        it('should return a list of users', done => {
            const login = {
                username: defaultUser.email,
                password: defaultUser.password,
            };
            request
                .post('/auth')
                .send(login)
                .end((err, res) => {
                    const tokenContract = Joi.object().keys({
                        token: Joi.string(),
                        user: Joi.object().keys({
                            id: Joi.string(),
                            name: Joi.string(),
                            email: Joi.string(),
                        }),
                    });
                    JoiAssert(res.body, tokenContract);
                    done(err);
                });
        });
    });

    describe('Route GET /users', () => {
        it('should return a list of users', done => {
            request
                .get('/users')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    const userList = Joi.array().items(Joi.object().keys({
                        id: Joi.string(),
                        name: Joi.string(),
                        email: Joi.string(),
                    }));
                    JoiAssert(res.body, userList);
                    done(err);
                });
        });
    });

    describe('Route GET /users/{id}', () => {
        it('should return a user', done => {
            request
                .get(`/users/${userId}`)
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    const user = Joi.object().keys({
                        id: Joi.string(),
                        name: Joi.string(),
                        email: Joi.string(),
                    });
                    JoiAssert(res.body, user);
                    done(err);
                });
        });
    });

    describe('Route POST /users', () => {
        it('should create a user', done => {
            const newUser = {
                _id: mongoose.Types.ObjectId(),
                name: 'newUser',
                password: 'senha',
                email: 'email@email.com',
            };

            request
                .post('/users')
                .set('Authorization', `JWT ${token}`)
                .send(newUser)
                .end((err, res) => {
                    const user = Joi.object().keys({
                        id: Joi.string(),
                        name: Joi.string(),
                        email: Joi.string(),
                    });
                    JoiAssert(res.body, user);
                    done(err);
                });
        });
    });

    describe('Route PUT /users/{id}', () => {
        it('should update a user', done => {
            defaultUser.name = 'Teste';
            request
                .put(`/users/${defaultUser._id}`)
                .set('Authorization', `JWT ${token}`)
                .send(defaultUser)
                .end((err, res) => {
                    const user = Joi.object().keys({
                        id: Joi.string(),
                        name: Joi.string(),
                        email: Joi.string(),
                    });
                    JoiAssert(res.body, user);
                    done(err);
                });
        });
    });
});
