import { TRootState } from '@/frontend/state/reducers/root-reducer';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DropZone } from '../../drop-zone';
import { Button } from '../../ui/button';
import { ButtonsContainer } from '../../ui/drop-page/buttons-container';
import { Footer } from '../../ui/footer';
import { PageSubtitle } from '../../ui/page/page-subtitle';
import { VerticalSpacer } from '../../ui/spacer';

type TProps = {
    onFileSelected: (file: File) => void;
    onUploadClick: (event: React.MouseEvent) => void;
}
export const FileSelection = ({ onFileSelected, onUploadClick }: React.PropsWithChildren<TProps>) => {
    const subtitle = useSelector<TRootState, string>(x => x.resources.subtitle);

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
    </>
}