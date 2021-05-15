import React, { useCallback, useEffect, useState } from 'react';
import { EncodingProgress } from './encoding-progress/encoding-progress';
import { FileSelection } from './file-selection/file-selection';
import { FileUploaded } from './file-uploaded/file-uploaded';
import { UploadProgress } from './upload-progress/upload-progress';
import { TUploadedFileInfo, useUpload } from './use-upload';

export const UploadPage = () => {

    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState(UploadStatus.IDLE);
    const [uploadedFileInfo, setUploadedFileInfo] = useState<TUploadedFileInfo | null>(null);
    const [ progress, setProgress ] = useState(0); /* Range: 0-1 */
    const { uploadFile, abortUpload } = useUpload();

    const onUploadClick = useCallback(async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            const result = await uploadFile(
                selectedFile,
                () => setUploadStatus(UploadStatus.ENCODING),
                ({ loaded, total }) => {
                    setUploadStatus(UploadStatus.UPLOADING);
                    const progress = +(loaded / total).toFixed(2);
                    setProgress(progress);
                }
            );
            setUploadedFileInfo(result);
            setUploadStatus(UploadStatus.COMPLETED);
        } catch (e) {
            console.error(e);
            setUploadStatus(UploadStatus.FAILED);
        } finally {
            
        }
    }, [selectedFile]);

    const onFileSelected = (file: File) => {
        setProgress(0);
        setSelectedFile(file);
    };

    useEffect(() => {
        // On page switch, abort upload request
        return abortUpload;
    }, []);

    return <>
        {uploadStatus === UploadStatus.IDLE && <FileSelection
            onFileSelected={onFileSelected}
            onUploadClick={onUploadClick} />}
        {uploadStatus === UploadStatus.ENCODING && <EncodingProgress />}
        {uploadStatus === UploadStatus.UPLOADING && <UploadProgress progress={progress} />}
        {uploadStatus === UploadStatus.COMPLETED && <FileUploaded fileInfo={uploadedFileInfo} />}
    </>;
}

enum UploadStatus {
    IDLE      = 'idle',
    ENCODING  = 'encoding',
    UPLOADING = 'uploading',
    COMPLETED = 'completed',
    FAILED    = 'failed',
}