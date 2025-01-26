const { CommandBuilder } = require("../../lib/");

const { Font, RankCardBuilder } = require("canvacord");

const { getUser } = require("../../functions/");

Font.fromFile(process.cwd()+"/root/font/GFF.ttf");

module.exports = new CommandBuilder({
    description: "",
    
    async execute(ci) {
        const user = await getUser(ci);
        const member = ci.guild.members.cache.get(user.id);
        
        const currentXp = await ci.db.get(member.user.id+"_Xp");
        const currentLevel = await ci.db.get(member.user.id+"_Level");
        
        const card = new RankCardBuilder()
            .setUsername(cutName(member.user.username))
            .setDisplayName(cutName(member.nickname || member.user.displayName || ""))
            .setAvatar(member.user.displayAvatarURL({ size: 1024, extension: "png" }))
            .setBackground("https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/ad657d3c009adbd73302a6603e6ae6d5.jpg")
            .setCurrentXP(currentXp)
            .setRequiredXP(128*currentLevel)
            .setLevel(currentLevel)
            .setRank(1);
        
        const image = await card.build({ format: 'png' });
        
        ci.reply({ files: [{ attachment: image, name: member.user.username+"_Rank.png" }] });
    }
})

function cutName(name) {
    return name.length > 10 ? name.substr(0, 10)+"..." : name;
}