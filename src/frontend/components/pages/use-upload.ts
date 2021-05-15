import { useRef } from "react"
import { useBlobEncoder } from "./use-blob-encoder";
import { useKeyGenerator } from "./use-key-generator";

export const useUpload = () => {

    const uploadXhrRef = useRef<XMLHttpRequest | null>(null);
    const busy = useRef<boolean>(false);

    const { generateKey } = useKeyGenerator();
    const { encode } = useBlobEncoder();

    const abortUpload = () => {
        if (!uploadXhrRef.current)
            return; /* No need to abort a request */
        uploadXhrRef.current.abort();
        uploadXhrRef.current = null;
    }

    const uploadFile = async (file: File): Promise<TUploadResult> => {
        if (!file)
            return; /* No file selected */
        if (busy.current)
            return; /* Another request is pending */

        busy.current = true;

        // Generating random key
        const key = generateKey();
        console.log('started encoding');

        // Encoding the file
        let encodedBlob: Blob;
        try {
            encodedBlob = await encode(file, key);
        } catch (e) {
            busy.current = false;
            return Promise.reject(e);
        }
        
        console.log('finished encoding');

        // Uploading the chunk
        const form = new FormData();
        form.append('original-mime', file.type || 'binary' /* Binary if browser does not recognize mime type */);
        form.append('file', encodedBlob, file.name);

        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', ({ lengthComputable, loaded, total}) => {
            // TODO:
            console.log({ loaded, total });
        });
        xhr.open('POST', `/v1/files`, true);

        console.log('upload started');
        return new Promise<TUploadResult>((resolve, reject) => {
            xhr.onloadend = () => {
                resolve({
                    resultType: UploadResultType.SUCCESS,
                    key,
                });
                busy.current = false;
                console.log('upload finished successfully')
            }
            xhr.onerror = e => {
                resolve({
                    resultType: UploadResultType.FAILURE,
                    reason: `Network error`
                });
                busy.current = false;
                console.log('upload finished with error');
            }
            xhr.send(form);
        })
        
    }

    return { uploadFile, abortUpload };
}

export enum UploadResultType {
    SUCCESS = 'success',
    FAILURE = 'failure',
}
export type TUploadResult = {
    resultType: UploadResultType.SUCCESS;
    key: string;
} | {
    resultType: UploadResultType.FAILURE;
    reason: string;
};