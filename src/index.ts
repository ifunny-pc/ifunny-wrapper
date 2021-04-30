import { EventEmitter } from "events"

declare global {
    namespace NodeJS {
        interface Global {
            client: any
            emitter: any
        }
    }
}

global.emitter = new EventEmitter()

export * from "./objects/Client"