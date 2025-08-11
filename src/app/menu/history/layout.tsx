import React from 'react';

export default function HistoryLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className='h-screen text-zinc-800'>
            {children}
        </div>
    );
}
