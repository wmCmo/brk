'use client';

import { SearchParamsType } from '@/types/searchParams';
import { UserType } from '@/types/user';
import { getTimeoutString } from '@/utils/validParams';
import React, { useState } from 'react';
import Image from 'next/image';


export default function Settings() {
  const [client, setClient] = useState<UserType>(JSON.parse(localStorage.getItem('client')!));
  const details: SearchParamsType = JSON.parse(localStorage.getItem('details')!);
  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient(prev => {
      return {
        ...prev,
        [e.target.name]: [e.target.value]
      };
    });
  };

  return (
    <div className='text-zinc-700 relativei'>
      <Image className='absolute top-0 left-0' src={'/images/interface/big-leaves.svg'} height={32} width={32} style={{ width: "auto" }} alt='big leaves minimal icon' />
      <div className="pt-12 flex justify-center">
        <Image className='' src={'/images/interface/logo.svg'} height={128} width={128} alt='Baan Rai Khunya logo' />
      </div>
      <h1 className='text-center text-4xl'><b>Settings</b> แก้ไขข้อมูล</h1>
      <div className="flex justify-center mt-4">
        <div className='flex flex-col'>
          <h3 className=''><b>Nickname</b> ชื่อเล่น</h3>
          <div className='rounded-full neumorphic-up flex justify-between px-4 py-2 min-w-64 my-2'>
            {!editName && <div className=''>{client.name}</div>}
            {!editName && <Image className='' src={'/images/interface/edit.svg'} height={16} width={16} alt='minimal edit icon' onClick={() => setEditName(prev => !prev)} />}
            {editName && <input type="text" name='name' value={client.name} onChange={handleChange} />}
            {editName && <Image src={'/images/interface/save.svg'} height={16} width={16} alt='minimal save icon' onClick={() => { setEditName(prev => !prev); localStorage.setItem('client', JSON.stringify(client)); }} />}
          </div>
          <h3 className='mt-2'><b>Phone number</b> เบอร์โทรศัพท์</h3>
          <div className='rounded-full neumorphic-up flex justify-between px-4 py-2 min-w-64 my-2'>
            {!editPhone && <div>{client.phone}</div>}
            {editPhone && <input type="text" name='phone' value={client.phone} onChange={handleChange} />}
            {!editPhone && <Image src={'/images/interface/edit.svg'} height={16} width={16} alt='minimal edit icon' onClick={() => setEditPhone(prev => !prev)} />}
            {editPhone && <Image src={'/images/interface/save.svg'} height={16} width={16} alt='minimal edit icon' onClick={() => { setEditPhone(prev => !prev); localStorage.setItem('client', JSON.stringify(client)); }} />}
          </div>
          <div className='my-4 neumorphic-down h-1'></div>
          <div className='rounded-sm neumorphic-up px-4 py-2 min-w-64 my-2'>House: <b>{details.house}</b></div>
          <div className='rounded-sm neumorphic-up px-4 py-2 min-w-64 my-2'>Checkout date: <b>{getTimeoutString(details.timeout!)}</b></div>
        </div>
      </div>
    </div>
  );
}
