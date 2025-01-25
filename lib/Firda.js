const { Client, Collection, GatewayIntentBits } = require("discord.js");

const { readdirSync } = require("node:fs");

class Firda extends Client {
    constructor() {
        super({
            allowedMentions: {
                repliedUser: false
            },
            
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
        
        process.on("unhandledRejection", (error) => console.info(error));
        process.on("uncaughtException", (error) => console.info(error));
        
        this.on("error", console.error);
        this.on("warn", console.info);
        
        this.db = null;
        this.mongo = null;
        
        this.config = require("../root/config");
        
        this.chars = new Collection();
        this.commands = new Collection();
        
        (async() => await (require("../handlers/database.js"))(this))();
    }
    
    loadChars() {
        for (const chars of require("../root/characters")) {
            this.chars.set(chars.name, chars);
        }
    }
    
    loadHandlers() {
        const handlers = readdirSync("./handlers").filter(h => h !== "database.js");
        
        for (const handler of handlers) {
            require(`../handlers/${handler}`)(this);
        }
    }
    
    setup() {
        this.loadChars();
        this.loadHandlers();
        
        super.login(process.env.TOKEN);
    }
}

module.exports = Firda;