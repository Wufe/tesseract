import { TController } from ".";
import uuid from 'uuid';
import mkdirp from "mkdirp";
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);

const outputFolder = 'output';

export const initUploadController: TController = app => {
    app.post(`/v1/files`, async function (req, reply) {
        const data = await req.file();
        const filename = uuid.v1();
        await mkdirp(path.resolve(outputFolder));
        await pump(data.file, fs.createWriteStream(path.resolve(outputFolder, filename), {
            flags: 'a',
            encoding: null,
            mode: 0o666
        }));
        reply.send();
    })
}