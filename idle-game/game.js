// Core game logic - NO DOM/UI code here

class Building {
    constructor({ name, baseCost, identifier, tags = [], basePowerCost = 1 }) {
        if (new.target === Building) {
            throw new Error("Cannot instantiate abstract class Building directly.");
        }
        this.name = name;
        this.baseCost = baseCost;
        this.identifier = identifier;
        this.tags = tags;
        this.basePowerCost = basePowerCost;
        this.count = 0;
    }

    // Power required for all levels of this building (power cost x number of building)
    getTotalPowerRequired() {
        return this.basePowerCost * (this.count);
    }

    // Unified production method: subclasses must implement getProductionAmount()
    getProduction() {
        const prod = this.getProductionAmount();
        return {
            money: (prod.money || 0) * this.count,
            power: (prod.power || 0) * this.count
        };
    }

    getCost() {
        return Math.floor(this.baseCost * Math.pow(1.15, this.count));
    }

    buy() {
        this.count++;
    }

    // Abstract method
    getProductionAmount() {
        throw new Error("getProductionAmount() must be implemented by subclasses");
    }
}

class CoinFactory extends Building {
    constructor(options = {}) {
        super({
            name: options.name || 'Coin Printer',
            baseCost: options.baseCost || 10,
            identifier: options.identifier || 'moneygen',
            tags: options.tags || ['money'],
            basePowerCost: options.basePowerCost || 2
        });
        this.moneyPerBuilding = options.moneyPerBuilding || 1;
    }
    getProductionAmount() {
        return { money: this.moneyPerBuilding, power: 0 };
    }
}


class PowerPlant extends Building {
    constructor(options = {}) {
        super({
            name: options.name || 'Power Plant',
            baseCost: options.baseCost || 50,
            identifier: options.identifier || 'powergen',
            tags: options.tags || ['power'],
            basePowerCost: 0
        });
        this.powerPerBuilding = options.powerPerBuilding || 2;
    }
    getProductionAmount() {
        return { money: 0, power: this.powerPerBuilding };
    }
}

class FusionReactor extends Building {
    constructor(options = {}) {
        super({
            name: options.name || 'Fusion Reactor',
            baseCost: options.baseCost || 200,
            identifier: options.identifier || 'hybridgen',
            tags: options.tags || ['money', 'power'],
            basePowerCost: options.basePowerCost || 3
        });
        this.moneyPerBuilding = options.moneyPerBuilding || 2;
        this.powerPerBuilding = options.powerPerBuilding || 1;
    }
    getProductionAmount() {
        return { money: this.moneyPerBuilding, power: this.powerPerBuilding };
    }
}






// Abstract base class for upgrades
class Upgrade {
    constructor({ name, cost, isUnlocked = () => true }) {
        if (new.target === Upgrade) {
            throw new Error("Cannot instantiate abstract class Upgrade directly.");
        }
        this.name = name;
        this.cost = cost;
        this.isUnlocked = isUnlocked;
        this.bought = false;
    }

    applyEffect(game) {
        throw new Error("applyEffect() must be implemented by subclass");
    }

    buy(game) {
        if (!this.bought) {
            this.applyEffect(game);
            this.bought = true;
        }
    }
}

// Upgrade that multiplies production of a building
class ProductionMultiplierUpgrade extends Upgrade {
    constructor({ name, cost, buildingIndex, multiplier, isUnlocked }) {
        super({ name, cost, isUnlocked });
        this.buildingIndex = buildingIndex;
        this.multiplier = multiplier;
    }

    applyEffect(game) {
        if (game.buildings[this.buildingIndex]) {
            game.buildings[this.buildingIndex].baseProduction *= this.multiplier;
        }
    }
}

// Upgrade that multiplies production for all buildings with a given tag
class TagProductionMultiplierUpgrade extends Upgrade {
    constructor({ name, cost, tag, multiplier, isUnlocked }) {
        super({ name, cost, isUnlocked });
        this.tag = tag;
        this.multiplier = multiplier;
    }

    applyEffect(game) {
        game.queryTags(this.tag).forEach(b => {
            b.baseProduction *= this.multiplier;
        });
    }
}

// Example: Upgrade that unlocks a new building (not used in demo, but for demonstration)
class BuildingUnlockUpgrade extends Upgrade {
    constructor({ name, cost, buildingConfig, isUnlocked }) {
        super({ name, cost, isUnlocked });
        this.buildingConfig = buildingConfig;
    }

    applyEffect(game) {
        game.addBuilding(new Building(this.buildingConfig));
    }
}

class Game {
    constructor() {
        this.money = 0;
        this.totalMoney = 0;
        this.buildings = [];
        this.upgrades = [];
        this.tickInterval = 1000; // ms
        this.setupGameLogic();
    }

    getTotalPowerProduced() {
        // Sum power produced by all buildings
        return this.buildings.reduce((sum, b) => sum + b.getProduction().power, 0);
    }

    getTotalPowerRequired() {
        // Sum power required by all buildings
        return this.buildings.reduce((sum, b) => sum + b.getTotalPowerRequired(), 0);
    }

    setupGameLogic() {
        // Building that produces only money
        const moneyGen = new CoinFactory();
        this.addBuilding(moneyGen);
        // Building that produces only power
        const powerGen = new PowerPlant();
        this.addBuilding(powerGen);
        // Give the player 1 power plant for testing
        powerGen.count = 1;
        // Building that produces both
        const hybridGen = new FusionReactor();
        this.addBuilding(hybridGen);

        // Example upgrades
        this.addUpgrade(new ProductionMultiplierUpgrade({
            name: 'Double Coin Printer Output',
            cost: 50,
            buildingIndex: 0,
            multiplier: 2,
            isUnlocked: (g) => g.buildings[0].count >= 5
        }));

        this.addUpgrade(new TagProductionMultiplierUpgrade({
            name: 'Double all Power Output',
            cost: 300,
            tag: 'power',
            multiplier: 2,
            isUnlocked: (g) => g.queryTags('power').some(b => b.count >= 3)
        }));
    }

    addBuilding(building) {
        this.buildings.push(building);
    }

    queryBuilding(identifier) {
        return this.buildings.find(b => b.identifier === identifier);
    }

    queryTags(tag) {
        return this.buildings.filter(b => b.tags.includes(tag));
    }

    addUpgrade(upgrade) {
        this.upgrades.push(upgrade);
    }

    canAfford(cost) {
        return this.money >= cost;
    }

    buyBuilding(index) {
        const building = this.buildings[index];
        const cost = building.getCost();
        // Simulate buying this building
        // If this building produces power, allow always
        if (building.getProductionAmount().power > 0) {
            if (this.canAfford(cost)) {
                this.money -= cost;
                building.buy();
            }
            return;
        }
        // For non-power buildings, check power cap
        let tempPowerRequired = this.getTotalPowerRequired() + building.basePowerCost;
        let totalPowerProduced = this.getTotalPowerProduced();
        if (this.canAfford(cost) && tempPowerRequired <= totalPowerProduced) {
            this.money -= cost;
            building.buy();
        }
    }

    buyUpgrade(index) {
        const upgrade = this.upgrades[index];
        if (!upgrade.bought && this.canAfford(upgrade.cost) && upgrade.isUnlocked(this)) {
            this.resources -= upgrade.cost;
            upgrade.buy(this);
        }
    }

    getProductionPerSecond() {
        // Returns {money, power}
        return this.buildings.reduce((totals, b) => {
            const prod = b.getProduction();
            return {
                money: totals.money + (prod.money || 0),
                power: totals.power + (prod.power || 0)
            };
        }, {money: 0, power: 0});
    }

    tick() {
        const produced = this.getProductionPerSecond();
        this.money += produced.money;
        this.totalMoney += produced.money;
        // Power is now a cap, not a resource, so do not accumulate it
    }

    manualCollect(amount = 1) {
        // Only money can be collected manually in this example
        this.money += amount;
        this.totalMoney += amount;
    }

    toJSON() {
        return {
            money: this.money,
            totalMoney: this.totalMoney,
            buildings: this.buildings.map(b => ({ count: b.count })),
            upgrades: this.upgrades.map(u => ({ bought: u.bought }))
        };
    }

    loadFromJSON(json) {
        this.money = json.money;
        this.totalMoney = json.totalMoney;
        json.buildings.forEach((b, i) => {
            if (this.buildings[i]) this.buildings[i].count = b.count;
        });
        json.upgrades.forEach((u, i) => {
            if (this.upgrades[i]) this.upgrades[i].bought = u.bought;
        });
    }
}

// Export for use in script.js
window.Game = Game;
window.Building = Building;
window.Upgrade = Upgrade;
