import { Button } from '@/frontend/components/ui/button';
import { DetailLabel, DetailsGrid } from '@/frontend/components/ui/details-grid';
import { VerticalSpacer } from '@/frontend/components/ui/spacer';
import { TextBox } from '@/frontend/components/ui/text-box';
import { TextInput } from '@/frontend/components/ui/text-input';
import { TFile } from '@/shared/types/file';
import React, { useState } from 'react';

type TProps = {
    file: TFile;
    onKeySelected: (key: string) => void;
};
export const FileInfo = ({file, onKeySelected}: TProps) => {

    const [key, setKey] = useState('');

    return <>
        <VerticalSpacer space={3} />
        <DetailsGrid>
            <DetailLabel>File id:</DetailLabel>
            <TextBox height={`1.875rem`} noWrap fontSize={`.875rem`}>{file.uuid}</TextBox>
            <DetailLabel>File name:</DetailLabel>
            <TextBox height={`1.875rem`} noWrap fontSize={`.875rem`}>{file.name}</TextBox>
            <DetailLabel>File size:</DetailLabel>
            <TextBox height={`1.875rem`} noWrap fontSize={`.875rem`}>{file.size}</TextBox>
            <DetailLabel>File mime:</DetailLabel>
            <TextBox height={`1.875rem`} noWrap fontSize={`.875rem`}>{file.mime}</TextBox>
        </DetailsGrid>
        <VerticalSpacer space={2.5} />
        <span>Insert your encryption key:</span>
        <VerticalSpacer space={1} />
        <TextInput width={`380px`} value={key} onChange={e => setKey(e.target.value)} />
        <VerticalSpacer space={2} />
        <Button tertiary width={`216px`} onClick={() => onKeySelected(key)}>
            <div>Decrypt and download</div>
        </Button>
    </>;
}