export default class Keyboard {
    constructor() {
        document.addEventListener('keydown', event => this.handleKeydown(event));
        this.keydownCallback = null;
    }

    onKeypress(callback) {
        console.log('key pressed')
        this.keydownCallback = callback;
    }

    handleKeydown(event) {
        if (this.keydownCallback) {
            this.keydownCallback(event);
        }
    }
}