const { readdirSync } = require("node:fs");

module.exports = (client) => {
    const folders = readdirSync("./events");
    
    folders.forEach(folder => {
        const files = readdirSync(`./events/${folder}`);
        
        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);
            const eventName = file.split(".")[0];
            
            client.on(eventName, event.bind(null, client));
        }
    });
    
    console.log("✅ | Events loaded");
}