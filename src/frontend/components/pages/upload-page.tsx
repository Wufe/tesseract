import { TRootState } from '@/frontend/state/reducers/root-reducer';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DropZone } from '../drop-zone';
import { Button } from '../ui/button';
import { ButtonsContainer } from '../ui/drop-page/buttons-container';
import { Footer } from '../ui/footer';
import { PageSubtitle } from '../ui/page/page-subtitle';
import { VerticalSpacer } from '../ui/spacer';
import { useUpload } from './use-upload';

export const UploadPage = () => {

    const subtitle = useSelector<TRootState, string>(x => x.resources.subtitle);
    const footer = useSelector<TRootState, string>(x => x.resources.footer);

    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    const { uploadFile, abortUpload } = useUpload();

    const onUploadClick = async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            await uploadFile(selectedFile);
        } catch (e) {
            console.error(e);
        }
    };

    const onFileSelected = (file: File) => {
        setSelectedFile(file);
    };

    useEffect(() => {
        // On page switch, abort upload request
        return abortUpload;
    }, []);

    return <>
        <PageSubtitle>{subtitle}</PageSubtitle>
        <VerticalSpacer space={3} />
        <DropZone onFileSelected={onFileSelected} />
        <VerticalSpacer space={3} />
        <ButtonsContainer>
            <Button>
                <a href="#" onClick={onUploadClick}>Encrypt and upload</a>
            </Button>
            <Button secondary>
                <Link to="/decrypt">Download and decrypt</Link>
            </Button>
        </ButtonsContainer>
        <VerticalSpacer space={8} /> {/* Footer spacing */}
        <Footer>{footer}</Footer>
    </>
}