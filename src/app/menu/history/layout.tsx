import React from 'react';

export default function HistoryLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className='text-zinc-700 bg-zinc-100'>
            {children}
        </div>
    );
}
