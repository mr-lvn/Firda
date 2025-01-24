module.exports = (client) => {
    client.user.setActivity("Service Ready!");
    console.log(`🆙 | ${client.user.username} is ready`);
}