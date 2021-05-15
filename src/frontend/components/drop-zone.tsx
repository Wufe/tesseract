import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { TRootState } from '../state/reducers/root-reducer';
import { OuterDropDiv, InnerDropDiv, DropFileSelector } from './ui/drop-page/drop-box';
import { ChevronDownIcon } from './ui/icons/chevron-down-icon';
import { CopyIcon } from './ui/icons/copy-icon';
import { InputFileIcon } from './ui/icons/input-file-icon';
import { VerticalSpacer } from './ui/spacer';

type TProps = {
    onFileSelected: (file: File) => void;
}
export const DropZone = ({ children, onFileSelected }: React.PropsWithChildren<TProps>) => {

    const fileSelectorText = useSelector<TRootState, string>(x => x.resources.fileSelector);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setSelectedFile(file)
        onFileSelected(file);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return <OuterDropDiv>
        <InnerDropDiv {...getRootProps()}>
            {selectedFile && <>
                <InputFileIcon />
                <VerticalSpacer space={1.5} />
                <span>{selectedFile.name}</span>
            </>}
            {!selectedFile && <>
                <DropFileSelector>
                    <div>
                        <CopyIcon />
                    </div>
                    <div>{fileSelectorText}</div>
                    <div>
                        <ChevronDownIcon />
                    </div>
                </DropFileSelector>
                <VerticalSpacer space={1.5} />
                <span>or drop files here</span>
            </>}
                
            
            <input {...getInputProps()} />
            {children}
        </InnerDropDiv>
    </OuterDropDiv>
}