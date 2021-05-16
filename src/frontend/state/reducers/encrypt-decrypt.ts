export function encrypt(key: string, message: string): string {
    return encryptDecrypt(key, message, CipherMode.ENCRYPT);
}

export function decrypt(key: string, message: string): string {
    return encryptDecrypt(key, message, CipherMode.DECRYPT);
}

enum CipherMode {
    ENCRYPT,
    DECRYPT
}
const firstCharCode = 32;
const lastCharCode = 125;
const charCodesRange = lastCharCode + 1 - firstCharCode;
function encryptDecrypt(key: string, message: string, mode: CipherMode): string {
    // Split in chunks
    let chunks: string[] = [];
    const chunkSize = key.length;
    while (message.length) {
        chunks.push(message.slice(0, chunkSize));
        message = message.slice(chunkSize);
    }

    // Reverse each chunk
    chunks = chunks.map(chunk => {
        const chunkArray = chunk.split('');
        return chunkArray.reverse().join('');
    });

    // Get N number
    const N = key.split('').reduce<number>((n, c) => {
        return n + c.charCodeAt(0);
    }, 0);

    chunks = chunks.map(chunk => {
        return chunk.split('').map(c => {
            // Shift
            let asciiCode = c.charCodeAt(0) - firstCharCode;

            if (mode === CipherMode.ENCRYPT)
                asciiCode += N;
            else
                asciiCode -= N;

            asciiCode = asciiCode % charCodesRange + charCodesRange;

            // If negative
            asciiCode = asciiCode % charCodesRange;

            asciiCode += firstCharCode;

            return String.fromCharCode(asciiCode);
        }).join('');
    });

    // Reverse back
    chunks = chunks.map(chunk => {
        const chunkArray = chunk.split('');
        return chunkArray.reverse().join('');
    });

    return chunks.join('');
}