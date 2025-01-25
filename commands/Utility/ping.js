const { CommandBuilder } = require("../../lib/");

module.exports = new CommandBuilder({
    description: "Bot response latency",
    
    execute(ci) {
        const start = Date.now();
        
        ci.reply("*Pinging...*").then(msg => msg.edit(`Pong! **${Date.now() - start}**ms`));
    }
})