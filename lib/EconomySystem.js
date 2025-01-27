class EconomySystem {
    constructor(ci) {
        this.max = 5000;
        this.list = [];
        
        for (var num = 100; num < 201; num++) {
            this.list.push(num);
        }
        
        const drop = this.list[Math.floor(Math.random() * this.list.length)];
        
        (async() => {
            const maxDaily = await ci.db.economy.get(ci.user+".dailyGold");
            if (maxDaily < this.max) {
                await ci.db.economy.add(ci.user.id+".gold", drop);
                await ci.db.economy.add(ci.user.id+".dailyGold", drop);
            }
            
            const currentGold = await ci.db.economy.get(ci.user.id+".gold");
            
            if (maxDaily > this.max && maxDaily != this.max) {
                await ci.db.economy.set(ci.user.id+".gold", currentGold - (maxDaily - this.max));
                await ci.db.economy.set(ci.user.id+".dailyGold", this.max);
            }
        })();
    }
}

module.exports = EconomySystem;