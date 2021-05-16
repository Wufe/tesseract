export const useKeyGenerator = () => {
    const generateKey = () => {
        const array = new Uint8Array(16);
        window.crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array));
    };

    return { generateKey };
}