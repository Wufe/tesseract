import path from 'path';
import Fastify from 'fastify';
import FastifyStatic from 'fastify-static';

const app = Fastify();
app.register(FastifyStatic, {
    root: path.resolve('public'),
    prefix: '/',
});
app.listen(3000, err => {
    if (err) throw err;
    console.log(`Server listening on ${(app.server.address() as any).port}`);
})