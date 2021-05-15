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

    const [status, setStatus] = useState(DownloadStatus.IDLE);
    const [file, setFile] = useState<TFile>();
    const {loading, retrieveFile} = useFileRetrieval();
    const {downloadFile} = useFileDownload();

    const onUUIDSelected = async (uuid: string) => {
        if (!uuid?.trim()) return;
        const file = await retrieveFile(uuid);
        if (file) {
            setFile(file);
            setStatus(DownloadStatus.FILE_INFO);
        }
    }

    const onKeySelected = async (key: string) => {
        await downloadFile(file, key);
    }

    useEffect(() => {
        onUUIDSelected('3f165750-b597-11eb-9262-2b94a8b17a67')
    }, [])
    
    return <>
        {status === DownloadStatus.IDLE && <InsertUUID onUUIDSelected={onUUIDSelected} disabled={loading} />}
        {status === DownloadStatus.FILE_INFO && <FileInfo file={file} onKeySelected={onKeySelected} />}
        {status === DownloadStatus.DOWNLOADING && <DownloadProgress progress= {100} />}
        {status === DownloadStatus.DECODING && <DecodingProgress />}
    </>
}

enum DownloadStatus {
    IDLE = 'idle',
    FILE_INFO = 'file-info',
    DOWNLOADING = 'downloading',
    DECODING = 'decoding',
}