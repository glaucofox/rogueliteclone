const Grid = require('./Grid')
const Log = require('./Log')
const Player = require('../entities/Player')

class Display {
    constructor(gridWidth, gridHeight) {
        this.grid = new Grid(gridWidth, gridHeight);
        this.log = new Log();
        this.player = new Player(this.grid, this.log);
    }

    setEnemies(enemies) {
        this.enemies = enemies;
        this.grid.addEnemies(this.enemies);
    }

    getPlayer(player) {
        return this.player
    }

    clearScreen() {
        console.clear();
    }

    renderFrame(debugMode) {
        this.clearScreen();
        this.grid.render();
        this.displayLog();

        if (debugMode) {
            console.log(`Player Position: ${this.player.position.x}, ${this.player.position.y}`);
            this.enemies.forEach(enemy => {
                console.log(`${enemy.name} Position: ${enemy.position.x}, ${enemy.position.y} Health: ${enemy.health}`);
            });
        }
    }

    cleanUpDefeatedEnemies() {
        const originalEnemies = [...this.enemies]
        this.enemies = this.enemies.filter(enemy => enemy.health > 0)
        originalEnemies.forEach(enemy => {
            if (enemy.health <= 0) {
                this.log.add(enemy.name + " is dead.")
            }
        })
    }

    displayLog() {
        for (const message of this.log.show()) {
            console.log(message);
        }
    }

    logMessage(message) {
        this.log.add(message);
    }

    updatePositions() {
        this.grid.clear();
        this.grid.updatePosition(this.player);
        this.enemies.forEach(enemy => this.grid.updatePosition(enemy));
    }
}

module.exports = Display;
