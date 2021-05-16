import { TFile } from '@/shared/types/file';
import React from 'react';
import { Button } from '../../ui/button';
import { PageActionTitle } from '../../ui/page/page-action-title';
import { VerticalSpacer } from '../../ui/spacer';
import { useBlobDownload } from './use-blob-download';

type TProps = {
    blob: Blob;
    file: TFile;
}
export const DownloadReady = ({blob, file}: TProps) => {

    const { downloadBlob } = useBlobDownload();

    const onDownloadClick = () => {
        downloadBlob(blob, file.name);
    }

    return <>
        <PageActionTitle>Ready!</PageActionTitle>
        <VerticalSpacer space={3} />
        <Button tertiary onClick={onDownloadClick} width={`240px`}>
            <span>Download</span>
        </Button>
    </>;
}