const cron = require("node-cron");

module.exports = () => {
    cron.schedule('47 1 * * *', () => {
        console.log('Running a job at 01:47 at Asia/Jakarta timezone');
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
    
    cron.schedule('48 1 * * *', () => {
        console.log('Running a job at 01:48 at Asia/Jakarta timezone');
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
}