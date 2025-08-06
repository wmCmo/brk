import Image from 'next/image';
import React from 'react';

export default function Nav() {
    return (
        <div className='flex justify-between items-center py-5 px-5 bg-gray-100'>
            <div className='flex '>
                <div className='rounded-full bg-gray-200 p-2 w-12 h-12 flex items-center'>
                    <Image src='/images/interface/logo.svg' width={20} height={20} alt='brk-logo' />
                </div>
                <div className='text-2xl text-center md:text-left text-gray-500 font-medium tracking-tighter'>Baanraikhunya</div>
            </div>
            <Image src='/images/interface/list.svg' width={50} height={50} className='block md:hidden' alt='nav button' />
        </div>
    );
}
