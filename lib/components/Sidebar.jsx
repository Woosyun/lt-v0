"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "@/styles/sidebar.module.css"

const Sidebar = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <div className={styles.container}>

      <div className={styles.item1}>
        {session
          ? <p>[{userName}]</p>
          : <Link href={'/signIn'}>sign in</Link>
        }
      </div>

      <Link
        href={'/'}
        className={styles.link}
      >
        <div className={styles.item}>
            Home
        </div>
      </Link>

      <Link
        href={'/dashboard'}
        className={styles.link}
      >
        <div className={styles.item}>
          dashboard
        </div>
      </Link> 
      
    </div>
  )
}

export default Sidebar