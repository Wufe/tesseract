import { TFile } from '@/shared/types/file';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { PageActionTitle } from '../../ui/page/page-action-title';
import { VerticalSpacer } from '../../ui/spacer';
import { TextInput } from '../../ui/text-input';
import { DecodingProgress } from './decoding-progress/decoding-progress';
import { DownloadProgress } from './download-progress/download-progress';
import { FileInfo } from './file-info/file-info';
import { InsertUUID } from './insert-uuid/insert-uuid';
import { useBlobDownload } from './use-blob-download';
import { useFileDownload } from './use-file-download';
import { useFileRetrieval } from './use-file-retrieval';

type TProps = {};
export const DownloadPage = ({}: TProps) => {

    const [downloadStatus, setDownloadStatus] = useState(DownloadStatus.IDLE);
    const [file, setFile] = useState<TFile>();
    const [progress, setProgress] = useState(0); /* Range 0-1 */
    const {loading, retrieveFile} = useFileRetrieval();
    const {downloadFile} = useFileDownload();
    const { downloadBlob } = useBlobDownload();
    const [blob, setBlob] = useState<Blob | null>(null);

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
                blob => {
                    setBlob(blob);
                    setDownloadStatus(DownloadStatus.READY_TO_DOWNLOAD);
                },
                ({ loaded, total }) => {
                    setDownloadStatus(DownloadStatus.DOWNLOADING);
                    const progress = +(loaded / total).toFixed(2);
                    setProgress(progress);
                },
                () => {
                    setDownloadStatus(DownloadStatus.DECODING);
                }
            );
        } catch (e) {
            alert(e);
            setDownloadStatus(DownloadStatus.IDLE);
        }
    }

    const onDownloadClick = () => {
        downloadBlob(blob, file.name);
    }
    
    return <>
        {downloadStatus === DownloadStatus.IDLE && <InsertUUID onUUIDSelected={onUUIDSelected} disabled={loading} />}
        {downloadStatus === DownloadStatus.FILE_INFO && <FileInfo file={file} onKeySelected={onKeySelected} />}
        {downloadStatus === DownloadStatus.DOWNLOADING && <DownloadProgress progress={progress * 100} />}
        {downloadStatus === DownloadStatus.DECODING && <DecodingProgress />}
        {downloadStatus === DownloadStatus.READY_TO_DOWNLOAD && <>
            <PageActionTitle>Ready!</PageActionTitle>
            <VerticalSpacer space={3} />
            <Button tertiary onClick={onDownloadClick} width={`240px`}>
                <span>Download</span>
            </Button>
        </>}
    </>
}

enum DownloadStatus {
    IDLE = 'idle',
    FILE_INFO = 'file-info',
    DOWNLOADING = 'downloading',
    DECODING = 'decoding',
    READY_TO_DOWNLOAD = 'ready-to-download'
}