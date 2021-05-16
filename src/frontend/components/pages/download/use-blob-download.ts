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
        
        // const blobUrl = URL.createObjectURL(blob);

        // const downloadAnchor = document.createElement('a');
        // downloadAnchor.hidden = true;
        // downloadAnchor.style.position = 'absolute';
        // downloadAnchor.style.left = '-9999px';
        // document.body.appendChild(downloadAnchor);
        // downloadAnchor.href = blobUrl;
        // downloadAnchor.download = name;
        // downloadAnchor.target = '_blank';
        // downloadAnchor.click();
        // document.body.removeChild(downloadAnchor);
        // URL.revokeObjectURL(blobUrl);
    };

    return { downloadBlob };
}