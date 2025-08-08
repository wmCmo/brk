'use client';

import React, { useEffect } from 'react';

export default function Reset() {
    useEffect(() => { if (typeof window !== undefined) localStorage.setItem('client', '{}'); }, []);

    return (
        <div>Reset successfully</div>
    );
}
