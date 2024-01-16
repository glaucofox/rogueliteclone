class Enemy {
    constructor(grid, name, position) {
        this.name = name
        this.grid = grid
        this.position = position
        this.grid.updateEntityPosition(this, this.position)
        this.health = 50
    }
}

module.exports = Enemy
