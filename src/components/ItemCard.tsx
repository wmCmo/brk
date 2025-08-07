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
    const description = data.properties.Description.rich_text[0].plain_text;
    return (
        <div className='flex mb-4 gap-2'>
            {/* <Image src={data.properties.Image.files[0].file.url} width={200} height={200} alt={name} /> */}
            <Image src={'/images/menu/burgers.jpg'} width={160} height={160} alt={description} className='rounded-full' />
            <div className='bg-white rounded-2xl p-2 grow flex flex-col items-center justify-around'>
                <h1 className='text-2xl text-center'>{description}</h1>
                <div className="flex gap-2">
                    <h2 className='text-center'>{name}</h2>
                    <h3 className='text-center'>THB <b>{price}</b></h3>
                </div>
                <div>
                    {restrictions && restrictions.map((restriction, index) => (
                        <span key={index}>{restriction.name}</span>
                    ))}
                </div>
                <div className='flex gap-2'>
                    <Image src={'/images/interface/minus.svg'} width={40} height={40} alt='remove from cart icon' onClick={() => handleRemoveCart(data.id)} />
                    <span className='text-2xl'>{cart[data.id]?.count ?? 0}</span>
                    <Image src={'/images/interface/plus.svg'} width={40} height={40} alt='add to cart icon' onClick={() => handleAddCart(data)} />
                </div>
            </div>

        </div>
    );
}
