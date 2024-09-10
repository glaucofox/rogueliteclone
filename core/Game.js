const Keyboard = require('./Keyboard')
const Display = require('./Display')

class Game {
    constructor() {
        this.debugMode = false
        this.display = new Display()
        this.log = this.display.log
        this.grid = this.display.grid
        this.player = this.display.getPlayer()
        this.gameOver = false
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
            this.display.renderFrame()
        }, 100)
    }

    updateGameState() {
        this.display.cleanUpDefeatedEnemies()
        this.display.updatePositions()

        if (this.enemies.length === 0 && !this.gameOver) {
            this.gameOver = true
            this.log.add("All enemies defeated! You win!")
            this.gameRunning = false
        }
    }

    exitGame() {
        this.gameRunning = false
        console.log("Game exited.")
    }
}

module.exports = Game
