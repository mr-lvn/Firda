const { CommandBuilder } = require("../../lib/");

const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("node:fs");

module.exports = new CommandBuilder({
    description: "Displays a list of commands",
    aliases: ["h", "commands"],
    
    execute(ci) {
        const embed = new EmbedBuilder().setColor(ci.config.color);
        
        const categories = readdirSync("./commands").filter(category => category !== "Developer");
        
        for (const category of categories) {
            embed.addFields({ name: category, value: ci.client.commands.filter(cmds => cmds.category === category).map(cmd => `\`${cmd.name}\``).join(", "), inline: true })
        }
        embed.setAuthor({ name: "Commands List", iconURL: message.guild.iconURL({ size: 256, forceStatic: true }) })
        .setDescription(`This is a list of commands. If you want specific help with a command use \`${ci.prefix}help [command name]\` or more help info join our [discord server](${ci.config.link.discord})`)
        .setThumbnail(ci.client.user.displayAvatarURL({ size: 512, forceStatic: true }));
        
        ci.reply({ embeds: [embed] });
    }
})