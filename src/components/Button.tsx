import getButtonStyle from '@/utils/getButtonStyle';
import React from 'react';

export default function Button({ children, primary, buttonProps }: { children: React.ReactNode; primary: boolean; buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>; }) {

    const { className, style } = getButtonStyle(primary);

    return (
        <button {...buttonProps} className={className} style={style}>{children}</button>
    );
}
