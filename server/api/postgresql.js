const postgresql = require('pg');
const os = require('os');

const { Pool } = postgresql;

module.exports = (callback = null) => {

    const pool = new Pool({
        user: 'liviatour',
        password: 'YQtvKYFdhhfpaw27GBFqB6Z5YMfCGjnv',
        database: 'offers_yy98',
        port: 5432,
        host: '127.0.0.1',
    });

    const connection = {
        pool,
        query: (...args) => {
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    client.release();
                    return res.rows;
                })
            })
        }
    }

    process.postgresql = connection;

    if(callback) {
        callback(connection);
    }

    return connection;
}