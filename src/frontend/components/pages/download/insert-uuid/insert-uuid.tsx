import React, { useState } from 'react';
import { Button } from '../../../ui/button';
import { VerticalSpacer } from '../../../ui/spacer';
import { TextInput } from '../../../ui/text-input';

type TProps = {
    disabled?: boolean;
    onUUIDSelected: (uuid: string) => void;
}
export const InsertUUID = ({
    disabled = false,
    onUUIDSelected,
}: TProps) => {

    const [uuid, setUUID] = useState('');

    return <>
        <VerticalSpacer space={3} />
        <span>Insert your file id:</span>
        <VerticalSpacer space={1.8} />
        <TextInput width={`19rem`} value={uuid} onChange={e => setUUID(e.target.value)} disabled={disabled} />
        <VerticalSpacer space={2.5} />
        <Button tertiary width={`13rem`} height={`3rem`} disabled={disabled} onClick={() => onUUIDSelected(uuid)}>
            <div>Get file</div>
        </Button>
    </>
}