
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from 'react'


export default function Page() {
    const router = useRouter();

    const containerStyle = {
        backgroundImage: `url('/homepage.png')`,
        backgroundSize: 'cover',
        height: '100vh', // Set the height as needed
        width: '62%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "19%"
    }
    return (
        // <div className="justify-center h-screen p-3 text-white ">
        <>
            <Link href="/lesson">

                <div style={containerStyle}>


                </div>
            </Link>
        </>
    );
}
