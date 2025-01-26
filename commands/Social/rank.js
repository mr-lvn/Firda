const { CommandBuilder } = require("../../lib/");

const { RankCardBuilder } = require("canvacord");

const { getUser } = require("../../functions/");

module.exports = new CommandBuilder({
    description: "",
    
    async execute(ci) {
        const user = await getUser(ci);
        const member = ci.guild.members.cache.get(user.id);
        
        const currentXp = ci.db.get(member.user.id+"_Xp");
        const currentLevel = ci.db.get(member.user.id+"_Level");
        
        const card = new RankCardBuilder()
            .setUsername(cutName(member.user.username))
            .setDisplayName(cutName(member.user.displayName || member.nickname || ""))
            .setAvatar(member.user.displayAvatarURL({ size: 1024, extension: "png" }))
            .setCurrentXP(currentXp)
            .setRequiredXP(currentXp*currentLevel*3)
            .setLevel(currentLevel)
            .setRank(1)
            .setStatus("online");
        
        const image = await card.build({ format: 'png' });
        
        ci.reply({ files: [{ attachment: image, name: member.user.username+"_Rank.png" }] });
    }
})

function cutName(name) {
    return name.length > 10 ? name.substr(0, 10)+"..." : name;
}