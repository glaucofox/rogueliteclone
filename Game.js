import Keyboard from './Keyboard.js';
import Grid from './Grid.js';
import Player from './Player.js';
import Enemy from './Enemy.js';
import Log from './Log.js';

export default class Game {
    constructor() {
        this.log = new Log()
        this.debugMode = false
        this.grid = new Grid(10, 20)
        this.gameOver = false
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.grid = new Grid(10, 20, this.context);
        this.enemies = [
            new Enemy(this.grid, "Goblin", "☻", { x: 2, y: 2 }, this.log),
            new Enemy(this.grid, "Orc", "☻", { x: 4, y: 4 }, this.log)
        ]
        this.grid.addEnemies(this.enemies)
        this.player = new Player(this.grid, this.log)
        this.gameRunning = true
        this.keyboard = new Keyboard()
        this.keyboard.onKeypress(key => this.handleKeypress(key))

        this.updateGameState()
        this.renderFrame()
    }

    startGameLoop() {
        const loop = () => {
            this.updateGameState();
            this.renderFrame();
    
            if (this.gameRunning) {
                requestAnimationFrame(loop);
            }
        };
    
        loop();
    }

    handleKeypress(event) {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                this.player.move('N');
                break
            case 'a':
            case 'ArrowLeft':
                this.player.move('W');
                break
            case 's':
            case 'ArrowDown':
                this.player.move('S');
                break
            case 'd':
            case 'ArrowRight':
                this.player.move('E');
                break
            case 'c':
            case 'Escape':
            
                break
            
        }

        this.updateGameState()
        this.renderFrame()
    }

    handleInput(command) {
        clearScreen()
        const directionCommands = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        if (directionCommands.includes(command.toUpperCase())) {
            this.player.move(command.toUpperCase())
        } else if (command.startsWith("attack")) {
            const args = command.split(" ")
            if (args.length < 2) {
                this.log.add("No enemy specified. Usage: attack [enemy name]")
                return
            }
            const enemyName = args[1]
            const enemy = this.enemies.find(e => e.name.toLowerCase() === enemyName.toLowerCase())
            if (enemy) {
                this.player.attack(enemy)
            }
        }
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
        this.grid.renderCanvas()
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
            console.log(message);
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

    cleanUpDefeatedEnemies() {
        const originalEnemies = [...this.enemies];
        this.enemies = this.enemies.filter(enemy => enemy.health > 0);
        originalEnemies.forEach(enemy => {
            if (enemy.health <= 0) {
                this.log.add(enemy.name + " is dead.");
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.startGameLoop();
});