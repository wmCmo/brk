'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LinkButton from './LinkButton';
import { validParams } from '@/utils/validParams';
import { useLocalItem } from '@/hooks/useLocalItem';
import { SearchParamsType } from '@/types/searchParams';
import { UserType } from '@/types/user';

export default function Greeting({ house, timeout }: SearchParamsType) {
    const details = useLocalItem('details');
    const [client, updateClient] = useLocalItem<UserType>('client');
    const [greeting, setGreeting] = useState('');
    const router = useRouter();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 4) {
            setGreeting('evening');
        }
        else if (3 < hour && hour < 12) {
            setGreeting('morning');
        } else if (hour < 17) {
            setGreeting('afternoon');
        } else {
            setGreeting('evening');
        }
    }, []);

    useEffect(() => {
        if (timeout && house && validParams(house, timeout)) {
            if (typeof window !== "undefined") {
                localStorage.setItem('details', JSON.stringify({ house, timeout }));
            }
        }
    }, [timeout, house]);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('client');
            localStorage.removeItem('login');
            localStorage.removeItem('history');
            localStorage.removeItem('details');
            updateClient({});
            router.push('/menu');
        }
    };

    return (
        <section className='flex justify-between items-center mt-8'>
            {
                client && client.name && client.phone ? (
                    <div>
                        <div className='flex gap-2 items-center'>
                            <h1 className='text-zinc-400 text-xl'>Good {greeting}</h1>
                            <span>⋅</span>
                            <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
                        </div>
                        <h2 className='text-lime-600 text-5xl font-extrabold mt-1'>{client.name}</h2>
                    </div>
                ) :
                    (
                        <div className='flex gap-2 items-center'>
                            <Image src='/images/interface/user.svg' height={36} width={36} alt='user-icon' />
                            <div>
                                <div className='flex gap-4 items-center'>
                                    <h1 className='text-zinc-400 font-semibold'>Guest Mode</h1>
                                    {details && validParams(house, timeout) && <LinkButton primary={true} target={'./menu/signin'}>Sign in</LinkButton>}
                                </div>
                                {!details || !validParams(house, timeout) && <span className=''>Please ask for the URL from our staff.</span>}
                            </div>
                        </div>
                    )
            }
            <Image src={'/images/interface/logo.svg'} width={64} height={64} alt='brk logo' />
        </section>
    );
}
