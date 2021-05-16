import { TFile } from '@/shared/types/file';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { VerticalSpacer } from '../../ui/spacer';
import { TextInput } from '../../ui/text-input';
import { DecodingProgress } from './decoding-progress/decoding-progress';
import { DownloadProgress } from './download-progress/download-progress';
import { FileInfo } from './file-info/file-info';
import { InsertUUID } from './insert-uuid/insert-uuid';
import { useFileDownload } from './use-file-download';
import { useFileRetrieval } from './use-file-retrieval';

type TProps = {};
export const DownloadPage = ({}: TProps) => {

    const [downloadStatus, setDownloadStatus] = useState(DownloadStatus.IDLE);
    const [file, setFile] = useState<TFile>();
    const [progress, setProgress] = useState(0); /* Range 0-1 */
    const {loading, retrieveFile} = useFileRetrieval();
    const {downloadFile} = useFileDownload();
    const [logs, setLogs] = useState<string[]>([]);

    const onUUIDSelected = async (uuid: string) => {
        if (!uuid?.trim()) return;
        const file = await retrieveFile(uuid);
        if (file) {
            setFile(file);
            setDownloadStatus(DownloadStatus.FILE_INFO);
        }
    }

    const onKeySelected = async (key: string) => {
        try {
            await downloadFile(
                file,
                key,
                ({ loaded, total }) => {
                    setDownloadStatus(DownloadStatus.DOWNLOADING);
                    const progress = +(loaded / total).toFixed(2);
                    setProgress(progress);
                },
                () => {
                    setDownloadStatus(DownloadStatus.DECODING);
                },
                log => {
                    setLogs(logs => [...logs, log]);
                }
            );
        } catch (e) {
            alert(e);
            setDownloadStatus(DownloadStatus.IDLE);
        }
    }
    
    return <>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
        {downloadStatus === DownloadStatus.IDLE && <InsertUUID onUUIDSelected={onUUIDSelected} disabled={loading} />}
        {downloadStatus === DownloadStatus.FILE_INFO && <FileInfo file={file} onKeySelected={onKeySelected} />}
        {downloadStatus === DownloadStatus.DOWNLOADING && <DownloadProgress progress={progress * 100} />}
        {downloadStatus === DownloadStatus.DECODING && <DecodingProgress />}
    </>
}

enum DownloadStatus {
    IDLE = 'idle',
    FILE_INFO = 'file-info',
    DOWNLOADING = 'downloading',
    DECODING = 'decoding',
}