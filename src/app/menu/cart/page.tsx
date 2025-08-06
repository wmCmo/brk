'use client';

import React, { useState } from 'react';
import Greeting from '@/components/Greeting';
import useCart from '@/hooks/useCart';
import Button from '@/components/Button';
import { sendLineMessage } from '@/lib/sendLineMessage';
import { useRouter } from 'next/navigation';
import validSession from '@/utils/validSession';

export default function CartPage() {

  const [cart, setCart, , handleRemoveCart] = useCart();
  const [dateTime, setDateTime] = useState('');
  const [confirmOrder, setConfirmOrder] = useState(false);
  const router = useRouter();

  const handleAddCart = (key: string, value: { th: string, en: string, price: number, count: number; }) => {
    setCart(prevCart => ({
      ...prevCart,
      [key]: {
        th: value.th,
        en: value.en,
        price: value.price,
        count: prevCart[key].count + 1
      }
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const total = Object.values(cart).map(item => item.price * item.count).reduce((acc, val) => acc + val, 0);

  const sendMessage = async () => {
    const groupId = process.env.NEXT_PUBLIC_GROUP_ID;
    const details = JSON.parse(localStorage.getItem('details') || '');
    const client = JSON.parse(localStorage.getItem('client') || '');

    if (!validSession(details.house, details.timeout, client)) {
      window.alert('The session is not valid. Please ask for the URL from our staff');
      return;
    }

    const d = new Date(dateTime);

    if (isNaN(d.getTime())) {
      window.alert('Please select the serving time');
      return;
    }


    const year = d.getFullYear();
    const month = String(d.getMonth()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');

    if (Number(hour) < 12 || Number(hour) > 21) {
      window.alert('The selected time is outside the operation time');
      return;
    }

    if (Number(hour) === new Date().getHours()) {
      window.alert('Notice: The food will take approximately 1 hour to prepare');
    }

    if (groupId) {
      await sendLineMessage(groupId, [{
        type: 'text', text:
          `บ้าน ${details.house}\n` + `${client.name} ${client.phone}\n` + `${`${year}/${month}/${day} - ${hour}:${min}`}\n` + `------\n` + `${Object.entries(cart).map(item => `${item[1].th} = ${item[1].count}\n`).join('')}`
      }]);
    }


    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push({
      'ordered-date': new Date().toLocaleString(),
      'serve-time': d.toLocaleString(),
      order: cart,
      total: total,
      user: {
        name: client.name,
        house: details.house
      }
    });

    localStorage.setItem('history', JSON.stringify(history));
    router.push('/menu/history');
    localStorage.setItem('cart', '{}');
  };

  const setToNow = () => {
    const n = new Date();
    n.setHours(n.getHours() + 8);
    const now = n.toISOString().substring(0, 16);
    setDateTime(now);
  };


  return (
    <main className='relative'>
      {confirmOrder && <div className='z-1 bg-white/70 h-screen w-screen absolute flex justify-center items-center'>
        <div className='bg-white'>
          <p>Order <u>now</u>, confirm?</p>
          <div>
            <Button primary={false} buttonProps={{ onClick: () => setConfirmOrder(false) }}>Goback</Button>
            <Button primary={true} buttonProps={{ onClick: sendMessage }}>Order</Button>
          </div>
        </div>
      </div>}
      <Greeting />
      <h1>Order Confirmation</h1>
      <div>
        {cart && Object.entries(cart).map(([key, value]) => (
          <div key={key} className='grid grid-cols-4 justify-between'>
            <div>
              <strong>{value.en}</strong>
              <p>{value.th}</p>
            </div>
            <div>THB {value.price}</div>
            <div className='flex'>
              <span>x{value.count}</span>
              <div className='flex flex-col'>
                <button onClick={() => handleAddCart(key, value)}>Add one</button>
                <button onClick={() => handleRemoveCart(key)}>Remove one</button>
              </div>
            </div>
            <div>THB {value.count * value.price}</div>
          </div>
        ))}
      </div>
      <div className='flex'>
        <h2>Serving Time เวลาเสิร์ฟ</h2>
        <input type="datetime-local" name="date" id="date" value={dateTime} onChange={e => setDateTime(e.target.value)} className='bg-amber-50 text-blue-900' />
        <button onClick={setToNow}>NOW!🛎️</button>
      </div>
      <div className='flex'>
        <h3>Total รวมยอด</h3>
        <p>THB {total}</p>
      </div>
      <div className='flex'>
        <button onClick={() => router.push('/menu')}>Back to Menu</button>
        <Button primary={true} buttonProps={{ onClick: () => setConfirmOrder(true) }}>Order Now</Button>
      </div>
    </main >
  );
}
