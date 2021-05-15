export const useBlobEncoder = () => {

    const encode = async (blob: Blob, passphrase: string): Promise<Blob> => {
        const plainTextBytes = new Uint8Array(await blob.arrayBuffer());
        const pbkdf2Iterations = 10000;
        const passphraseBytes = new TextEncoder().encode(passphrase);
        const pbkdf2Salt = window.crypto.getRandomValues(new Uint8Array(8));

        const passphraseKey = await window.crypto.subtle.importKey('raw', passphraseBytes, { name: 'PBKDF2' }, false, ['deriveBits']);
        const pbkdf2Bytes = new Uint8Array(await window.crypto.subtle.deriveBits({ name: 'PBKDF2', salt: pbkdf2Salt, iterations: pbkdf2Iterations, hash: 'SHA-256' }, passphraseKey, 384));
        const keyBytes = pbkdf2Bytes.slice(0, 32);
        const ivBytes = pbkdf2Bytes.slice(32);

        const key = await window.crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC', length: 256 }, false, ['encrypt']);

        const cipherBytes = new Uint8Array(await window.crypto.subtle.encrypt({ name: 'AES-CBC', iv: ivBytes }, key, plainTextBytes));

        const resultBytes = new Uint8Array(cipherBytes.length + 16);
        resultBytes.set(new TextEncoder().encode('Salted__'));
        resultBytes.set(pbkdf2Salt, 8);
        resultBytes.set(cipherBytes, 16);

        return new Blob([resultBytes]);
    }

    return {
        encode
    }
}