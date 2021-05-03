const axios = require("axios")

interface opts {
    bearer?: string,
    email?: string,
    password?: string,
    region?: string
}

export class HttpsHandler {

    public domain: string = "api.ifunny.chat"
    public socketUrl: string = `wss://${this.domain}`
    public apiUrl: string = `https://${this.domain}`
    public bearer?: string
    public email?: string
    public password?: string
    public region: string = "United States"
    
    constructor(opts: opts) {
        Object.assign(this, opts)
        this.login()
    }

    async request(opts: any) {
        let request = (await axios({baseURL: this.apiUrl, ...opts}))
        return request.data
    }

    async login() {
        function onBearer() {
            
        }

        if (this.bearer) {
            onBearer()
        } else if (this.email && this.password) {
            let validateLogin = await this.request({method: "POST", url: "/login", data: JSON.stringify({
                email: this.email,
                password: this.password,
                region: this.region
            })})
            if (validateLogin.bearer) {
                global.emitter.emit("client-logged-in", validateLogin.bearer)
            } else throw new Error(validateLogin.error_description)
        } else throw new Error("Please provide either a bearer, or a username and password, in your client object")
    }
} 