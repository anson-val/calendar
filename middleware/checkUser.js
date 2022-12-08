const argon2 = require('argon2')
const mariadb = require('mariadb')
const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    user: process.env.MARIADB_USERNAME,
    password:process.env.MARIADB_PWD,
    database: 'calendar',
    connectionLimit: 5
})

module.exports = async function checkUser (req, res, next) {
    if (req.body.signInMode === "on") {
        return next()
    }

    let conn;

    try {
        conn = await pool.getConnection()
        const matchEmail = await pool.query("SELECT COUNT(1) FROM (credential) WHERE (email_address = ?)", req.body.email),
            fetchHash = await pool.query("SELECT (hash) FROM (credential) WHERE (email_address = ?)", req.body.email)

        if (matchEmail[0]["COUNT(1)"] !== 1n) {
            req.isLoggedIn = false;
            res.send("Incorrect Email")
            return next()
        }

        if (await argon2.verify(fetchHash[0]["hash"], req.body.password) === false) {
            req.isLoggedIn = false;
            return next()
        }

        req.isLoggedIn = true;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.end()
        }
    }
    next()
}