import UsersController from '../controllers/users';

export default app => {
    const controller = new UsersController(app);
    app.route('/auth')
        .post((req, res) => {
            controller.login(req.body.username, req.body.password)
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        });
    app.route('/users')
        .post((req, res) => {
            controller.create(req.body)
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        })
        .all(app.auth.authenticate())
        .get((req, res) => {
            controller.getAll()
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        });

    app.route('/users/:id')
        .all(app.auth.authenticate())
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
