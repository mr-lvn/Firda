const { EmbedBuilder } = require("discord.js");

class LevelSystem {
    constructor(ci) {
        this.max = 3000;
        this.list = [];
        
        for (var num = 50; num < 101; num++) {
            this.list.push(num);
        }
        
        const drop = this.list[Math.floor(Math.random() * this.list.length)];
        
        (async() => {
            const maxDaily = await ci.db.get(ci.user.id+".maxDaily.xp");
            
            if (maxDaily < this.max) {
                await ci.db.add(ci.user.id+".xp", drop);
                await ci.db.add(ci.user.id+".maxDaily.xp", drop);
            }
            
            const currentXp = await ci.db.get(ci.user.id+".xp");
            const currentLevel = await ci.db.get(ci.user.id+".level");
            
            if (maxDaily > this.max && maxDailyXp != this.max) {
                client.db.set(ci.user.id+".xp", currentXp - (maxDaily - this.max))
                client.db.set(ci.user.id+".maxDaily.xp", this.max);
            }
            if (currentXp > (128 * currentLevel)) {
                const embed = new EmbedBuilder()
                    .setColor(ci.config.color)
                    .setThumbnail(ci.user.displayAvatarURL({ size: 256 }))
                    .setTitle("LEVEL UP!")
                    .setDescription(`Congratulations ${ci.user.toString()} you leveled up **${currentLevel+1}**`)
                    .addFields({
                        name: "Reward",
                        value: `🪙 ${(1000*currentLevel+1).toLocaleString().replaceAll(",", ".")}`
                    });
                ci.channel.send({ embeds: [embed] });
                await ci.db.set(ci.user.id+".xp", currentXp - 128*currentLevel);
                await ci.db.add(ci.user.id+".level", 1);
            }
        })();
    }
}

module.exports = LevelSystem;