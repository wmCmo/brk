'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();
    const navIcons = [
        { index: 'home', target: '/' },
        { index: 'menu', target: '/menu' },
        { index: 'cart', target: '/menu/cart' },
        { index: 'history', target: '/menu/history' },
        { index: 'profile', target: '/menu/signin' }
    ];

    return (
        <div className="flex fixed bottom-0 justify-around h-20 bg-zinc-200 w-full rounded-t-md drop-shadow-2xl">
            {navIcons.map(({ index, target }) => {
                return (
                    <div key={index} className=''>
                        <Link href={target} className='h-full flex items-center'>
                            <div className={`${pathname === target ? 'bg-white' : ''} rounded-full h-13 w-13 flex justify-center items-center`}>
                                <Image style={index === 'cart' ? { width: 'auto' } : {}} src={`/images/interface/nav/${index}.svg`} height={index === 'cart' ? 52 : 32} width={index === 'cart' ? 52 : 32} alt={`${index}-icon`} />
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
