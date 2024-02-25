'use client'
import { useRouter } from "next/navigation";

const DocCreationButton = ({userId}) => {
  const router = useRouter();
  
  const handleClick = async () => {
    //TODO : fetch for creating doc and updating posts
    const res = await fetch('/api/create/doc', {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ userId })
    });
    const { docId } = await res.json();
    // console.log('(DocCreationButton) docId : ', docId);

    router.push(`/edit-doc/${docId}`);
  };
    
  return (
    <button
      onClick={handleClick}
    >
      create doc
    </button>
  )
}

export default DocCreationButton