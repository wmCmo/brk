'use client';

import React, { useRef, useState } from 'react';
import { houses } from '@/utils/getHouses';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import * as htmlToImage from 'html-to-image';

export default function Page() {

    const [date, setDate] = useState('');
    const [house, setHouse] = useState(Object.entries(houses)[0][0]);
    const [clicked, setClicked] = useState(false);

    const domEl = useRef(null);

    function stringToHex(str: string): string {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            hex += str.charCodeAt(i).toString(16).padStart(2, '0');
        }
        return hex.toUpperCase();
    }

    const handleCheck = () => {
        if (!date) {
            window.alert('เลือกวันที่เช็คเอาท์');
            return false;
        }
        if (new Date(date) < new Date()) {
            window.alert('โปรดเลือกเวลาในอนาคต');
            return false;
        }
        if (!house) {
            window.alert('เลือกบ้านพัก');
            return false;
        }
        return true;
    };

    const handleCopy = () => {

        if (handleCheck()) {
            setClicked(true);
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/menu?timeout=${stringToHex(date)}&house=${house}`);
            setTimeout(() => {
                setClicked(false);
            }, 1000);
        }
    };

    const handleDownload = async () => {
        if (handleCheck()) {
            if (domEl.current) {
                try {
                    const dataUrl = await htmlToImage.toPng(domEl.current, {
                        quality: 1
                    });

                    const link = document.createElement('a');
                    link.download = `menu-qr-${house}-${date}.png`;
                    link.href = dataUrl;
                    link.click();
                } catch (error) {
                    console.error('Failed to convert HTML to image:', error);
                }
            }
        }
    };

    return (
        <div className='flex flex-col md:flex-row items-center md:justify-around bg-zinc-100 h-screen text-zinc-700'>
            <div className='flex gap-4 items-center'>
                <Image className={`${clicked ? 'animate-spin' : ''}`} src={'/images/interface/logo.svg'} width={128} height={128} alt='BRK logo' />
                <button className='neumorphic-up active:neumorphic-down px-4 py-2 my-4 font-bold rounded-md' onClick={handleCopy}>Copy Link</button>
                <button className='neumorphic-up active:neumorphic-down px-4 py-2 my-4 font-bold rounded-md' onClick={handleDownload}>Download QR</button>
            </div>
            <div className="grid grid-cols-2 items-center gap-y-4 mb-8">
                <label className='font-bold' htmlFor="date">Checkout Date</label>
                <input type="date" name="date" id="date" onChange={e => setDate(e.target.value)} className='neumorphic-up px-4 py-2 rounded-full' />
                <label className='font-bold' htmlFor="house">Choose House</label>
                <select className='neumorphic-up px-4 py-2 rounded-full' name="house" id="house" onChange={(e) => setHouse(e.target.value)}>
                    {Object.entries(houses).map(([key, value]) => {
                        return <option value={key} className='' key={key}>{value.th}</option>;
                    })}
                </select>
            </div>
            <div ref={domEl} className='relative'>
                <div className='absolute top-1/4 left-1/5'>
                    <QRCodeSVG className='' value={`${process.env.NEXT_PUBLIC_BASE_URL}/menu?timeout=${stringToHex(date)}&house=${house}`} size={240} fgColor="#52525C" bgColor='#ffffff' level='M' />
                    <Image className='absolute top-3/8 left-3/8' src={'/images/interface/logo-square.svg'} width={64} height={64} alt='Squre BRK logo' />
                </div>
                <Image className='rounded-xl' src={'/images/menu-template-mobile.png'} width={400} height={640} alt='QR code poster template' />
            </div>
        </div>
    );
}
