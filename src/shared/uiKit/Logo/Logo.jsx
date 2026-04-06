'use client';
import Link from 'next/link';

export const Logo = () => {
    
    const onClick = (e) => {
        e.stopPropagation();
        console.log('click');
    };

    return (
        <Link onClick={onClick} href="/" >
            <img src="/deeplays_logo.svg" alt="logo" />
        </Link>
    );
};