import { TController } from ".";
import { v1 } from 'uuid';
import mkdirp from "mkdirp";
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Multipart, MultipartFile } from "fastify-multipart";
const pump = promisify(pipeline);

const outputFolder = 'output';

export const initUploadController: TController = app => {
    app.post(`/v1/files`, async function (req, reply) {
        // Retrieve the file
        const data = await req.file();
        const mimeField = data.fields['original-mime'];
        if (!mimeField)
            return reply.status(400).send(`Mime type not specified.`);

        const mime = (mimeField as unknown as Multipart<string>).value;

        // Create a new UUID
        const filename = v1();
        const filepath = path.resolve(outputFolder, filename);

        // Create output path if it does not exist
        await mkdirp(path.resolve(outputFolder));

        // Pipe stream into a new file
        await pump(data.file, fs.createWriteStream(filepath, {
            flags: 'a',
            encoding: null,
            mode: 0o666
        }));

        reply.send({ filename, mime });
    })
}