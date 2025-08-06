'use client';

import { HistoryType } from '@/types/history';
import React from 'react';

export default function HistoryPage() {
  const history = JSON.parse(localStorage.getItem('history') || '{}');
  return (
    <>
      <h1>Order History</h1>
      <div>
        {history && history.map((item: HistoryType) => {
          return (
            <div key={item['ordered-date']}>
              <div>
                <p>{item['ordered-date']}</p>
                <p>Serve Time: {item['serve-time']}</p>
              </div>
              <div>
                {Object.entries(item.order).map((value) => {
                  return (
                    <div key={value[0]} className='grid grid-cols-4 justify-between'>
                      <div>
                        <strong>{value[1].en}</strong>
                        <p>{value[1].th}</p>
                      </div>
                      <div>THB {value[1].price}</div>
                      <div className='flex'>
                        <span>x{value[1].count}</span>
                      </div>
                      <div>THB {value[1].count * value[1].price}</div>
                    </div>
                  );
                })}
              </div>
              <div>
                <span>Total รวมยอด</span><span>THB {item.total}</span>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
}
