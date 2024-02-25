"use client"
import { createDoc } from '@/temp/(old)createDoc';
import { useEffect } from 'react';

const page = () => {
    useEffect(() => {
        createDoc("container");
    }, []);

    // createDoc("container");

    return (
        <div id="container">
                
        </div>
    )
}



export default page