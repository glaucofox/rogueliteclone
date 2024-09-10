const Enemy = require('../entities/Enemy');

class EnemyFactory {
    constructor(grid, log) {
        this.grid = grid;
        this.log = log;
    }

    randomEnemy(position) {
        const enemyTypes = [
            { name: 'Goblin', sprite: '☻', health: 30 },
            { name: 'Orc', sprite: '☻', health: 50 },
            { name: 'Troll', sprite: '☻', health: 70 }
        ];

        const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        
        return new Enemy(this.grid, randomType.name, randomType.sprite, position, this.log, randomType.health);
    }
}

module.exports = EnemyFactory;