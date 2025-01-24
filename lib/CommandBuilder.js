class CommandBuilder {
    constructor(options) {
        this.name = options.name ?? null;
        this.category = options.category ?? null;
        this.description = options.description ?? "N/A";
        this.aliases = options.aliases ?? [];
        this.cooldown = options.cooldown ?? 3000;
        
        this.system = options.system ?? function(){};
    }
    async execute(firda) {
        try {
            this.system(firda);
        } catch(error) {
            console.info(error);
        }
    }
}

module.exports = CommandBuilder;