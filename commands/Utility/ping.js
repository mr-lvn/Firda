const { CommandBuilder } = require("../../lib/");

module.exports = new CommandBuilder({
    description: "Bot response latency",
    
    async execute(firda) {
        const now = await Date.now();
        const msg = await firda.reply("*Pinging...*");
        
        msg.edit(`Pong! **${msg.createdTimestamp - now}**ms`);
    }
})