import { UserType } from "@/types/user";
import { validParams } from "./validParams";

export default function validSession(house?: string, timeout?: string, localUser?: UserType) {
    return Boolean(
        house &&
        localUser &&
        Object.keys(localUser).length > 0 &&
        validParams(house, timeout)
    );
}

