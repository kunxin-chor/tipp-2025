// Handles all UI rendering and updates

const View = {
    updateResources(money, powerProduced, powerRequired, production) {
        document.getElementById('resources').textContent = `Money: ${money} | Power: ${powerProduced} / ${powerRequired}`;
        document.getElementById('production').textContent = `Production/sec: Money +${production.money}, Power +${production.power}`;
    },

    updateBuildings(buildings, canAffordCallback, buyCallback, canBuyCallback) {
        const container = document.getElementById('buildings');
        container.innerHTML = '';
        buildings.forEach((b, i) => {
            const prod = b.getProduction();
            let prodStr = [];
            const perLevelProd = b.getProductionAmount(1);
            if (perLevelProd.money) prodStr.push(`Money +${perLevelProd.money}/ea`);
            if (perLevelProd.power) prodStr.push(`Power +${perLevelProd.power}/ea`);
            const btn = document.createElement('button');
            btn.textContent = `${b.name} (Owned: ${b.count}) | Cost: ${b.getCost()} | ${prodStr.join(', ')}`;
            btn.disabled = !canAffordCallback(b.getCost()) || (canBuyCallback && !canBuyCallback(i));
            btn.onclick = () => buyCallback(i);
            container.appendChild(btn);
        });
    },

    updateUpgrades(upgrades, canAffordCallback, buyCallback) {
        const container = document.getElementById('upgrades');
        container.innerHTML = '';
        upgrades.forEach((u, i) => {
            if (u.bought) return;
            const btn = document.createElement('button');
            btn.textContent = `${u.name} | Cost: ${u.cost}`;
            btn.disabled = !canAffordCallback(u.cost) || !u.isUnlocked(window.game);
            btn.onclick = () => buyCallback(i);
            container.appendChild(btn);
        });
    }
};

window.View = View;
