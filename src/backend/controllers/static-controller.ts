import FastifyStatic from 'fastify-static';
import path from 'path';
import { TController } from ".";

export const initStaticController: TController = app => {
    app.register(FastifyStatic, {
        root: path.resolve('public'),
        prefix: '/',
    });
}