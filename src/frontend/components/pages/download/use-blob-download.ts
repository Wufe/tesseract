export const useBlobDownload = () => {

    const downloadBlob = (blob: Blob, name: string) => {
        const blobUrl = URL.createObjectURL(blob);

        const downloadAnchor = document.createElement('a');
        downloadAnchor.hidden = true;
        downloadAnchor.style.position = 'absolute';
        downloadAnchor.style.left = '-9999px';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.href = blobUrl;
        downloadAnchor.download = name;
        downloadAnchor.target = '_blank';
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
        URL.revokeObjectURL(blobUrl);
    };

    return { downloadBlob };
}