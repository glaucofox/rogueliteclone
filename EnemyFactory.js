const Enemy = require('./Enemy');

class EnemyFactory {
    constructor(grid, log) {
        this.grid = grid;
        this.log = log;
    }

    createEnemy(type, position) {
        switch(type) {
            case 'Goblin':
                return new Enemy(this.grid, 'Goblin', '☻', position, this.log);
            case 'Orc':
                return new Enemy(this.grid, 'Orc', '☻', position, this.log);
            default:
                throw new Error('Unknown enemy type');
        }
    }

    generateEnemies() {
        return [
            this.createEnemy("Goblin", { x: 2, y: 2 }),
            this.createEnemy("Orc", { x: 4, y: 4 })
        ]
    }
}
module.exports = EnemyFactory;
