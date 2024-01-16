class Grid {
    constructor(size) {
        this.size = size;
        this.grid = this.initializeGrid();
    }

    initializeGrid() {
        let grid = [];
        for (let y = 0; y < this.size; y++) {
            grid[y] = [];
            for (let x = 0; x < this.size; x++) {
                grid[y][x] = '.';
            }
        }
     
        return grid;
    }

    addEnemies(enemies) {
        this.enemies = enemies
    }

    updateEntityPosition(entity, newPosition) {
        if (this.isWithinGrid(newPosition)) {
            if (!this.isOccupied(newPosition) || this.getEntityAtPosition(newPosition) === entity) {
                this.clearPosition(entity.position);
                this.grid[newPosition.y][newPosition.x] = entity.name[0];
                entity.position = newPosition;
                return true;
            }
        }
        return false;
    }

    getEntityAtPosition(position) {
        if (this.isWithinGrid(position) && this.isOccupied(position)) {
            let allEntities = [this.player, ...this.enemies];
            return allEntities.find(entity => 
                entity.position.x === position.x && entity.position.y === position.y);
        }
        return null;
    }

    getEnemyAtPosition(position) {
        return this.enemies.find(enemy => 
            enemy.position.x === position.x && enemy.position.y === position.y);
    }

    updatePosition(entity) {
        if (this.isWithinGrid(entity.position)) {
            this.grid[entity.position.y][entity.position.x] = entity.name[0];
        }
    }

    clearPosition(position) {
        if (this.isWithinGrid(position)) {
            this.grid[position.y][position.x] = '.';
        }
    }

    isWithinGrid(position) {
        return position.x >= 0 && position.x < this.size &&
               position.y >= 0 && position.y < this.size;
    }

    isOccupied(position) {
        return this.grid[position.y][position.x] !== '.';
    }

    render() {
        console.clear();
        this.grid.forEach(row => console.log(row.join(' ')));
    }

    clear() {
        this.grid = this.initializeGrid();
    }
}

module.exports = Grid;