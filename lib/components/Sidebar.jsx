"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <div className="sidebar-container">

      <div className="sidebar-item sidebar-item1">
        {session
          ? <p>[{userName}]</p>
          : <Link href={'/signIn'}>sign in</Link>
        }
      </div>

      <Link
        href={'/'}
        className="link-without-underline"
      >
        <div className="sidebar-item">
            Home
        </div>
      </Link>

      <Link
        href={'/dashboard'}
        className="link-without-underline"
      >
        <div className="sidebar-item">
          dashboard
        </div>
      </Link> 
      
    </div>
  )
}

export default Sidebar