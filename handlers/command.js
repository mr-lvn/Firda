const { readdirSync } = require("node:fs");

module.exports = (client) => {
    const folders = readdirSync("./commands");
    
    folders.forEach(folder => {
        const files = readdirSync(`./commands/${folder}`);
        
        for (const file of files) {
            const command = require(`../commands/${folder}/${file}`);
            
            command.name = file.split(".")[0];
            command.category = folder;
            
            client.commands.set(command.name, command);
        }
    });
    
    console.log("✅ | Commands loaded");
}