const fs = require('fs');

class Map {
    constructor(enemyFactory) {
        const mapFilePath = './entities/maps/sample-map.txt';
        this.enemyFactory = enemyFactory;

        this.TILE_MAP = {
            empty: { id: 0, sprite: '.', passable: true },
            wall: { id: 1, sprite: '#', passable: false },
            water: { id: 3, sprite: '~', passable: true },
            tree: { id: 4, sprite: 'T', passable: false },
            enemySpawn: { id: 'E', sprite: 'E', passable: true }
        };

        this.mapData = this.loadMap(mapFilePath);
    }

    loadMap(mapFilePath) {
        const mapFileContent = fs.readFileSync(mapFilePath, 'utf-8').trim();
        return mapFileContent.split('\n').map(row => row.split(''));
    }

    applyToGrid(grid) {
        for (let y = 0; y < this.mapData.length; y++) {
            for (let x = 0; x < this.mapData[y].length; x++) {
                const value = this.mapData[y][x];

                if (value === 'E') {
                    const enemy = this.enemyFactory.randomEnemy({ x, y });
                    grid.spawnEntity(enemy, { x, y });
                } else {
                    const tile = Object.values(this.TILE_MAP).find(t => t.id === value) || this.TILE_MAP.empty;
                    grid.grid[y][x] = tile.sprite;
                }
            }
        }
    }

    getRows() {
        return this.mapData.length;
    }

    getCols() {
        return this.mapData[0].length;
    }
}

module.exports = Map;
