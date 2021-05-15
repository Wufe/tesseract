import { TRootState } from '@/frontend/state/reducers/root-reducer';
import React from 'react';
import { useSelector } from 'react-redux';
import { DropZone } from '../drop-zone';
import { Footer } from '../ui/footer';
import { PageSubtitle } from '../ui/page/page-subtitle';
import { VerticalSpacer } from '../ui/spacer';

export const DropPage = () => {

    const subtitle = useSelector<TRootState, string>(x => x.resources.subtitle);
    const footer = useSelector<TRootState, string>(x => x.resources.footer);

    return <>
        <PageSubtitle>{subtitle}</PageSubtitle>
        <VerticalSpacer space={3} />
        <DropZone></DropZone>
        <VerticalSpacer space={8} /> {/* Footer spacing */}
        <Footer>{footer}</Footer>
    </>
}