require('dotenv').config();
import path from 'path';
import Fastify from 'fastify';
import FastifyStatic from 'fastify-static';
import FastifyMultipart from 'fastify-multipart';
import { initStaticController } from './controllers/static-controller';
import { initUploadController } from './controllers/upload-controller';
import { initDownloadController } from './controllers/download-controller';
import { initHomeController } from './controllers/home-controller';
import { StoreService } from './services/store-service';

const app = Fastify();
app.register(FastifyMultipart);

const storeService = new StoreService();

initStaticController(app);
initHomeController(app);
initUploadController(app, {
    storeService
});
initDownloadController(app, {
    storeService
});

app.listen(3999, '0.0.0.0', err => {
    if (err) throw err;
    console.log(`Server listening on ${(app.server.address() as any).port}`);
})