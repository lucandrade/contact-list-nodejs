import cors from 'cors';
import Users from './users';
import Contacts from './contacts';

export default app => {
    if (process.env.NODE_ENV === 'development') {
        app.use(cors({
            origin: true,
            credentials: true,
        }));
    }

    Users(app);
    Contacts(app);
};
