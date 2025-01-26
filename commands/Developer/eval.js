const { CommandBuilder } = require("../../lib/");

const { EmbedBuilder } = require("discord.js");
const util = require("node:util");

module.exports = new CommandBuilder({
    description: "Code evaluation tool",
    
    async execute(ci) {
        if (!ci.args.length) return;
        
        const code = ci.args.join(" ");
        
        const embed = new EmbedBuilder().setColor(ci.config.color);

        try {

            embed.setTitle("Results")
            embed.setDescription(`\`\`\`js\n${clean(await eval(code))}\`\`\``);

            ci.reply({ content: null, embeds: [embed] });
        }
        catch(error) {
            embed.setColor("Red");
            embed.setTitle("Results")
            embed.setDescription(`\`\`\`js\n${clean(error)}\`\`\``);

            ci.reply({ content: null, embeds: [embed] });
        }
    }
})

function clean(code) {
    if  (typeof code === "string") {
        return code
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
    }
    else {
        return util.inspect(code, { depth: 0 });
    }
}