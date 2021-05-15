import React from 'react';
import { TUploadedFileInfo } from '../use-upload';
import { Card } from '@/frontend/components/ui/card';
import { VerticalSpacer } from '../../ui/spacer';
import { TextBox } from '../../ui/text-box';
import { Button } from '../../ui/button';
import { UploadedFileIcon } from '../../ui/icons/uploaded-file-icon';
import { useClipboard } from './use-clibpoard';

type TProps = {
    fileInfo: TUploadedFileInfo;
};
export const FileUploaded = ({fileInfo}: TProps) => {

    const clipboardCopy = useClipboard();

    return <>
        <Card>
            <UploadedFileIcon />
            <VerticalSpacer space={1} />
            <span>{fileInfo.name}</span>
        </Card>
        <VerticalSpacer space={3} />
        <span>
            Your file id:
        </span>
        <VerticalSpacer space={1} />
        <TextBox>
            <span>{fileInfo.uuid}</span>
            <Button className="btn" width={`7.25rem`} height={`2.25rem`}
                onClick={() => clipboardCopy(fileInfo.uuid)}>
                <div>Copy</div>
            </Button>
        </TextBox>
        <VerticalSpacer space={3} />
        <span>
            Your encryption key:
        </span>
        <VerticalSpacer space={1} />
        <TextBox>
            <span>{fileInfo.key}</span>
            <Button className="btn" width={`7.25rem`} height={`2.25rem`}
                onClick={() => clipboardCopy(fileInfo.key)}>
                <div>Copy</div>
            </Button>
        </TextBox>
    </>
}