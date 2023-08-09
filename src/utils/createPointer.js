export function createPointer(userId) {
    return { __type: "Pointer", className: "_User", "objectId": userId };
}