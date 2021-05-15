import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { TRootState } from '../state/reducers/root-reducer';
import { OuterDropDiv, InnerDropDiv, DropFileSelector } from './ui/drop-page/drop-box';
import { ChevronDownIcon } from './ui/icons/chevron-down-icon';
import { CopyIcon } from './ui/icons/copy-icon';
import { VerticalSpacer } from './ui/spacer';

export const DropZone = ({ children }: React.PropsWithChildren<{}>) => {

    const fileSelectorText = useSelector<TRootState, string>(x => x.resources.fileSelector);

    const onDrop = useCallback(acceptedFiles => {
        console.log('here')
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return <OuterDropDiv>
        <InnerDropDiv {...getRootProps()}>
            <>
                <DropFileSelector>
                    <div>
                        <CopyIcon />
                    </div>
                    <div>{fileSelectorText}</div>
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