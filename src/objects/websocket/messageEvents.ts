import { WebsocketHandler } from "./index"

export async function message(WebsocketHandler: WebsocketHandler, data: {[key: string]: any}) {
        console.log(data)
}