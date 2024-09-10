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
            // You can add more enemy types here
            default:
                throw new Error('Unknown enemy type');
        }
    }
}

module.exports = EnemyFactory;
