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
        
        ci.reply({ embeds: [embed] });
    }
})