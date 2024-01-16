class Player {
    constructor(grid, log) {
        this.name = "Player"
        this.grid = grid
        this.position = { x: 0, y: 0 }
        this.grid.updateEntityPosition(this, this.position)
        this.health = 100
        this.strength = 10
        this.name = "Player"
        this.log = log
    }

    move(direction) {
        let newPosition = this.calculateNewPosition(direction)

        if (this.grid.isOccupied(newPosition)) {
            const enemy = this.grid.getEnemyAtPosition(newPosition)
            if (enemy) {
                this.attack(enemy)
            }
        } else {
            this.grid.updateEntityPosition(this, newPosition)
        }
    }

    findEnemyAtPosition(position) {
        return this.enemies.find(enemy => 
            enemy.position.x === position.x && enemy.position.y === position.y)
    }

    calculateNewPosition(direction) {
        let newPosition = { x: this.position.x, y: this.position.y }

        switch (direction) {
            case "N": newPosition.y--; break
            case "NE": newPosition.x++; newPosition.y--; break
            case "E": newPosition.x++; break
            case "SE": newPosition.x++; newPosition.y++; break
            case "S": newPosition.y++; break
            case "SW": newPosition.x--; newPosition.y++; break
            case "W": newPosition.x--; break
            case "NW": newPosition.x--; newPosition.y--; break
        }

        return newPosition;
    }

    attack(enemy) {
        if (!this.isInRange(enemy)) {
            this.log.add(`${enemy.name} is too far away to attack.`)
            return
        }

        const hitChance = Math.floor(Math.random() * 20) + 1
        if (hitChance > 5) {
            const damage = this.strength
            enemy.health -= damage
            this.log.add(`You attacked ${enemy.name} and dealt ${damage} damage.`)
        } else {
            this.log.add("Your attack missed!")
        }
    }

    isInRange(enemy) {
        const range = 2
        const distance = Math.abs(this.position.x - enemy.position.x) + 
                         Math.abs(this.position.y - enemy.position.y)
        return distance <= range
    }
}

module.exports = Player
