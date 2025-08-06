import React from 'react';
import Image from 'next/image';
import { CartType, NotionResponse } from '@/types/menu';

type ItemCartProps = {
    data: NotionResponse;
    cart: CartType;
    handleAddCart: (item: NotionResponse) => void;
    handleRemoveCart: (name: string) => void;
};

export default function ItemCard({ data, cart, handleAddCart, handleRemoveCart }: ItemCartProps) {

    const name = data.properties.Name.title[0].plain_text;
    const restrictions = data.properties['Dietary Restrictions'].multi_select;
    const price = data.properties.Price.number;
    return (
        <div>
            {/* <Image src={data.properties.Image.files[0].file.url} width={200} height={200} alt={name} /> */}
            <Image src={'/images/menu/burgers.jpg'} width={200} height={200} alt='name' />
            <h1>{name}</h1>
            <div>{data.properties.Category.select.name}</div>
            <div>{price}</div>
            <div>{data.properties.Description.rich_text[0].plain_text}</div>
            <div>
                {restrictions && restrictions.map((restriction, index) => (
                    <span key={index}>{restriction.name}</span>
                ))}
            </div>
            <div>Amount: {cart[data.id]?.count ?? 0}</div>
            <button onClick={() => handleAddCart(data)}>Add to cart!</button>
            <button onClick={() => handleRemoveCart(data.id)}>Remove from cart!</button>

        </div>
    );
}
