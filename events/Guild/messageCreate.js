const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");

const { CommandInterface } = require("../../lib/");
const { Guild, User } = require("../../functions/register");

module.exports = async (client, message) => {
    if (message.author.bot || !message.guild || message.system || message.webhookId) return;

    Guild(client, message.guild.id);
    User(client, message.author.id);

    const embed = new EmbedBuilder().setColor(client.config.color);
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel("Invite").setURL(client.config.link.invite).setStyle(ButtonStyle.Link),
        new ButtonBuilder().setLabel("Support Server").setURL(client.config.link.discord).setStyle(ButtonStyle.Link),
        new ButtonBuilder().setLabel("Website").setURL(client.config.link.website).setStyle(ButtonStyle.Link),
    );

    const botPermissions = ["ViewChannel", "SendMessages", "EmbedLinks"];
    const botMissingPermissions = [];

    for (const perm of botPermissions) {
        if (!message.channel.permissionsFor(message.guild.members.me).has(perm)) botMissingPermissions.push(perm);
    }

    if (botMissingPermissions.length > 0) {
        const content = `The bot doesn't have one of these permissions \`${botMissingPermissions.join(", ")}\`.\nPlease double check them in your server role & channel settings.`;

        const dmChannel = message.author.dmChannel == null ? await message.author.createDM() : message.author.dmChannel;

        return dmChannel.send({ content: content, components: [row] });
    }

    const prefix = client.config.prefix;
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mention)) {
        embed.setDescription(`Use \`${prefix}help\` command to get list of commands.`);

        message.reply({ embeds: [embed], components: [row] });
    }

    const rawContent = message.content.toLowerCase();
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.user.username.toLowerCase()}|${escapeRegex(prefix)})\\s*`);

    if (!prefixRegex.test(rawContent)) return;

    const [matchedPrefix] = rawContent.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (!cmd.length) return;

    let command = client.commands.get(cmd) ?? client.commands.find(command => command.aliases.includes(cmd));

    if (!command) return;

    const userData = await client.db.user.get(message.author.id);

    if (userData && userData?.suspended) {
        embed.setDescription(`You have been banned from using the bot.\n\`\`\`${userData?.suspendReason}\`\`\``);

        return message.reply({ embeds: [embed] });
    }

    const maintenance = client.mongo.get("maintenance");

    if (maintenance && client.config.developerId !== message.author.id) {
        embed.setDescription(`The bot is currently under maintenance... Please try again later.`);

        return message.reply({ embeds: [embed] });
    }

    command.executeSync(
        new CommandInterface({ client, message, prefix, args })
    );
    
    if (message.author.id != client.config.developerId) console.log(`[PREFIX] [${command.name}] | (${message.author.username})[${message.author.id}] | (${message.guild.name})[${message.guildId}]`);
}