const postgresql = require('pg');
const os = require('os');

const { Pool } = postgresql;

module.exports = (callback = null) => {

    const pool = new Pool({
        user: 'postgres',
        password: 'password',
        database: 'offers',
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