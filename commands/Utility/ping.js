const { CommandBuilder } = require("../../lib/");

module.exports = new CommandBuilder({
    description: "Bot response latency",
    
    execute(firda) {
        const start = Date.now();
        
        firda.reply("*Pinging...*").then(msg => msg.edit(`Pong! **${Date.now() - start}**ms`));
    }
})