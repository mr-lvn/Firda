const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

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
    async executeSync(ci) {
        try {
            // Execute Commands
            this.execute(ci);
            
            // Leveling System
            
            const embed = new EmbedBuilder().setColor(ci.client.config.color);
            const listXp = [10, 15, 20, 25, 30];
            const dropXp = list[Math.floor(Math.random() * listExp.length)];
            await ci.client.db.add(ci.user.id+"_Xp", dropXp);
            
            const currentXp = await ci.client.db.get(ci.user.id+"_Xp");
            const currentLevel = await ci.client.db.get(ci.user.id+"_Level");
            
            if (currentXp > (128 * currentLevel * 3)) {
                embed.setThumbnail(ci.user.displayAvatarURL({ size: 256 }));
                embed.setTitle("LEVEL UP!");
                embed.setDescription(`Congratulations ${ci.user.toString()} you leveled up **${currentLevel+1}**`);
                ci.channel.send({ embeds: [embed] });
                await ci.client.db.add(ci.user.id+"_Level", 1);
            }
        } catch(error) {
            console.info(error);
        }
    }
}

module.exports = CommandBuilder;