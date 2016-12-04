export default {
    port: process.env.PORT || '7000',
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '',
        name: process.env.DB_NAME || 'contact-list',
        user: process.env.DB_USER || '',
        pass: process.env.DB_PASS || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'sdfweq7r16078nct8y',
        session: { session: false },
    },
};
