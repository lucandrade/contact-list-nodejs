import HttStatus from 'http-status';

const success = (data, statusCode = HttStatus.OK) => ({
    data,
    statusCode,
});

const error = (message, statusCode = HttStatus.BAD_REQUEST) => success({
    error: message,
}, statusCode);

export default {
    success,
    error,
};
