const cron = require("node-cron");

module.exports = () => {
    cron.schedule('4 3 0 1 * * *', () => {
        console.log('Running a job at 01:43 at Asia/Jakarta timezone');
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
    
    cron.schedule('4 5 0 1 * * *', () => {
        console.log('Running a job at 01:45 at Asia/Jakarta timezone');
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
}