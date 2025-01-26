class CommandInterface {
    constructor(options) {
        this.client = options.client;
        this.interaction = options.interaction ?? null;
        this.message = options.message ?? null;
        this.ctx = this.interaction ? this.interaction : this?.message;
        this.channel = this.channelData;
        this.guild = this.guildData;
        this.member = this.memberData;
        this.user = this.userData;
        
        this.createdTimestamp = this.createdTimestampData;
        
        this.config = this.client.config;
        this.db = this.client.db;
        this.mongo = this.client.mongo;
        
        this.args = options.args;
        this.prefix = options.prefix;
    }
    
    get channelData() {
        return this.interaction ? this.interaction.channel : this.message?.channel;
    }
    get guildData() {
        return this.interaction ? this.interaction.guild : this.message?.guild;
    }
    get memberData() {
        return this.interaction ? this.interaction.member : this.message?.member;
    }
    get userData() {
        return this.interaction ? this.interaction.user : this.message?.author;
    }
    get createdTimestampData() {
        return this.interaction ? this.interaction.createdTimestamp : this.message?.createdTimestamp;
    }
    
    async reply(data) {
        this.msg = this.interaction ? this.interaction.reply(data) : this.message.reply(data);
        return this.msg;
    }
}

module.exports = CommandInterface;