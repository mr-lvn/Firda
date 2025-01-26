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
            const dropXp = listXp[Math.floor(Math.random() * listXp.length)];
            await ci.db.add(ci.user.id+"_Xp", dropXp);
            
            const currentXp = await ci.db.get(ci.user.id+"_Xp");
            const currentLevel = await ci.db.get(ci.user.id+"_Level");
            
            if (currentXp > (128 * currentLevel)) {
                embed.setThumbnail(ci.user.displayAvatarURL({ size: 256 }));
                embed.setTitle("LEVEL UP!");
                embed.setDescription(`Congratulations ${ci.user.toString()} you leveled up **${currentLevel+1}**`);
                ci.channel.send({ embeds: [embed] });
                await ci.db.set(ci.user.id+"_Xp", 128*currentLevel - currentXp);
                await ci.db.add(ci.user.id+"_Level", 1);
            }
        } catch(error) {
            console.info(error);
        }
    }
}

module.exports = CommandBuilder;