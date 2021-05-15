import { TController } from ".";
import { v1 } from 'uuid';
import mkdirp from "mkdirp";
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Multipart, MultipartFile } from "fastify-multipart";
import prettyBytes from "pretty-bytes";
const pump = promisify(pipeline);

const outputFolder = 'output';

export const initUploadController: TController = app => {
    app.post(`/api/v1/files`, async function (req, reply) {
        // Retrieve the file
        const data = await req.file();

        const mimeField = data.fields['original-mime'];
        if (!mimeField)
            return reply.status(400).send(`Mime type not specified.`);
        const mime = (mimeField as unknown as Multipart<string>).value;

        const filenameField = data.fields['filename'];
        if (!filenameField)
            return reply.status(400).send(`Filename not specified.`);
        const filename = (filenameField as unknown as Multipart<string>).value;

        const sizeField = data.fields['size'];
        if (!sizeField)
            return reply.status(400).send(`Size not specified.`);
        let size = (sizeField as unknown as Multipart<string>).value;
        const originalBytes = +size;
        size = prettyBytes(+size);

        // Create a new UUID
        const uuid = v1();
        const filepath = path.resolve(outputFolder, uuid);

        // Create output path if it does not exist
        await mkdirp(path.resolve(outputFolder));

        // Pipe stream into a new file
        const res = await pump(data.file, fs.createWriteStream(filepath, {
            flags: 'a',
            encoding: null,
            mode: 0o666
        }));
        console.log({res});
        const encodedBytes = 0; // TODO

        reply.send({ uuid, mime, size, originalBytes, encodedBytes });
    })
}