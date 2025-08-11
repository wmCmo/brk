'use client';

import Greeting from '@/components/Greeting';
import { HistoryType } from '@/types/history';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro'
});

export default function HistoryPage() {

  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const readHistory = localStorage.getItem('history');
      if (readHistory) setHistory(JSON.parse(readHistory));
    }
  }, []);

  return (
    <div className='p-4 pb-32 bg-zinc-100'>
      <Greeting />
      <div className="flex items-center mt-8">
        <h1 className='text-3xl font-bold'>Order History</h1>
        <Image src={'/images/interface/leaves.svg'} height={20} width={20} alt='minimal leaves icon for decoration' />
      </div>
      <div className='mt-4'>
        {history && history.map((item: HistoryType) => {
          return (
            <div key={item['ordered-date']}>
              <div className="flex">
                <div className={`bg-white rounded-md pl-4 pr-8 py-2`}>
                  <div className='flex gap-2'>
                    <Image src={'/images/interface/calendar.svg'} height={24} width={24} alt='minimal calendar icon' />
                    <p><b>Order Time:</b> <span className={`${sourceCodePro.className}`}>{item['ordered-date']}</span></p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Image src={'/images/interface/nav/history.svg'} height={24} width={24} alt='minimal clock icon' style={{ fill: '#ffffff' }} />
                    <p className=''><b>Serve Time:</b> <span className={`${sourceCodePro.className}`}>{item['serve-time']}</span></p>
                  </div>
                </div>
              </div>
              <div className='bg-white rounded-md mt-4 p-4'>
                {Object.entries(item.order).map((value) => {
                  return (
                    <div key={value[0]} className='mb-4'>
                      <strong>{value[1].en}</strong>
                      <p>{value[1].th}</p>
                      <div key={value[0]} className='grid grid-cols-3 justify-between'>
                        <div>THB {value[1].price}</div>
                        <span className='text-right'>x{value[1].count}</span>
                        <div className='font-semibold text-right'>THB {value[1].count * value[1].price}</div>
                      </div>
                    </div>
                  );
                })}
                <div className='mt-8 flex justify-between text-xl'>
                  <p>Total รวมยอด</p><p className='font-bold'>THB {item.total}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <hr className='border-1 border-zinc-200 my-8 w-1/2' />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Image src={'/images/interface/shop-illustration.svg'} height={128} width={128} alt='illustration of a woman doing online shopping' />
      </div>
    </div>
  );
}
