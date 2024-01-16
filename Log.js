export default class Log {

    constructor() { this.messages = [] }

    clearMessages() { this.messages = [] }

    show() { return this.messages }

    add(message) {
        console.log(message)
        this.messages.push(message)
        if (this.messages.length > 5)
            this.messages.shift()
    }
}
