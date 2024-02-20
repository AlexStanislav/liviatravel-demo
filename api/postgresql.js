const postgresql = require('pg');
const os = require('os');
require('dotenv').config();

const { Pool } = postgresql;

module.exports = (callback = null) => {

    const pool = new Pool({
        user: process.env.PORT ? process.env.PG_USER : 'liviatour',
        password: process.env.PORT ? process.env.PG_PASSWORD : 'YQtvKYFdhhfpaw27GBFqB6Z5YMfCGjnv',
        database: process.env.PORT ? process.env.PG_DATABASE : 'offers_yy98',
        port: 5432,
        host: process.env.PORT ? process.env.PG_HOST : 'localhost',
        //TODO remove in production
        // ssl: {
        //     rejectUnauthorized: false
        // }
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