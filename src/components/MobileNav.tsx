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
        <div className="flex sticky bottom-0 justify-around h-20 bg-zinc-200 w-full rounded-t-md">
            {navIcons.map(({ index, target }) => {
                console.log(pathname === target);
                return (
                    <div key={index} className=''>
                        <Link href={target} className='h-full flex items-center'>
                            <div style={{ color: pathname === target ? '#5EA500' : '#9F9FA9' }}>
                                <Image style={index === 'cart' ? { width: 'auto' } : {}} src={`/images/interface/nav/${index}.svg`} height={index === 'cart' ? 52 : 32} width={index === 'cart' ? 52 : 32} alt={`${index}-icon`} />
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
