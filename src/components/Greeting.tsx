'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from './Button';
import LinkButton from './LinkButton';
import { validParams } from '@/utils/validParams';
import { useLocalItem } from '@/hooks/useLocalItem';
import { SearchParamsType } from '@/types/searchParams';
import { UserType } from '@/types/user';

export default function Greeting({ house, timeout }: SearchParamsType) {
    const details = useLocalItem('details');
    const [client, updateClient] = useLocalItem<UserType | undefined>('client');
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
            updateClient(undefined);
            router.push('/menu');
        }
    };

    return (
        <>
            {
                client && client.name && client.phone ? (
                    <div>
                        <h1>Good {greeting}</h1>
                        <h2>{client.name}</h2>
                        <Button primary={false} buttonProps={{ onClick: handleLogout }}>Logout</Button>
                        {house}
                        {timeout}
                    </div>
                ) :
                    (
                        <div>
                            <Image src='/images/interface/user.svg' height={28} width={28} alt='user-icon' />
                            <h1>Guest Mode</h1>
                            {
                                details && validParams(house, timeout) ? (
                                    <LinkButton primary={true} target={'./menu/signin'}>Sign in</LinkButton>
                                ) : (
                                    <span>Please ask our staff for order URL</span>
                                )
                            }
                        </div>
                    )
            }
        </>
    );
}
