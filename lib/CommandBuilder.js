const { SlashCommandBuilder } = require("discord.js");

class CommandBuilder extends SlashCommandBuilder {
    constructor(options) {
        super();
        
        this.name = options.name ?? null;
        this.category = options.category ?? null;
        this.description = options.description ?? "N/A";
        this.aliases = options.aliases ?? [];
        this.cooldown = options.cooldown ?? 3000;
        
        this.execute = options.execute ?? function(){};
    }
    async executeSync(firda) {
        try {
            this.execute(firda);
        } catch(error) {
            console.info(error);
        }
    }
}

module.exports = CommandBuilder;