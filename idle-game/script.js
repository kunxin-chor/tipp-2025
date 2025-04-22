// Wires UI events to Game instance and updates the view

const game = new window.Game();
window.game = game; // For debugging in console

function updateUI() {
    const prod = game.getProductionPerSecond();
    window.View.updateResources(game.money, game.getTotalPowerProduced(), game.getTotalPowerRequired(), prod);
    // Power cap logic: can't buy if total buildings >= power
    // Only restrict power cap for buildings that do NOT produce power
    const canBuyCallback = (i) => {
        const b = game.buildings[i];
        // If the building produces power (i.e., getProductionAmount().power > 0), allow always
        if (b.getProductionAmount().power > 0) return true;
        // Simulate buying this building
        let tempCount = b.count + 1;
        let tempPowerRequired = game.getTotalPowerRequired() + b.basePowerCost;
        // Calculate the new total power produced if this is a power building
        let totalPowerProduced = game.getTotalPowerProduced();
        return tempPowerRequired <= totalPowerProduced;
    };


    window.View.updateBuildings(
        game.buildings,
        game.canAfford.bind(game),
        (i) => {
            game.buyBuilding(i);
            updateUI();
        },
        canBuyCallback
    );
    window.View.updateUpgrades(game.upgrades, game.canAfford.bind(game), (i) => {
        game.buyUpgrade(i);
        updateUI();
    });
}

document.getElementById('manual-collect').onclick = () => {
    game.manualCollect();
    updateUI();
};

setInterval(() => {
    game.tick();
    updateUI();
}, game.tickInterval);

// Initial UI update
updateUI();
