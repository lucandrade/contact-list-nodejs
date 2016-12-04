import UsersController from '../../../controllers/users';

describe('Controllers: Users', () => {
    describe('Get all users: getAll()', () => {
        it('should return a list of users', () => {
            const User = {
                find: td.function(),
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test',
                created_at: '2016-06-06T23:55:36.8444',
                updated_at: '2016-06-06T23:55:36.8444',
            }];

            td.when(User.find({})).thenResolve(expectedResponse);

            const controller = new UsersController(User);
            return controller.getAll()
                .then(response => {
                    expect(response.statusCode).to.be.equal(200);
                    expect(response.data).to.be.equal(expectedResponse);
                });
        });
    });
});
