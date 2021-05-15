import { TController } from ".";

export const initHomeController: TController = app => {
    app.get('/', async function (req, reply) {
        return reply.sendFile('index.html');
    })
    app.get('/decrypt', async function (req, reply) {
        return reply.sendFile('index.html');
    });
}