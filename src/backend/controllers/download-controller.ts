import { TFile } from "@/shared/types/file";
import { TController } from ".";
import fs from 'fs';
import path from 'path';

// 3f165750-b597-11eb-9262-2b94a8b17a67
// studio-3t-robo-3t-mac-double-pack.zip
// application/zip
// 100KB

// testkey: +PNXra3uhiypFrVXAzirGw==

const mockedDb: {
    [uuid: string]: TFile;
} = {
    ['3f165750-b597-11eb-9262-2b94a8b17a67']: {
        uuid: '3f165750-b597-11eb-9262-2b94a8b17a67',
        mime: 'application/zip',
        name: 'studio-3t-robo-3t-mac-double-pack.zip',
        size: '100kB',
        bytesOriginal: 255181771,
        bytesEncoded: 255181792,
    }
}

export const initDownloadController: TController = app => {
    app.get(`/api/v1/file`, async function (req, reply) {
        const {uuid} = req.query as {uuid: string};
        if (!uuid)
            return reply.status(400).send(`Missing uuid param.`);

        const file = getFileByUUID(uuid);
        if (!file)
            return reply.status(404).send(`Not found.`);

        return reply.send(file)
    })

    app.get(`/api/v1/file/:uuid/download`, async function (req, reply) {
        const { uuid } = req.params as {uuid: string};
        
        const file = getFileByUUID(uuid);
        if (!file)
            return reply.status(404).send(`Not foudn.`);

        const stream = fs.createReadStream(path.resolve('output', file.uuid));
        reply.type(file.mime).send(stream);
    });
}

function getFileByUUID(uuid: string): TFile | null {
    return mockedDb[uuid] || null;
}