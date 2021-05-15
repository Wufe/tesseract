import { PageActionTitle } from '@/frontend/components/ui/page/page-action-title';
import { ProgressBar } from '@/frontend/components/ui/progress-bar';
import { VerticalSpacer } from '@/frontend/components/ui/spacer';
import React from 'react';

type TProps = {
    progress: number;
}
export const DownloadProgress = ({ progress }: React.PropsWithChildren<TProps>) => {
    return <>
        <PageActionTitle>Download in progress ..</PageActionTitle>
        <VerticalSpacer space={3} />
        <ProgressBar percentage={progress * 100} />
    </>;
}