const Keyboard = require('./Keyboard')
const Grid = require('./Grid')
const Player = require('./Player')
const Enemy = require('./Enemy')
const Log = require('./Log')

class Game {
    constructor() {
        this.log = new Log()
        this.debugMode = false
        this.grid = new Grid(10, 20)
        this.gameOver = false
        this.enemies = [
            new Enemy(this.grid, "Goblin", "☻", { x: 2, y: 2 }, this.log),
            new Enemy(this.grid, "Orc", "☻", { x: 4, y: 4 }, this.log)
        ]
        this.grid.addEnemies(this.enemies)
        this.player = new Player(this.grid, this.log)
        this.gameRunning = true
        
        this.keyboard = new Keyboard(
            (direction) => this.player.move(direction),
            () => this.exitGame()
        )

        this.startGameLoop()
    }

    startGameLoop() {
        const gameLoopInterval = setInterval(() => {
            if (!this.gameRunning) {
                clearInterval(gameLoopInterval)
                return
            }

            this.updateGameState()
            this.renderFrame()
        }, 100)
    }

    clearScreen() {
        console.clear()
    }

    updateGameState() {
        this.cleanUpDefeatedEnemies()
        this.updateGridPositions()

        if (this.enemies.length === 0 && !this.gameOver) {
            this.gameOver = true
            this.log.add("All enemies defeated! You win!")
            this.gameRunning = false
        }
    }

    updateGridPositions() {
        this.grid.clear()
        this.grid.updatePosition(this.player)
        this.enemies.forEach(enemy => this.grid.updatePosition(enemy))
    }

    renderFrame() {
        this.clearScreen()
        this.grid.render()
        this.displayLog()
        if (this.debugMode) {
            this.log.add(`Player Position: ${this.player.position.x}, ${this.player.position.y}`)
            this.enemies.forEach(enemy => {
                this.log.add(`${enemy.name} Position: ${enemy.position.x}, ${enemy.position.y} Health: ${enemy.health}`)
            })
        }
    }

    displayLog() {
        for (const message of this.log.show()) {
            console.log(message)
        }
    }

    exitGame() {
        this.gameRunning = false
        console.log("Game exited.")
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
}

const game = new Game()
