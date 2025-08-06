import { houses } from "@/utils/getHouses";

export type SearchParamsType = { timeout?: string; house?: keyof typeof houses; }; 