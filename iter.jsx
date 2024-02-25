"use client"
import { useCallback, useMemo, useState } from "react"

const page = () => {
  const useIterator = (
    items = [],
    initialIndex = 0
  ) => {
    const [i, setI] = useState(initialIndex);

    const _prev = () => {
      if (i === 0) return setI(items.length - 1);
      setI(i - 1);
    };
    const prev = useCallback(_prev, [i]);

    const _next = () => {
      if (i === items.length - 1) return setI(0);
      setI(i + 1);
    };
    const next = useCallback(_next, [i]);

    const item = useMemo(() => items[i], [i]);

    return [item, prev, next];
  }

  const [letter, previous, next] = useIterator(["a", "b", "c"]);
  
  return (
    <>
      <h1>a b c</h1>
      <p>{letter}</p>
      <button onClick={previous}>&lt;</button>
      <button onClick={next}>&gt;</button>
    </>
  )
}

export default page