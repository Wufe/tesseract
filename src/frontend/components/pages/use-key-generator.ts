export const useKeyGenerator = () => {
    const generateKey = () => {
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        let key = "";
        for (const x of array) {
            key += x.toString(16).toUpperCase();
        }
        return key;
    };

    return { generateKey };
}