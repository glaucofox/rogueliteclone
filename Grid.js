class Grid {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.grid = this.initializeGrid()
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

    addEnemies(enemies) {
        this.enemies = enemies
    }

    updateEntityPosition(entity, newPosition) {
        if (this.isWithinGrid(newPosition)) {
            if (!this.isOccupied(newPosition) || this.getEntityAtPosition(newPosition) === entity) {
                this.clearPosition(entity.position);
                this.grid[newPosition.y][newPosition.x] = entity.sprite;
                entity.position = newPosition;
                return true;
            }
        }
        return false;
    }

    getEntityAtPosition(position) {
        if (this.isWithinGrid(position) && this.isOccupied(position)) {
            let allEntities = [this.player, ...this.enemies]
            return allEntities.find(entity => 
                entity.position.x === position.x && entity.position.y === position.y)
        }
        return null
    }

    getEnemyAtPosition(position) {
        return this.enemies.find(enemy => 
            enemy.position.x === position.x && enemy.position.y === position.y)
    }

    updatePosition(entity) {
        if (this.isWithinGrid(entity.position)) {
            this.grid[entity.position.y][entity.position.x] = entity.sprite;
        }
    }

    clearPosition(position) {
        if (this.isWithinGrid(position)) {
            this.grid[position.y][position.x] = '.'
        }
    }

    isWithinGrid(position) {
        return position.x >= 0 && position.x < this.cols &&
               position.y >= 0 && position.y < this.rows;
    }

    isOccupied(position) {
        if (this.isWithinGrid(position)) {
            return this.grid[position.y][position.x] !== '.';
        }
        return false;
    }
    

    render() {
        console.clear()
        this.grid.forEach(row => console.log(row.join(' ')))
    }

    clear() {
        this.grid = this.initializeGrid()
    }
}

module.exports = Grid