class Log {

    constructor() { this.messages = [] }

    clearMessages() { this.messages = [] }

    show() { return this.messages }

    add(message) { 
        this.messages.push(message)
        if (this.messages.length > 5)
            this.messages.shift()
    }
}

module.exports = Log
