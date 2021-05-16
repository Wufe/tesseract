import { saveAs } from 'file-saver';

export const useBlobDownload = () => {

    const downloadBlob = (blob: Blob, name: string) => {
        const isChromeIOS = navigator.userAgent.match('CriOS');
        if (isChromeIOS) {
            const reader = new FileReader();
            reader.onload = () => {
                location.href = reader.result as string;
            }
            reader.readAsDataURL(blob);
        } else {
            saveAs(blob, name);
        }
    };

    return { downloadBlob };
}