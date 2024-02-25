"use client"
import { useEffect, useReducer, useState } from "react"
import ReactModal from "react-modal";
import { findDoc } from "@/temp/(old)db/findDoc";

const Doc = ({docId}) => { 
    const [isModalOpen, handleClick] = useReducer(isModalOpen => !isModalOpen, false);
    const [doc, setDoc] = useState({});

    useEffect(() => {
        if (!docId) return setDoc(findDoc({ title: "title1" }));
        
        const defaultDoc = findDoc({ _id: docId }, {projection:{_id:0}});
        setDoc(defaultDoc);

    }, [docId]);
    
    return (
        <>
            <button onClick={handleClick}>ㅁ</button>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleClick}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <button onClick={handleClick}>x</button>
                <h1>title : {doc.title}</h1>
                <p>content : {doc.text}</p>
                <div>sub doc</div>
                <div>doc deletion button</div>
            </ReactModal>
        </>
    )
}

export default Doc