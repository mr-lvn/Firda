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
            
            const embed = new EmbedBuilder().setColor(ci.config.color);
            const listXp = [];
            
            for (var x=50; x < 101; x++) {
                listXp.push(x);
            }
            
            const dropXp = listXp[Math.floor(Math.random() * listXp.length)];
            const maxDailyXp = await ci.db.get(ci.user.id+".maxDaily.xp");
            
            if (maxDailyXp < 3000) {
                await ci.db.add(ci.user.id+".xp", dropXp);
                await ci.db.add(ci.user.id+".maxDaily.xp", dropXp);
            }
            
            const currentXp = await ci.db.get(ci.user.id+".xp");
            const currentLevel = await ci.db.get(ci.user.id+".level");
            
            if (maxDailyXp > 3000 && maxDailyXp != 3000) {
                client.db.set(ci.user.id+".maxDaily.xp", 3000);
                client.db.set(ci.user.id+".xp", currentXp - (maxDailyXp - 3000))
            }
            if (currentXp > (128 * currentLevel)) {
                embed.setThumbnail(ci.user.displayAvatarURL({ size: 256 }));
                embed.setTitle("LEVEL UP!");
                embed.setDescription(`Congratulations ${ci.user.toString()} you leveled up **${currentLevel+1}**`);
                ci.channel.send({ embeds: [embed] });
                await ci.db.set(ci.user.id+".xp", currentXp - 128*currentLevel);
                await ci.db.add(ci.user.id+".level", 1);
            }
        } catch(error) {
            console.info(error);
        }
    }
}

module.exports = CommandBuilder;