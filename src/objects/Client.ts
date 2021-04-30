import { WebsocketHandler } from "./websocket"
import { HttpsHandler } from "./https"

declare global {
    namespace NodeJS {
        interface Global {
            client: any;
        }
    }
}

interface opts {
    email?: string,
    password?: string,
    bearer?: string,
    region?: string
}

export class Client {
    public HttpsHandler

    constructor(opts: opts) {
        //Object.assign(this, ) 
        /**
         * Add http handlers to ./https
         * Object assign http handlers to this
         * Handle login here
         * Connect to the websocket
         * Object assign websocket to this
         * Globally initialize the client
         * Figure out iteration for classes and how they should interact.
         */
        this.HttpsHandler = new HttpsHandler(opts)
        Object.assign(this, opts)
        global.client = this
        global.emitter.on("client-logged-in", (bearer: string) => {
            global.client.WebsocketHandler = new WebsocketHandler({bearer: bearer, ...opts})
        })
    }

    async login() {

    }
}