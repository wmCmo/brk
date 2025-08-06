'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Settings from './Settings';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useLocalItem } from '@/hooks/useLocalItem';
import { houses } from '@/utils/getHouses';
import validSession from '@/utils/validSession';
import { getTimeoutString, validParams } from '@/utils/validParams';
import { UserType } from '@/types/user';
import { SearchParamsType } from '@/types/searchParams';

export default function Page() {
    const [user, setUser] = useState<UserType | undefined>(undefined);
    const [localUser, updateLocalUser] = useLocalItem<UserType | undefined>('client');
    const [details, updateDetails] = useLocalItem<SearchParamsType | undefined>('details');
    const router = useRouter();
    let house = undefined;
    let timeout = undefined;
    if (details) {
        house = details.house as keyof typeof houses;
        timeout = details.timeout;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser(prevUser => {
            return {
                ...prevUser,
                [name]: value
            };
        });

    };

    const handleSubmit = () => {

        if (!(user?.name && user.phone)) {
            window.alert('Please fill out necessary information.');
        } else if (validParams(house, timeout)) {
            updateLocalUser(user);
            router.push('/menu');
        } else window.alert('Invalid order URL. Please ask for the new one from our staff.');
    };

    const handleCancel = () => {
        setUser(undefined);
        router.push('/menu');
    };


    return (<>{validSession(house, timeout, localUser) ?
        <Settings /> :
        <>
            <Image src={'/images/interface/logo.svg'} width={80} height={80} alt='logo' />
            <h1><b>Sign in</b> ลงชื่อใช้งาน</h1>
            <form action={handleSubmit}>
                <h3><b>Nickname</b> ชื่อเล่น</h3>
                <input onChange={handleChange} name='name' placeholder='Peter' type='text' style={{
                    'background': 'linear-gradient(135deg, #FFF 100%, #EAEAEA 0%)',
                    'borderRadius': '1.15863rem',
                }} className='px-4 py-2 text-zinc-800'>
                </input >
                <h3><b>Phone number</b> เบอร์โทรศัพท์</h3>
                <input onChange={handleChange} name='phone' placeholder='0912345678' type='tel' style={{
                    'background': 'linear-gradient(135deg, #FFF 100%, #EAEAEA 0%)',
                    'borderRadius': '1.15863rem',
                }} className='px-4 py-2 text-zinc-800'>
                </input >
                <Button primary={false} buttonProps={{ onClick: handleCancel }}>Cancel</Button>
                <Button primary={true} buttonProps={{ type: 'submit' }}>Sign in</Button>
            </form>

            <div>House: <b>{house ? houses[house].en : "Unspecified"}</b></div>
            <div>Checkout Date: <b>{timeout ? new Date(getTimeoutString(timeout)).toDateString() + " 13:00" : "Unspecified"}</b></div>
        </>
    }
    </>);
}
