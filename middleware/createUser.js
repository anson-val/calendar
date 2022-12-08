const argon2 = require('argon2'),
    mariadb = require('mariadb'),
    pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    user: process.env.MARIADB_USERNAME,
    password:process.env.MARIADB_PWD,
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

module.exports = async function createUser (req, res, next) {
    if (req.body.signInMode !== "on") {
        return next()
    }

    let conn;
    const hash = await argon2.hash(req.body.password);

    try {
        conn = await pool.getConnection()
        const createRecord = await conn.query("INSERT INTO credential (email_address, hash) VALUE (?,?)", [req.body.email, hash])

        if (!validateEmail(req.body.email) || !validatePassword(req.body.password)) {
            req.isLoggedIn = false ;
            res.redirect("/");
            return next();
        }

        console.log(createRecord);
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