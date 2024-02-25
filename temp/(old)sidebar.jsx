"use client"

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useReducer, useState } from 'react';

const Sidebar = () => {
  const { data: session } = useSession();
  const [isToggle, changeToggle] = useReducer(state => !state, false);

  const UserMenu = () => {
    return (
      <div className='sidebar-menu'>
        <div>
          <div>[current group]</div>
          <p>
            <Link href='/dashboard'>dashboard</Link>
          </p>
          <p>
            <Link href='/'>home</Link>
          </p>
        </div>

        <div>
          <button onClick={signOut}>sign out</button>
        </div>

      </div>
    )
  }
  const DefaultMenu = () => {
    return (
      <div className = 'sidebar-menu'>
        <button onClick={signIn}>sign in</button>
      </div>
    )
  }
  const Menu = () => {
    return (
      <div>
        {session?.user ? <UserMenu /> : <DefaultMenu />}
      </div>
    )
  }
  
  return (
    <div>
      <p>
        <button
          onClick={changeToggle}
          className="sidebar-toggle-button"
        >
          {isToggle ? "<<" : ">>"}
        </button>
      </p>

      {isToggle ? <Menu /> :null}
    </div>
  )
}

export default Sidebar