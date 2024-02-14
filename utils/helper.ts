export function getNumber(text: string): string {
    return text.replace(/[^0-9]/g, '').split(" ")[0];
}

export const WAITING_300_MS = 300;
