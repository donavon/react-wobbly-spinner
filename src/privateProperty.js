let map = new WeakMap();

export default function privateProperty(object) {
    if (!map.has(object)) {
        map.set(object, {});
    }
    return map.get(object);
}
