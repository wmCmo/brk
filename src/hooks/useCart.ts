import { CartType } from "@/types/menu";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { NotionResponse } from "@/types/menu";

export default function useCart(): [CartType, Dispatch<SetStateAction<CartType>>, (item: NotionResponse) => void, (id: string) => void] {
    const [cart, setCart] = useState<CartType>(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : {};
        }
        return {};
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const handleAddCart = (item: NotionResponse) => {
        setCart(prevCart => ({
            ...prevCart,
            [item.id]: {
                th: item.properties.Name.title[0].plain_text,
                en: item.properties.Description.rich_text[0].plain_text,
                price: item.properties.Price.number,
                count: (prevCart[item.id]?.count || 0) + 1
            }
        }));
    };

    const handleRemoveCart = (id: string) => {
        setCart(prevCart => {
            if (prevCart[id]?.count > 1) {
                return {
                    ...prevCart,
                    [id]: {
                        ...prevCart[id],
                        count: prevCart[id].count - 1
                    }
                };
            }
            const newCart = { ...prevCart };
            delete newCart[id];
            return newCart;
        });
    };

    return [cart, setCart, handleAddCart, handleRemoveCart];
};