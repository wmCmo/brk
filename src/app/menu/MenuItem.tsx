'use client';

import { useState } from 'react';
import { NotionResponse } from '@/types/menu';
import ItemCard from '@/components/ItemCard';
import useCart from '@/hooks/useCart';

export default function MenuItem({ data }: { data: NotionResponse[]; }) {
    const [category, setCategory] = useState('must-try');
    const [cart, , handleAddCart, handleRemoveCart] = useCart();

    const categoryMenu = [
        { value: "appetizer", title: "กินเล่น ๆ  | Appetizer" },
        { value: "must-try", title: "แนะนำ | Must Try / Recommend" },
        { value: "main-dish", title: "อาหารจานหลัก | Main Dish" },
        { value: "a-la-carte", title: "อาหารจานเดียว | A La Carte" },
        { value: "vegetarian", title: "อาหารเพื่อสุขภาพ | Vegetarian Dish" },
        { value: "western", title: "อาหารสไตล์ตะวันตก | Western Style" },
        { value: "bbq", title: "ขุดหมูกระทะ | Special BBQ Set" },
        { value: "beverages", title: "เครื่องดื่ม | Beverages" },
        { value: "snack", title: "ขนมและของว่าง | Snack" }
    ];

    return (
        <section className='mt-8 pb-12'>
            <select className='text-xl bg-zinc-200 px-2 py-2 rounded-2xl font-semibold text-center' name="category" id="category" onChange={e => setCategory(e.target.value)} value={category}>
                {categoryMenu.map(item => <option value={item.value} className='rounded-2xl' key={item.value}>{item.title}</option>)}
            </select>
            <div className='mt-8'>
                {data.filter(item => item.properties.Category.select.name === category).map((item) => <ItemCard key={item.id} data={item} cart={cart} handleAddCart={handleAddCart} handleRemoveCart={handleRemoveCart} />)}
            </div>
        </section>
    );
}
