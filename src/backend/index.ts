import path from 'path';
import Fastify from 'fastify';
import FastifyStatic from 'fastify-static';
import FastifyMultipart from 'fastify-multipart';
import { initStaticController } from './controllers/static-controller';
import { initUploadController } from './controllers/upload-controller';

const app = Fastify();
app.register(FastifyMultipart)

initStaticController(app);
initUploadController(app);

app.listen(3000, err => {
    if (err) throw err;
    console.log(`Server listening on ${(app.server.address() as any).port}`);
})