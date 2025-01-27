class GoldSystem {
    constructor(ci) {
        this.max = 5000;
        this.list = [];
        
        for (var num = 100; num < 201; num++) {
            this.list.push(num);
        }
        
        const drop = this.list[Math.floor(Math.random() * this.list.length)];
        
        (async() => {
            const maxDaily = await ci.db.get(ci.user+".maxDaily.gold");
            if (maxDaily < this.max) {
                await ci.db.add(ci.user.id+".gold", drop);
                await ci.db.add(ci.user.id+".maxDaily.gold", drop);
            }
            
            const currentGold = await ci.db.get(ci.user.id+".gold");
            
            if (maxDaily > this.max && maxDaily != this.max) {
                await ci.db.set(ci.user.id+".gold", currentGold - (maxDaily - this.max));
                await ci.db.set(ci.user.id+".maxDaily.gold", this.max);
            }
        })();
    }
}

module.exports = GoldSystem;