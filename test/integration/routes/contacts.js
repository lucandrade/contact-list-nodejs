import mongoose from 'mongoose';

describe('Routes Contacts', () => {
    const User = app.datasource.models.User;
    const Contact = app.datasource.models.Contact;
    const userId = mongoose.Types.ObjectId();
    const contactId = mongoose.Types.ObjectId();
    const defaultUser = {
        _id: userId,
        name: 'Defaut user',
        email: 'teste@teste.com',
        password: 'teste',
    };
    const defaultContact = {
        _id: contactId,
        user: userId,
        name: 'Defaut contact',
        email: 'teste@teste.com',
        address: 'Rua teste',
        phone: '+551184564756',
    };
    let token;
    beforeEach(done => {
        User
            .remove({})
            .then(() => Contact.remove({}))
            .then(() => Contact.create(defaultContact))
            .then(() => User.create(defaultUser))
            .then(user => {
                token = jwt.encode({
                    id: user._id,
                    email: user.email,
                }, app.config.jwt.secret);
                done();
            });
    });

    describe('Route GET /contacts', () => {
        it('should return a list of contacts', done => {
            request
                .get('/contacts')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    expect(res.body[0].id).to.be.equal(defaultContact._id.toString());
                    expect(res.body[0].name).to.be.equal(defaultContact.name);
                    expect(res.body[0].email).to.be.equal(defaultContact.email);
                    expect(res.body[0].address).to.be.equal(defaultContact.address);
                    expect(res.body[0].phone).to.be.equal(defaultContact.phone);
                    done(err);
                });
        });
    });

    describe('Route GET /contacts/{id}', () => {
        it('should return a contact', done => {
            request
                .get(`/contacts/${contactId}`)
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    expect(res.body.id).to.be.equal(defaultContact._id.toString());
                    expect(res.body.user).to.be.equal(defaultContact.user.toString());
                    expect(res.body.name).to.be.equal(defaultContact.name);
                    expect(res.body.email).to.be.equal(defaultContact.email);
                    expect(res.body.address).to.be.equal(defaultContact.address);
                    expect(res.body.phone).to.be.equal(defaultContact.phone);
                    done(err);
                });
        });
    });

    describe('Route POST /contacts', () => {
        it('should create a contact', done => {
            const newContact = {
                _id: mongoose.Types.ObjectId(),
                name: 'Defaut contact',
                email: 'teste@teste.com',
                address: 'Rua teste',
                phone: '+551184564756',
            };

            request
                .post('/contacts')
                .set('Authorization', `JWT ${token}`)
                .send(newContact)
                .end((err, res) => {
                    expect(res.body.id).to.be.equal(newContact._id.toString());
                    expect(res.body.user).to.be.equal(userId.toString());
                    expect(res.body.name).to.be.equal(newContact.name);
                    expect(res.body.email).to.be.equal(newContact.email);
                    expect(res.body.address).to.be.equal(newContact.address);
                    expect(res.body.phone).to.be.equal(newContact.phone);
                    done(err);
                });
        });
    });

    describe('Route PUT /contacts/{id}', () => {
        it('should update a contact', done => {
            defaultContact.name = 'Teste';
            request
                .put(`/contacts/${defaultContact._id}`)
                .set('Authorization', `JWT ${token}`)
                .send(defaultContact)
                .end((err, res) => {
                    expect(res.body.id).to.be.equal(defaultContact._id.toString());
                    expect(res.body.name).to.be.equal(defaultContact.name);
                    done(err);
                });
        });
    });
});
