'use client';

import React from 'react';

export default function Reset() {

    localStorage.setItem('client', '{}');

    return (
        <div>Reset successfully</div>
    );
}
