import { houses } from "./getHouses";

export function getTimeoutString(timeout: string) {

    function hexToDate(hex: string): string {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            const charCode = parseInt(hex.slice(i, i + 2), 16);
            str += String.fromCharCode(charCode);
        }
        return str;
    }
    return hexToDate(timeout);
}

export const validParams = (house?: string, timeout?: string) => {
    if (house && house in houses && timeout) {
        const timeoutDate = new Date(`${getTimeoutString(timeout)} 13:00:00`);
        if (!isNaN(timeoutDate.getTime()) && (timeoutDate > new Date())) {
            return true;
        }
    }
    return false;
};
