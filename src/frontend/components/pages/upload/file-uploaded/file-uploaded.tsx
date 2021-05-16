import React from 'react';
import { TUploadedFileInfo } from '../use-upload';
import { Card } from '@/frontend/components/ui/card';
import { VerticalSpacer } from '@/frontend/components/ui/spacer';
import { TextBox } from '@/frontend/components/ui/text-box';
import { Button } from '@/frontend/components/ui/button';
import { UploadedFileIcon } from '@/frontend/components/ui/icons/uploaded-file-icon';
import { useClipboard } from './use-clibpoard';
import { Filename } from '@/frontend/components/ui/file-name';
import { useMediaQuery } from 'react-responsive';
import { CopyIcon } from '@/frontend/components/ui/icons/copy-icon';

type TProps = {
    fileInfo: TUploadedFileInfo;
};
export const FileUploaded = ({fileInfo}: TProps) => {

    const clipboardCopy = useClipboard();
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

    return <>
        <Card>
            <UploadedFileIcon />
            <VerticalSpacer space={1} />
            <Filename>{fileInfo.name}</Filename>
        </Card>
        <VerticalSpacer space={3} />
        <span>
            Your file id:
        </span>
        <VerticalSpacer space={1} />
        <TextBox>
            <span>{fileInfo.uuid}</span>
            {!isMobile && <Button className="btn" width={`7.25rem`} height={`2.25rem`}
                onClick={() => clipboardCopy(fileInfo.uuid)}>
                <div>Copy</div>
            </Button>}
        </TextBox>
        {isMobile && <>
            <VerticalSpacer space={1} />
            <Button className="btn" width={`7.25rem`} height={`2.25rem`}
                onClick={() => clipboardCopy(fileInfo.uuid)}>
                <div>Copy</div>
            </Button>
        </>}
        <VerticalSpacer space={isMobile ? 2 : 3} />
        <span>
            Your encryption key:
        </span>
        <VerticalSpacer space={1} />
        <TextBox>
            <span>{fileInfo.key}</span>
            {!isMobile && <Button className="btn" width={`7.25rem`} height={`2.25rem`}
                onClick={() => clipboardCopy(fileInfo.key)}>
                <div>Copy</div>
            </Button>}
        </TextBox>
        {isMobile && <>
            <VerticalSpacer space={1} />
            <Button className="btn" width={`7.25rem`} height={`2.25rem`}
                onClick={() => clipboardCopy(fileInfo.key)}>
                <div>Copy</div>
            </Button>
        </>}
    </>
}