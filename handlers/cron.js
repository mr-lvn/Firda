const cron = require("node-cron");

module.exports = (client) => {
    cron.schedule('59 59 3 * * *', () => {
        console.log('Running a job at 03:59:59 at Asia/Jakarta timezone');
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
}