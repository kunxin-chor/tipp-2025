// Core game logic - NO DOM/UI code here

class Building {
    constructor({ name, baseCost, identifier, tags = [], basePowerCost = 1, description = '' }) {
        if (new.target === Building) {
            throw new Error("Cannot instantiate abstract class Building directly.");
        }
        this.name = name;
        this.baseCost = baseCost;
        this.identifier = identifier;
        this.tags = tags;
        this.basePowerCost = basePowerCost;
        this.count = 0;
        this.description = description || 'No description provided.';
    }

    // Power required for all levels of this building (power cost x number of building)
    getTotalPowerRequired() {
        return this.basePowerCost * (this.count);
    }

    // Unified production method: subclasses must implement getProductionAmount()
    getProduction(game) {
        const prod = this.getProductionAmount(game);
        // 'game' is available for advanced buildings, but unused by default
        return {
            money: (prod.money || 0) * this.count,
            power: (prod.power || 0) * this.count
        };
    }

    getCost(game) {
        // 'game' is available for advanced cost logic, but unused by default
        return Math.floor(this.baseCost * Math.pow(1.15, this.count));
    }

    buy() {
        this.count++;
    }

    // Returns a string formula for production
    getFormula(game) {
        return `Production: (per building) ${JSON.stringify(this.getProductionAmount(game))}`;
    }

    // Returns a string preview of current and next production
    getPreview(game) {
        const current = this.getProduction(game);
        // Simulate next level
        this.count++;
        const next = this.getProduction(game);
        this.count--;
        return `Current: $${current.money || 0}, Power: ${current.power || 0} | Next: $${next.money || 0}, Power: ${next.power || 0}`;
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
            basePowerCost: options.basePowerCost || 2,
            description: options.description || 'Prints money every tick. Each building produces a fixed amount of money.'
        });
        this.moneyPerBuilding = options.moneyPerBuilding || 1;
    }
    getFormula(game) {
        return `Production: ${this.moneyPerBuilding} money per building per tick.`;
    }
    getPreview(game) {
        const curr = this.getProduction(game).money;
        this.count++;
        const next = this.getProduction(game).money;
        this.count--;
        return `Current: $${curr}/tick | Next: $${next}/tick`;
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
            basePowerCost: 0,
            description: options.description || 'Generates power. Each building increases your total available power.'
        });
        this.powerPerBuilding = options.powerPerBuilding || 2;
    }
    getFormula(game) {
        return `Production: ${this.powerPerBuilding} power per building per tick.`;
    }
    getPreview(game) {
        const curr = this.getProduction(game).power;
        this.count++;
        const next = this.getProduction(game).power;
        this.count--;
        return `Current: Power ${curr}/tick | Next: Power ${next}/tick`;
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
            basePowerCost: options.basePowerCost || 3,
            description: options.description || 'Produces both money and power each tick.'
        });
        this.moneyPerBuilding = options.moneyPerBuilding || 2;
        this.powerPerBuilding = options.powerPerBuilding || 1;
    }
    getFormula(game) {
        return `Production: ${this.moneyPerBuilding} money & ${this.powerPerBuilding} power per building per tick.`;
    }
    getPreview(game) {
        const curr = this.getProduction(game);
        this.count++;
        const next = this.getProduction(game);
        this.count--;
        return `Current: $${curr.money}/tick, Power: ${curr.power}/tick | Next: $${next.money}/tick, Power: ${next.power}/tick`;
    }
    getProductionAmount() {
        return { money: this.moneyPerBuilding, power: this.powerPerBuilding };
    }
}






// Abstract base class for upgrades
class Upgrade {
    constructor({ name, cost, description = '' }) {
        if (new.target === Upgrade) {
            throw new Error("Cannot instantiate abstract class Upgrade directly.");
        }
        this.name = name;
        this.cost = cost;
        this.bought = false;
        this.description = description || 'No description provided.';
    }
    // Returns a string formula for upgrade effect
    getFormula(game) {
        return 'See upgrade subclass for details.';
    }
    // Returns a string preview of effect if purchased
    getPreview(game) {
        return 'See upgrade subclass for details.';
    }
    // Default: always unlocked
    isUnlocked(game) {
        return true;
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
    constructor({ name, cost, buildingIndex, multiplier, description }) {
        super({ name, cost, description: description || 'Doubles the production of a specific building.' });
        this.buildingIndex = buildingIndex;
        this.multiplier = multiplier;
    }
    isUnlocked(game) {
        // Unlocked if building count >= 5
        return game.buildings[this.buildingIndex] && game.buildings[this.buildingIndex].count >= 5;
    }
    getFormula(game) {
        return `Multiplies production of building #${this.buildingIndex} by ${this.multiplier}.`;
    }
    getPreview(game) {
        const b = game.buildings[this.buildingIndex];
        if (!b) return 'Building not found.';
        const before = b.getProduction(game);
        // Simulate effect
        const oldBase = b.baseProduction;
        b.baseProduction *= this.multiplier;
        const after = b.getProduction(game);
        b.baseProduction = oldBase;
        return `Current: $${before.money}/tick, Power: ${before.power}/tick | After upgrade: $${after.money}/tick, Power: ${after.power}/tick`;
    }

    applyEffect(game) {
        if (game.buildings[this.buildingIndex]) {
            game.buildings[this.buildingIndex].baseProduction *= this.multiplier;
        }
    }
}

// Upgrade that multiplies production for all buildings with a given tag
class TagProductionMultiplierUpgrade extends Upgrade {
    constructor({ name, cost, tag, multiplier, description }) {
        super({ name, cost, description: description || 'Doubles the production of all buildings with a given tag.' });
        this.tag = tag;
        this.multiplier = multiplier;
    }
    isUnlocked(game) {
        // Unlocked if any building with tag has count >= 3
        return game.queryTags(this.tag).some(b => b.count >= 3);
    }
    getFormula(game) {
        return `Multiplies production of all '${this.tag}' buildings by ${this.multiplier}.`;
    }
    getPreview(game) {
        const buildings = game.queryTags(this.tag);
        if (!buildings.length) return 'No buildings with this tag.';
        const before = buildings.map(b => b.getProduction(game));
        // Simulate effect
        const oldBases = buildings.map(b => b.baseProduction);
        buildings.forEach(b => b.baseProduction *= this.multiplier);
        const after = buildings.map(b => b.getProduction(game));
        buildings.forEach((b, i) => b.baseProduction = oldBases[i]);
        return before.map((prod, i) => `B${i}: $${prod.money}/tick, Power: ${prod.power}/tick | After: $${after[i].money}/tick, Power: ${after[i].power}/tick`).join('; ');
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
            description: 'Doubles the output of your Coin Printers.'
        }));

        this.addUpgrade(new TagProductionMultiplierUpgrade({
            name: 'Double all Power Output',
            cost: 300,
            tag: 'power',
            multiplier: 2,
            description: 'Doubles the output of all Power Plants.'
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

    // Query for an upgrade by name or identifier
    getUpgrade(query) {
        // query can be a string (name or identifier) or a predicate function
        if (typeof query === 'function') {
            return this.upgrades.find(query);
        } else {
            return this.upgrades.find(u => u.name === query || u.identifier === query);
        }
    }

    canAfford(cost) {
        return this.money >= cost;
    }

    buyBuilding(index) {
        const building = this.buildings[index];
        const cost = building.getCost(this);
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
            const prod = b.getProduction(this);
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
