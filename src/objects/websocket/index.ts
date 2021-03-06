import { EventEmitter } from "events"
import WebSocket from "ws"
import messageEvents = require("./messageEvents")

export class WebsocketHandler extends EventEmitter {
    public bearer?: string
    public domain: string = "api.ifunny.chat"
    public socketUrl: string = `wss://${this.domain}`
    public apiUrl: string = `https://${this.domain}`
    public requestDeleteTimeout: number = 750
    public socket?: any

    constructor(opts: {bearer: string}) {
        super()
        Object.assign(this, opts)
    }

    getWebsocket() {
        return new WebSocket(`${this.socketUrl}/ws/${this.bearer}`)
    }

    openConnection() {
        let socket = this.getWebsocket()

        this.socket = socket
        socket.onmessage = (message: any) => this.onMessage(JSON.parse(message.data))
    }

    async connect() {
        this.openConnection()
        setInterval(()=>{
            if (this.socket.readyState != this.socket.OPEN) {
                this.openConnection()
            }
        }, 1000)
    }

    async addEventListener(request_id: string, callback: Function | any) {
        this.on(`request_id-${request_id}`, callback)
        setTimeout(()=>{this.removeListener(`request_id-${request_id}`, callback)}, this.requestDeleteTimeout)
    }

    async onMessage(data: {[key: string]: any}) {
        
        if (data.request_id) {
            this.emit(`request_id-${data.request_id}`, )
        }

        switch (data.type) {
            case "message":
                messageEvents.message(this, data)
                break

            case "connection_error":
                throw new Error(`${data.error}\n${data.reason}`)

            default:
                console.log(data)
                break
        }
    }
}