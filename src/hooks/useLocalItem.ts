import { useEffect, useState} from "react";

export const useLocalItem = <T>(key: string): [T | undefined, (newValue: T) => void] => {
    const [value, setValue] = useState<T | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const details = localStorage.getItem(key);
            if (details) {
                setValue(JSON.parse(details));
            }
        }
    }, [key]);

    const updateLocalItem = (newValue: T) => {
        setValue(newValue);
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    };

    return [value, updateLocalItem];
};
