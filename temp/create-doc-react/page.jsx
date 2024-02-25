"use client"

import Form from "@/temp/Form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = () => {
  const session = useSession();
  useEffect(() => {
    if (session.user) {
      console.log('(create-doc-react) session : ', session);
    } else {
      alert('you have to login!');
    }
  }, []);
  
  const [submitting, setSubmitting] = useState(false);
  const [doc, setDoc] = useState({
    title: "",
    content: [""]
  });
  const [focus, setFocus] = useState(0);
  
  const createDoc = (e) => {
    e.preventDefault();

    console.log('new doc created!');
  };

  const handleInput = (e, idx, newLine) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      let newContent = [...doc.content];
      newContent.splice(idx, 0, newLine);
      // console.log('newContent right after enter : ', newContent);
      setDoc({ ...doc, content: newContent });
      
      setFocus(idx);
    }
    // console.log('newContent after enter : ', doc.content);
  };

  //change focus
  useEffect(() => {
    const newFocus = document.getElementById(focus);
    console.log('index of focus is ', focus);
    newFocus.focus();
  }, [focus]);

  const handleChangeContent = (e, idx) => {
    let newContent = [...doc.content];
    newContent[idx] = e.target.value;
    // console.log('text changed : ', newContent[idx]);
    setDoc({ ...doc, content: newContent })
  };

  return (
    <div className="doc-form">
      <Form
        type="create"
        doc={doc}
        setDoc={setDoc}
        submitting={submitting}
        handleSubmit={createDoc}
        handleInputEnter={handleInput}
        handleChangeContent={handleChangeContent}
      />
    </div>

  )
}

export default page