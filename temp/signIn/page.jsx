"use client"
import { useSession, signIn, signOut, getProviders } from "next-auth";
import { useEffect, useState } from "react";

const page = async () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const adjustProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    adjustProviders();
  }, []);
  
  return (
      <div>
      {session?.user ? (<button onClick={signOut}>sign out</button>) : (
        providers && Object.values(providers).map((provider, idx) => (
          <button
            type="button"
            key={idx}
            onClick={()=>signIn(provider.id)}
          >
            {provider.name}
          </button>
        ))
        )}
      </div>
  )
}

export default page