export function orderBy(array, values?) {
    if (values) {
        return array.sort((a, b) => a[values.a] - b[values.b]);
    } else {
        return array.sort((a, b) => a - b);
    }
}
