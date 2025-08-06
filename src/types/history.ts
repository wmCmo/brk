import { CartType } from "./menu";

export type HistoryType = {
    'ordered-date': string,
    'serve-time': string,
    order: CartType,
    total: number,
    user: {
        name: string,
        house: string;
    };
};