import { TFile } from "@/shared/types/file";
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

    const uploadFile = async (
        file: File,
        onEncodingStarted?: () => void,
        onProgress?: ({ loaded, total }: { loaded: number, total: number }) => void,
    ): Promise<TUploadResult> => {
        if (!file)
            return; /* No file selected */
        if (busy.current)
            return; /* Another request is pending */

        busy.current = true;

        // Generating random key
        const key = await generateKey();

        // Encoding the file
        if (onEncodingStarted)
            onEncodingStarted();
        let encodedBlob: Blob;
        try {
            encodedBlob = await encode(file, key);
        } catch (e) {
            busy.current = false;
            return Promise.reject(e);
        }

        // Binary if browser does not recognize mime type
        const mime = file.type || 'binary';

        // Uploading the chunk
        const form = new FormData();

        form.append('original-mime', mime);
        form.append('filename', file.name);
        form.append('size', `${file.size}`);
        form.append('encoded-bytes', `${encodedBlob.size}`);
        form.append('file', encodedBlob, file.name);

        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', ({ loaded, total}) => {
            if (onProgress)
                onProgress({ loaded, total });
        });
        xhr.open('POST', `/api/v1/files`, true);

        return new Promise<TUploadResult>((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        const {uuid} = JSON.parse(xhr.responseText) as TFile;
                        resolve({
                            uuid,
                            key,
                            name: file.name,
                            mime,
                        });
                    } catch {
                        // Could not parse response. Malformed output
                        reject('Malformed server response')
                    }
                    
                    busy.current = false;
                }
            }
            xhr.onerror = e => {
                reject(`Network error`);
                busy.current = false;
            }
            xhr.send(form);
        })
        
    }

    return { uploadFile, abortUpload };
}

export type TUploadResult = TUploadedFileInfo;

export type TUploadedFileInfo = {
    uuid: string;
    key : string;
    name: string;
    mime: string;
}