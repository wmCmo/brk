'use client';

import React, { useEffect, useState } from 'react';
import Greeting from '@/components/Greeting';
import useCart from '@/hooks/useCart';
import Button from '@/components/Button';
import { sendLineMessage } from '@/lib/sendLineMessage';
import { useRouter } from 'next/navigation';
import validSession from '@/utils/validSession';
import { getTimeoutString } from '@/utils/validParams';
import { SearchParamsType } from '@/types/searchParams';
import Image from 'next/image';

export default function CartPage() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const pad = (n: number) => String(n).padStart(2, '0');
  const localValue = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const [cart, setCart, , handleRemoveCart] = useCart();
  const [dateTime, setDateTime] = useState(localValue);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [details, setDetails] = useState<SearchParamsType>({});
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      const readDetails = localStorage.getItem('details');
      if (readDetails) setDetails(JSON.parse(readDetails));
    }
  }, []);

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
    const client = JSON.parse(localStorage.getItem('client') || '{}');

    if (!validSession(details.house, details.timeout, client)) {
      window.alert('The session is not valid. Please ask for the URL from our staff');
      return;
    }

    if (Object.keys(cart).length === 0) {
      window.alert('You cannot order zero item.');
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

    if (!details.timeout) {
      window.alert('Invalid section: Please ask our staff for the URL');
      return;
    } else {
      const timeoutString = getTimeoutString(details.timeout);
      if (d < new Date() || d > new Date(timeoutString + 'T14:00')) {
        window.alert('Please select a valid date');
        return;
      }
    }

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

  const handleDeleteItem = (key: string) => {
    const newCart = { ...cart };
    delete newCart[key];
    setCart(newCart);
  };

  return (
    <main className='relative text-zinc-700 pb-40'>
      {confirmOrder && <div className='z-1 bg-white/70 h-full w-screen absolute flex justify-center items-center text-center' onClick={() => setConfirmOrder(false)}>
        <div className='bg-white shadow-2xl p-8 rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <p className='font-bold'>Order <u>now</u>, confirm?</p>
          <p className='text-center'>Serving Time: {new Date(dateTime).toLocaleString()}</p>
          <div className='mt-4 flex gap-2 justify-center'>
            <Button primary={false} buttonProps={{ onClick: () => setConfirmOrder(false) }}>Goback</Button>
            <Button primary={true} buttonProps={{ onClick: sendMessage, className: "ml-4" }}>Order</Button>
          </div>
        </div>
      </div>}
      <div className="px-4">
        <Greeting />
        <div className='flex mt-8'>
          <h1 className='text-3xl font-bold'>Order Confirmation</h1>
          <Image src={'/images/interface/leaves.svg'} height={20} width={20} style={{ width: "auto" }} alt='minimal leaves illustration' />
        </div>
        <div className='mt-4'>
          {cart && Object.entries(cart).map(([key, value]) => (
            <div key={key} className='mt-8'>
              <strong>{value.en}</strong>
              <p>{value.th}</p>
              <div className='grid grid-cols-[1fr_1fr_1fr_auto] mt-2'>
                <div className=''>THB {value.price}</div>
                <div className='flex items-center gap-1'>
                  <Image className='cursor-pointer' src={'/images/interface/minus.svg'} height={28} width={28} style={{ height: "auto" }} alt='remove from cart minimal minus icon' onClick={() => handleRemoveCart(key)} />
                  <span><b>x{value.count}</b></span>
                  <Image className='cursor-pointer' src={'/images/interface/plus.svg'} height={28} width={28} style={{ height: "auto" }} alt='add to cart minimal plus icon' onClick={() => handleAddCart(key, value)} />
                </div>
                <div className=''><u><b>THB {(value.count * value.price).toLocaleString()}</b></u></div>
                <Image className='justify-self-end cursor-pointer' src={'/images/interface/trash.svg'} height={24} width={24} alt='minimal trashcan icon' onClick={() => handleDeleteItem(key)} />
              </div>
            </div>
          ))}
        </div>
        <h2 className='mt-12 text-lg'><b>Select Serving Time</b> เลือกเวลาเสิร์ฟ</h2>
        <div className='flex gap-2 mt-1'>
          <input type="datetime-local" name="date" id="date" value={localValue} onChange={e => setDateTime(e.target.value)} className='rounded-xl border-zinc-300 border-2 px-2 py-1' />
          <button onClick={setToNow} className='bg-white px-2 rounded-xl cursor-pointer'>NOW!🛎️</button>
        </div>
        <div className='flex justify-between mt-8'>
          <h3 className='text-2xl font-semibold'>Total รวมยอด</h3>
          <p className='text-3xl'>THB {total.toLocaleString()}</p>
        </div>
        <div className='mt-8 flex justify-between'>
          <div className="flex cursor-pointer" onClick={() => router.push('/menu')}>
            <Image src={'/images/interface/arrow-back.svg'} height={20} width={20} style={{ height: "auto" }} alt='arrow back icon' />
            <button className='cursor-pointer text-zinc-500'>Back to Menu</button>
          </div>
          <button className='p-4 rounded-md bg-lime-600 text-white text-xl' onClick={() => setConfirmOrder(true)}><b>Order Now</b></button>
        </div>
      </div>
    </main >
  );
}
