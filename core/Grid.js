const EnemyFactory = require('../factories/EnemyFactory');
const Map = require('./Map');

class Grid {
    constructor() {
        this.map = new Map(this.createEnemyFactory());  // Pass EnemyFactory to Map
        this.rows = this.map.getRows();
        this.cols = this.map.getCols();
        this.grid = this.initializeGrid();
        this.entities = [];  // Track all entities (players, enemies) on the grid
        this.applyMap();      // Map is applied after initialization
    }

    createEnemyFactory() {
        return new EnemyFactory(this, this.log);  // Create EnemyFactory with grid reference
    }

    initializeGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                grid[y][x] = '.';
            }
        }
        return grid;
    }

    applyMap() {
        if (this.map && typeof this.map.applyToGrid === 'function') {
            this.map.applyToGrid(this);  // Apply the map to the grid
        } else {
            throw new Error('Invalid map passed to Grid');
        }
    }

    spawnEntity(entity, position) {
        if (this.isWithinGrid(position) && !this.isOccupied(position)) {
            entity.position = position;
            this.entities.push(entity);
            this.updatePosition(entity);
        } else {
            throw new Error(`Cannot spawn entity at ${position.x}, ${position.y}`);
        }
    }

    updatePosition(entity) {
        if (this.isWithinGrid(entity.position)) {
            this.grid[entity.position.y][entity.position.x] = entity.sprite;
        }
    }

    isWithinGrid(position) {
        return position.x >= 0 && position.x < this.cols &&
               position.y >= 0 && position.y < this.rows;
    }

    isOccupied(position) {
        return this.grid[position.y][position.x] !== this.map.TILE_MAP.empty.sprite;
    }
}

module.exports = Grid;
