'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Settings from './Settings';
import { useRouter } from 'next/navigation';
import { useLocalItem } from '@/hooks/useLocalItem';
import { houses } from '@/utils/getHouses';
import validSession from '@/utils/validSession';
import { getTimeoutString, validParams } from '@/utils/validParams';
import { UserType } from '@/types/user';
import { SearchParamsType } from '@/types/searchParams';

export default function Page() {
    const [user, setUser] = useState<UserType>({});
    const [details, setDetails] = useState<SearchParamsType>({});
    const [localUser, updateLocalUser] = useLocalItem<UserType | undefined>('client');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== undefined) {
            const readDetails = localStorage.getItem('details');
            if (readDetails) setDetails(JSON.parse(readDetails));
        }
    }, []);

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
        if (validParams(details.house, details.timeout)) {
            if (!(user?.name && user.phone)) {
                window.alert('Please fill out necessary information.');
                return;
            }
            updateLocalUser(user);
            router.push('/menu');
        } else window.alert('Invalid URL. Please ask for the new one from our staff.');
    };

    const handleCancel = () => {
        setUser({});
        router.push('/menu');
    };


    return (<>{validSession(details.house, details.timeout, localUser) ?
        <Settings /> :
        <div className='text-zinc-700 flex flex-col justify-center items-center h-screen'>
            <Image className='' src={'/images/interface/logo.svg'} height={128} width={128} alt='Baan Rai Khunya logo' />
            <h1 className='text-center text-4xl'><b>Sign in</b> ลงชื่อใช้งาน</h1>
            <form action={handleSubmit} className='mt-8'>
                <h3><b>Nickname</b> ชื่อเล่น</h3>
                <input onChange={handleChange} name='name' placeholder='Peter' type='text' className='rounded-full neumorphic-up px-4 py-2 min-w-64 my-2'>
                </input >
                <h3 className='mt-4'><b>Phone number</b> เบอร์โทรศัพท์</h3>
                <input onChange={handleChange} name='phone' placeholder='0912345678' type='tel' className='rounded-full neumorphic-up px-4 py-2 min-w-64 my-2'>
                </input >
            </form>
            <div className='my-6 neumorphic-down h-1 min-w-64'></div>
            <div className='rounded-sm neumorphic-up px-4 py-2 min-w-64 my-2'>House: <b>{details.house ? houses[details.house].en : "Unspecified"}</b></div>
            <div className='rounded-sm neumorphic-up px-4 py-2 min-w-64 my-2'>Checkout Date: <b>{details.timeout ? new Date(getTimeoutString(details.timeout)).toDateString() : "Unspecified"}</b></div>
            <div className="flex mt-8 gap-4 justify-end">
                <button className='bg-zinc-400 text-white px-6 py-2 rounded-full cursor-pointer' onClick={handleCancel}>Cancel</button>
                <button className='bg-lime-600 text-white px-6 py-2 rounded-full cursor-pointer' type='submit' onClick={handleSubmit}>Sign in</button>
            </div>
        </div>
    }
    </>);
}
