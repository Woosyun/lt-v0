"use client"
import { signIn } from 'next-auth/react'

const page = () => {
  return (
    <div>
      <button onClick={() => signIn('github', {callbackUrl:'http://localhost:3000/dashboard'})}>github</button>
    </div>
  )
}

export default page