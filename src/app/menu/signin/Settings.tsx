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
    <div>
      <h1>Settings แก้ไขข้อมูล</h1>
      <h3>Nickname ชื่อเล่น</h3>
      {!editName && <div>{client.name}</div>}
      {editName && <input type="text" name='name' value={client.name} onChange={handleChange} />}
      {!editName && <Image src={'/images/interface/edit.svg'} height={16} width={16} alt='minimal edit icon' onClick={() => setEditName(prev => !prev)} />}
      {editName && <Image src={'/images/interface/save.svg'} height={16} width={16} alt='minimal save icon' onClick={() => { setEditName(prev => !prev); localStorage.setItem('client', JSON.stringify(client)); }} />}
      <h3>Phone number เบอร์โทรศัพท์</h3>
      {!editPhone && <div>{client.phone}</div>}
      {editPhone && <input type="text" name='phone' value={client.phone} onChange={handleChange} />}
      {!editPhone && <Image src={'/images/interface/edit.svg'} height={16} width={16} alt='minimal edit icon' onClick={() => setEditPhone(prev => !prev)} />}
      {editPhone && <Image src={'/images/interface/save.svg'} height={16} width={16} alt='minimal edit icon' onClick={() => { setEditPhone(prev => !prev); localStorage.setItem('client', JSON.stringify(client)); }} />}
      <br />
      <div>House: <b>{details.house}</b></div>
      <div>Checkout date: <b>{getTimeoutString(details.timeout!)}</b></div>
    </div>
  );
}
