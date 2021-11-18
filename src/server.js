import {createServer} from 'miragejs'

export function makeServer() {
    return createServer({
        routes() {
            this.post('/api/v1/submitForm', () => ({success: true}))
        }
    })
}