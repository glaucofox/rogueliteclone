export default class Grid {
    constructor(rows, cols, context) {
        this.rows = rows
        this.cols = cols
        this.context = context
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

    renderCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        // Define the size of each cell
        const cellWidth = this.context.canvas.width / this.cols;
        const cellHeight = this.context.canvas.height / this.rows;

        // Render each cell
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                // Determine the color or sprite based on the cell's value
                let cellValue = this.grid[y][x];
                if (cellValue !== '.') {
                    // Draw the sprite for the entity
                    // For now, we'll just use different colors as placeholders
                    this.context.fillStyle = this.getSpriteColor(cellValue);
                    this.context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
            }
        }
    }

    getSpriteColor(sprite) {
        // Placeholder method to return color based on the sprite character
        switch (sprite) {
            case 'P': return 'blue';  // Player color
            case 'G': return 'green'; // Goblin color
            case 'O': return 'red';   // Orc color
            default: return 'black';
        }
    }


    clear() {
        this.grid = this.initializeGrid()
    }
}
