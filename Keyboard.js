const keypress = require('keypress');

class Keyboard {
    constructor() {
        keypress(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }

    onKeypress(callback) {
        process.stdin.on('keypress', (ch, key) => callback(key));
    }
}

module.exports = Keyboard;
