const mariadb = require('mariadb'),
    pool = mariadb.createPool({
        host: process.env.MARIADB_HOST,
        port: process.env.MARIADB_PORT,
        user: process.env.MARIADB_USERNAME,
        password:process.env.MARIADB_PWD,
        database: 'calendar',
        connectionLimit: 5
    })

module.exports = async function saveEvent (req, res, next) {
    let conn;

    try {
        conn = await pool.getConnection()

        if (req.body.eventTitle === "" || req.body.eventStartDate === "") {
            res.send("Please at least fill in Title and starting date for your event.")
            return next()
        }

        console.log(req.body.eventTitle, req.body.eventStartDate, req.body.eventEndDate, req.body.eventStartTime, req.body.eventEndTime, req.body.eventLocation, req.body.remind_date)

        //const createRecord = pool.query("INSERT INTO calendar_events (user_id, title, start_date, end_date, location, remind_date) VALUE (?, ?, ?, ?, ?, ?), [req.session.id, req.event_title, startDate, endDate, req.location, req.remind_date]")

        //console.log(createRecord)
    } catch (err) {
        res.send(err)
    } finally {
        if (conn) {
            await conn.end()
        }
    }

    next()
}