module.exports = async (ci) => {
    const query = !ci.args.length ? ci.args.join(" ") : ci.args.join(" ").toLowerCase();
    return ci.ctx.mentions.users.first() ?? await findUser(ci, query) ?? ci.user; 
}

async function findUser(ci, query) {
    const users = ci.client.users;
    const members = ci.guild.members;
    
    if (isNaN(query)) {
        const user = users.cache.find(u => u.username?.toLowerCase() == query || u.globalName?.toLowerCase() == query);
        const member = ci.guild.members.cache.find(m => m.nickname?.toLowerCase() == query);
        if (user) return user;
        else return member ? member.user : void 0;
    }
    else {
        return users.cache.get(query) ?? await users.fetch(query).catch(_=>{});
    }
}