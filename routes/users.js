import HttStatus from 'http-status';
import UsersController from '../controllers/users';

export default app => {
    const controller = new UsersController(app);
    app.post('/auth', (req, res) => {
        controller.login(req.body.username, req.body.password)
            .then(result => {
                res.status(result.statusCode)
                    .send(result.data);
            });
    });

    app.get('/me', app.auth.authenticate(), (req, res) => {
        if (req.user) {
            controller.setUser(req.user)
                .me()
                .then(result => {
                    res.status(result.statusCode)
                        .send(result.data);
                });
        } else {
            res.sendStatus(HttStatus.UNAUTHORIZED);
        }
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
