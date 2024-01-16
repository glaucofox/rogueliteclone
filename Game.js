const readline = require('readline')
const Keyboard = require('./Keyboard')
const Grid = require('./Grid')
const Player = require('./Player')
const Enemy = require('./Enemy')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class Game {
    constructor() {
        this.debugMode = false
        this.gridSize = 10
        this.grid = new Grid(this.gridSize)
        this.enemies = [
            new Enemy(this.grid, "Goblin", { x: 2, y: 2 }),
            new Enemy(this.grid, "Orc", { x: 4, y: 4 })
        ]
        this.grid.addEnemies(this.enemies)
        this.player = new Player(this.grid)
        this.gameRunning = true
        this.keyboard = new Keyboard()
        this.keyboard.onKeypress(key => this.handleKeypress(key))

        this.updateGameState()
        this.renderFrame()
    }

    startGameLoop() {
    }

    handleInput(command) {
        console.clear()
        const directionCommands = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        if (directionCommands.includes(command.toUpperCase())) {
            this.player.move(command.toUpperCase())
        } else if (command.startsWith("attack")) {
            const args = command.split(" ")
            if (args.length < 2) {
                console.log("No enemy specified. Usage: attack [enemy name]")
                return
            }
            const enemyName = args[1]
            const enemy = this.enemies.find(e => e.name.toLowerCase() === enemyName.toLowerCase())
            if (enemy) {
                this.player.attack(enemy)
            } else {
                console.log(`No enemy found with the name '${enemyName}'.`)
            }
        }
    }

    
    updateGameState() {
        this.enemies = this.enemies.filter(enemy => enemy.health > 0)
        this.updateGridPositions()

        if (this.enemies.length === 0) {
            console.log("All enemies defeated! You win!")
            this.gameRunning = false
        }
    }

    updateGridPositions() {
        this.grid.clear()
        this.grid.updatePosition(this.player)
        this.enemies.forEach(enemy => this.grid.updatePosition(enemy))
    }

    renderFrame() {
        this.grid.render()
        if (this.debugMode) {
            console.log(`Player Position: ${this.player.position.x}, ${this.player.position.y}`)
            this.enemies.forEach(enemy => {
                console.log(`${enemy.name} Position: ${enemy.position.x}, ${enemy.position.y} Health: ${enemy.health}`)
            })
        }
    }

    handleKeypress(key) {
        if (key) {
            switch (key.name) {
                case 'w':
                case 'up':
                    this.player.move('N')
                    break
                case 'a':
                case 'left':
                    this.player.move('W')
                    break
                case 's':
                case 'down':
                    this.player.move('S')
                    break
                case 'd':
                case 'right':
                    this.player.move('E')
                    break
                case 'c':
                case 'escape':
                    process.stdin.pause()
                    this.gameRunning = false
                    break
            }

            this.updateGameState()
            this.renderFrame()
        }
    }
}

const game = new Game()
game.startGameLoop()
