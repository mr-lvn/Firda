const { Kelly } = require("./lib/");

const client = new Kelly();
client.setup();

module.exports = client;