import cors from 'cors';
import Users from './users';
import Contacts from './contacts';

export default app => {
    app.use(cors({
        origin: true,
        credentials: true,
    }));

    Users(app);
    Contacts(app);
};
