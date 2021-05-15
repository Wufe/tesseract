import React from 'react';
import { PageActionTitle } from '../../ui/page/page-action-title';
import { ProgressBar } from '../../ui/progress-bar';
import { VerticalSpacer } from '../../ui/spacer';

type TProps = {
    progress: number; /* Range 0.1 */
}
export const UploadProgress = ({ progress }: React.PropsWithChildren<TProps>) => {
    return <>
        <PageActionTitle>Upload in progress ..</PageActionTitle>
        <VerticalSpacer space={3} />
        <ProgressBar percentage={progress * 100} />
    </>;
}