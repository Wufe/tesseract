import { TFile } from '@/shared/types/file';
import mysql from 'mysql';

export class StoreService {

    private _pool: mysql.Pool;

    constructor() {
        const host = process.env.DB_HOST;
        const user = process.env.DB_USER;
        const password = process.env.DB_PASS;
        const database = process.env.DB_DB;
        if (!host)
            throw new Error(`Myssing DB_HOST env variable`);
        if (!user)
            throw new Error(`Missing DB_USER env variable`);
        if (!password)
            throw new Error(`Missing DB_PASS env variable`);
        if (!database)
            throw new Error(`Missing DB_DB env variable`);

        this._pool = mysql.createPool({
            host,
            user,
            password,
            database,
        });
    }

    storeFile(file: TFile): Promise<number> {
        return new Promise((resolve, reject) => {
            this._pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                const statement =
                    `INSERT INTO files(uuid, mime, name, bytesOriginal, bytesEncoded, size)
                    VALUES(?, ?, ?, ?, ?, ?)`;
                connection.query(
                    statement,
                    [
                        file.uuid,
                        file.mime,
                        file.name,
                        file.bytesOriginal,
                        file.bytesEncoded,
                        file.size,
                    ],
                    (err, results, fields) => {
                        connection.release();
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(results.insertId);
                    }
                )
            })
        })
    }

    getFileByUUID(uuid: string): Promise<TFile | null> {
        return new Promise((resolve, reject) => {
            this._pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                const query = `SELECT uuid, mime, name, bytesOriginal, bytesEncoded, size FROM files WHERE uuid = ${mysql.escape(uuid)}`;
                connection.query(query, (err, results, fields) => {
                    connection.release();
                    if (!results || !results.length)
                        return resolve(null);
                    const file = results[0];
                    resolve(file);
                })
            })
        })
    }
}