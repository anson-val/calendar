const mariadb = require('mariadb'),
    pool = mariadb.createPool({
        host: process.env.MARIADB_HOST,
        port: process.env.MARIADB_PORT,
        user: process.env.MARIADB_USERNAME,
        password:process.env.MARIADB_PWD,
        database: 'calendar',
        connectionLimit: 5
    })

module.exports = async function fetchUserId (req, res, next) {
        let conn;

        try {
                conn = await pool.getConnection()
                req.id = await conn.query("SELECT (user_id) FROM (credential) WHERE (email_address = ?)", req.body.email)

                if (req.id[0]["user_id"] !== null) {
                        return next();
                }
        } catch (err) {
                throw err;
        } finally {
                if (conn) {
                        await conn.end()
                }
        }
}