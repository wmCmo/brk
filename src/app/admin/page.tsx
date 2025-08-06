'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { houses } from '@/utils/getHouses';

export default function Page() {

    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [house, setHouse] = useState(Object.entries(houses)[0][0]);

    function stringToHex(str: string): string {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            hex += str.charCodeAt(i).toString(16).padStart(2, '0');
        }
        return hex.toUpperCase();
    }

    return (
        <>
            <input type="date" name="date" id="date" onChange={e => setDate(e.target.value)} className='bg-amber-50 text-blue-900' />
            <button onClick={() => setLink(stringToHex(date))}>Make Link</button>
            <Link href={`/menu?timeout=${link}&house=${house}`}>Go to site</Link>
            {link}
            <div>
                <label htmlFor="house">Choose House</label>
                <select name="house" id="house" onChange={(e) => setHouse(e.target.value)}>
                    {Object.entries(houses).map(([key, value]) => {
                        return <option value={key} className='bg-black' key={key}>{value.th}</option>;
                    })}
                </select>
            </div>
        </>
    );
}
