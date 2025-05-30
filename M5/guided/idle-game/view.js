// Handles all UI rendering and updates

const View = {
    updateResources(money, powerProduced, powerRequired, production) {
        document.querySelector('.resources-panel .resources').textContent = `Money: ${money} | Power: ${powerProduced} / ${powerRequired}`;
        document.querySelector('.production-panel .production').textContent = `Production/sec: Money +${production.money}, Power +${production.power}`;
    },

    updateBuildings(buildings, canAffordCallback, buyCallback, canBuyCallback) {
        const container = document.getElementById('buildings');
        container.innerHTML = '';
        const iconMap = {
            'Coin Printer': 'fa-coins',
            'Power Plant': 'fa-bolt',
            'Fusion Reactor': 'fa-atom',
        };
        buildings.forEach((b, i) => {
            const prod = b.getProduction();
            const perLevelProd = b.getProductionAmount(1);
            const card = document.createElement('div');
            card.className = 'building-card';
            // Icon
            const icon = document.createElement('i');
            icon.className = `fa-solid ${iconMap[b.name] || 'fa-building'} fa-icon`;
            card.appendChild(icon);
            // Info container
            const info = document.createElement('div');
            info.style.flex = '1';
            // Name and owned
            const nameRow = document.createElement('div');
            nameRow.innerHTML = `<strong>${b.name}</strong> <span style="color:#ffd700;">(x${b.count})</span>`;
            info.appendChild(nameRow);
            // Cost row
            const costRow = document.createElement('div');
            costRow.innerHTML = `<span style="margin-right:1em"><i class='fa-solid fa-coins' style='color:#ffd700'></i> ${b.getCost(window.game)}</span><span><i class='fa-solid fa-bolt' style='color:#00e6e6'></i> ${b.basePowerCost}</span>`;
            info.appendChild(costRow);
            // Production row
            const prodRow = document.createElement('div');
            prodRow.innerHTML =
                `<span style="margin-right:1em"><i class='fa-solid fa-coins' style='color:#ffd700'></i> +${perLevelProd.money || 0}/ea</span>` +
                `<span><i class='fa-solid fa-bolt' style='color:#00e6e6'></i> +${perLevelProd.power || 0}/ea</span>`;
            info.appendChild(prodRow);
            // Preview row
            const previewRow = document.createElement('div');
            previewRow.className = 'building-preview-row';
            previewRow.style.fontSize = '0.95em';
            previewRow.style.color = '#aaffcc';
            previewRow.style.marginTop = '0.2em';
            previewRow.textContent = b.getPreview(window.game);
            info.appendChild(previewRow);
            card.appendChild(info);
            // Build button
            const btn = document.createElement('button');
            btn.textContent = 'Build';
            btn.disabled = !canAffordCallback(b.getCost(window.game)) || (canBuyCallback && !canBuyCallback(i));
            btn.onclick = () => buyCallback(i);
            card.appendChild(btn);
            container.appendChild(card);
        });
    },

    updateUpgrades(upgrades, canAffordCallback, buyCallback) {
        const container = document.getElementById('upgrades');
        container.innerHTML = '';
        upgrades.forEach((u, i) => {
            if (u.bought) return;
            const card = document.createElement('div');
            card.className = 'upgrade-card';
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-arrow-up fa-icon';
            card.appendChild(icon);
            const label = document.createElement('span');
            label.textContent = `${u.name} | Cost: ${u.cost}`;
            card.appendChild(label);
            const btn = document.createElement('button');
            btn.textContent = 'Upgrade';
            btn.disabled = !canAffordCallback(u.cost) || !u.isUnlocked(window.game);
            btn.onclick = () => buyCallback(i);
            card.appendChild(btn);
            container.appendChild(card);
        });
    }
};

window.View = View;
