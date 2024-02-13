export function getNumber(text: string) {
    return text.replace(/[^0-9]/g, '').split(" ")[0];
}
