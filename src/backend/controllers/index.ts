import {FastifyInstance, FastifyLoggerInstance, RawReplyDefaultExpression, RawRequestDefaultExpression} from 'fastify';
import http from 'http';

export type TController<T = {}> = (
    app: FastifyInstance<
        http.Server,
        RawRequestDefaultExpression<http.Server>,
        RawReplyDefaultExpression<http.Server>,
        FastifyLoggerInstance
    >,
    deps?: T
) => void;