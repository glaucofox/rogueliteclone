const Keyboard = require('./Keyboard')
const Display = require('./Display')
const EnemyFactory = require('./EnemyFactory')

class Game {
    constructor() {
        this.debugMode = false
        this.display = new Display(10, 20)
        this.log = this.display.log
        this.player = this.display.getPlayer()
        this.enemyFactory = new EnemyFactory(this.display.grid, this.display.log);
        this.gameOver = false
        this.enemies = this.enemyFactory.generateEnemies()
        this.display.setEnemies(this.enemies)
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

const game = new Game()
