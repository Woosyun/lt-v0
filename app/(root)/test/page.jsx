"use client"
import withAuth from "@/lib/components/withAuth";
import { useState } from "react";

const page = ({session}) => {
  const [li, setLi] = useState([1,2,3]);

  return (
    <>
      {li.map((elem, idx) => (
        <input
          value={elem}
          onChange={(e) => {
            const newLi = [...li];
            newLi[idx] = e.target.value;
            setLi(newLi);
          }}
        />
      ))}
      {li.map((elem, idx) => (
        <div>{elem}</div>
      ))}
    </>
  )
}

export default withAuth(page)