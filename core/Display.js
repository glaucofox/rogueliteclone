const Grid = require('./Grid')
const Log = require('./Log')
const Player = require('../entities/Player')

class Display {
    constructor() {
        this.grid = new Grid();
        this.log = new Log();
        this.player = new Player(this.grid, this.log);
    }

    getPlayer() {
        return this.player;
    }

    renderFrame(debugMode) {
        this.grid.render();
        this.displayLog();

        if (debugMode) {
            console.log(`Player Position: ${this.player.position.x}, ${this.player.position.y}`);
            this.grid.entities.forEach(entity => {
                console.log(`${entity.name} Position: ${entity.position.x}, ${entity.position.y} Health: ${entity.health}`);
            });
        }
    }

    cleanUpDefeatedEnemies() {
        //
    }

    displayLog() {
        for (const message of this.log.show()) {
            console.log(message);
        }
    }
}

module.exports = Display;
