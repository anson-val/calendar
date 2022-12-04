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

module.exports = async function (email, password) {
    let conn;

    try {
        conn = await pool.getConnection()
        const matchEmail = await pool.query("SELECT COUNT(1) FROM (credential) WHERE (email_address = ?)", email),
            fetchHash = await pool.query("SELECT (hash) FROM (credential) WHERE (email_address = ?)", email)

        if (matchEmail[0]["COUNT(1)"] === 1n) {
            if (await argon2.verify(fetchHash[0]["hash"], password)){
                return 0
            } else return 1

        } else return 2
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.end()
        }
    }
}