export function generateID(prefix?) {
    if (prefix) {
        return prefix + Date.now() + Math.random().toFixed(0);
    } else {
        return Date.now() + Math.random().toFixed(0);
    }
}
