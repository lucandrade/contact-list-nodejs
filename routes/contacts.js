import ContactsController from '../controllers/contacts';

export default app => {
    const controller = new ContactsController(app);
    app.all(/contacts/, app.auth.authenticate(), (req, res, next) => {
        controller.setUser(req.user);
        next();
    });

    app.route('/contacts')
        .post((req, res) => {
            controller.create(req.body)
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        })
        .get((req, res) => {
            controller.getAll()
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        });

    app.route('/contacts/:id')
        .get((req, res) => {
            controller.getById(req.params.id)
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        })
        .put((req, res) => {
            controller.update(req.params.id, req.body)
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        })
        .delete((req, res) => {
            controller.delete(req.params.id)
                .then(result => res.sendStatus(result.statusCode));
        });
};
