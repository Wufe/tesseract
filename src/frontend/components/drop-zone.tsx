import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { OuterDropDiv, InnerDropDiv, DropFileSelector } from './ui/drop-page/drop-box';
import { ChevronDownIcon } from './ui/icons/chevron-down-icon';
import { CopyIcon } from './ui/icons/copy-icon';
import { VerticalSpacer } from './ui/spacer';

export const DropZone = ({ children }: React.PropsWithChildren<{}>) => {
    const onDrop = useCallback(acceptedFiles => {

    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return <OuterDropDiv>
        <InnerDropDiv {...getRootProps()}>
            <>
                <DropFileSelector>
                    <div>
                        <CopyIcon />
                    </div>
                    <div>`'..2$=%(+$&gt;</div>
                    <div>
                        <ChevronDownIcon />
                    </div>
                </DropFileSelector>
                <input {...getInputProps()} />
                <VerticalSpacer space={1} />
                <span>or drop files here</span>
            </>
            {children}
        </InnerDropDiv>
    </OuterDropDiv>
}