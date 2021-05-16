import { TFile } from "@/shared/types/file";
import { TController } from ".";
import fs from 'fs';
import path from 'path';
import { StoreService } from "../services/store-service";

type TDeps = {
    storeService: StoreService;
}
export const initDownloadController: TController<TDeps> = (app, {storeService}) => {
    app.get(`/api/v1/file`, async function (req, reply) {
        const {uuid} = req.query as {uuid: string};
        if (!uuid)
            return reply.status(400).send(`Missing uuid param.`);

        const file = await storeService.getFileByUUID(uuid);
        if (!file)
            return reply.status(404).send(`Not found.`);

        return reply.send(file)
    })

    app.get(`/api/v1/file/:uuid/download`, async function (req, reply) {
        const { uuid } = req.params as {uuid: string};
        
        const file = await storeService.getFileByUUID(uuid);
        if (!file)
            return reply.status(404).send(`Not found.`);

        const stream = fs.createReadStream(path.resolve('output', file.uuid));
        reply.type(file.mime).send(stream);
    });
}