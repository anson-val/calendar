const argon2 = require('argon2')
const mariadb = require('mariadb')
const pool = mariadb.createPool({
    host: 'XXX',
    port: 'XXX',
    user: 'XXX',
    password:'XXX',
    database: 'calendar',
    connectionLimit: 5
})

function validateEmail(email){
    const re = /^\S+@\S+\.\S/;
    return re.test(email);
}

function validatePassword(password){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[a-zA-z\d@$!%*#?&.]{8,32}$/;
    return re.test(password);
}

module.exports = async function (email, password) {
    let conn;
    const hash = await argon2.hash(password);

    try {
        conn = await pool.getConnection()
        const res = await conn.query("INSERT INTO credential (email_address, hash) VALUE (?,?)", [email, hash])

        if (validateEmail(email) && validatePassword(password)) {
            console.log(res);
            return 0
        } else return 1
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.end()
        }
    }
}