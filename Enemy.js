class Enemy {
    constructor(grid, name, sprite, position, log) {
        this.name = name
        this.grid = grid
        this.sprite = sprite
        this.position = position
        this.grid.updateEntityPosition(this, this.position)
        this.log = log
        this.health = 50
    }
}

module.exports = Enemy
