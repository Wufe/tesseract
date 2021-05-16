import { TController } from ".";
import { v1 } from 'uuid';
import mkdirp from "mkdirp";
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Multipart, MultipartFile } from "fastify-multipart";
import prettyBytes from "pretty-bytes";
import { StoreService } from "../services/store-service";
import { TFile } from "@/shared/types/file";
const pump = promisify(pipeline);

const outputFolder = 'output';

type TDeps = {
    storeService: StoreService;
}
export const initUploadController: TController<TDeps> = (app, {storeService}) => {
    app.post(`/api/v1/files`, async function (req, reply) {
        // Retrieve the file
        const data = await req.file();

        const mimeField = data.fields['original-mime'];
        if (!mimeField)
            return reply.status(400).send(`original-mime not specified.`);
        const mime = (mimeField as unknown as Multipart<string>).value;

        const filenameField = data.fields['filename'];
        if (!filenameField)
            return reply.status(400).send(`filename not specified.`);
        const filename = (filenameField as unknown as Multipart<string>).value;

        const sizeField = data.fields['size'];
        if (!sizeField)
            return reply.status(400).send(`size not specified.`);
        let size = (sizeField as unknown as Multipart<string>).value;
        const originalBytes = +size;
        size = prettyBytes(+size);

        const encodedBytesField = data.fields['encoded-bytes'];
        if (!filenameField)
            return reply.status(400).send(`encoded-bytes not specified.`);
        const encodedBytes = +(encodedBytesField as unknown as Multipart<string>).value;

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

        const file: TFile = {
            uuid,
            mime,
            name: filename,
            bytesOriginal: originalBytes,
            bytesEncoded: encodedBytes,
            size,
        };

        // Store file in database
        await storeService.storeFile(file);

        reply.send(file);
    })
}