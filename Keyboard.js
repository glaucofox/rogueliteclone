const keypress = require('keypress')

class Keyboard {
    constructor(playerMoveCallback, gameExitCallback) {
        keypress(process.stdin)
        process.stdin.setRawMode(true)
        process.stdin.resume()
        this.playerMoveCallback = playerMoveCallback
        this.gameExitCallback = gameExitCallback
        this.setupKeypressListener()
    }

    setupKeypressListener() {
        process.stdin.on('keypress', (ch, key) => {
            if (key) {
                this.handleKeypress(key)
            }
        })
    }

    handleKeypress(key) {
        switch (key.name) {
            case 'w':
            case 'up':
                this.playerMoveCallback('N')
                break
            case 'a':
            case 'left':
                this.playerMoveCallback('W')
                break
            case 's':
            case 'down':
                this.playerMoveCallback('S')
                break
            case 'd':
            case 'right':
                this.playerMoveCallback('E')
                break
            case 'c':
            case 'escape':
                process.stdin.pause()
                this.gameExitCallback()
                break
        }
    }
}

module.exports = Keyboard
