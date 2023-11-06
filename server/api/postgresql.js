const postgresql = require('pg');
const os = require('os');

const { Pool } = postgresql;

module.exports = (callback = null) => {

    const pool = new Pool({
        user: process.env.PORT ? 'demo_admin' : 'liviatour',
        password: process.env.PORT ? '4NzLKFzIFa9w6bxKZTNG72nfdFOTsJrz' : 'YQtvKYFdhhfpaw27GBFqB6Z5YMfCGjnv',
        database: process.env.PORT ? 'demo_database_sqlw' : 'offers_yy98',
        port: 5432,
        host: process.env.PORT ? 'dpg-cl4a4pbiu76s73b73f20-a' : 'localhost',
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