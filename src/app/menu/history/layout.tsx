import React from 'react';

export default function HistoryLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className='text-zinc-800 bg-zinc-100'>
            {children}
        </div>
    );
}
