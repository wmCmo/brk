import React from 'react';
import Link from 'next/link';
import getButtonStyle from '@/utils/getButtonStyle';


export default function LinkButton({ children, primary, target }: { children: React.ReactNode; primary: boolean; target: string; }) {

    const { className, style } = getButtonStyle(primary);

    return (
        <Link href={target} style={style} className={className}>{children}</Link>
    );
}
