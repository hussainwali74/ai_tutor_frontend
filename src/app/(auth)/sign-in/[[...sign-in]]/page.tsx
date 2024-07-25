import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SignInPage() {
  return (
    <div className='h-screen w-full flex flex-col gap-y-2 justify-center items-center'>
      {/* <h3>Hi theresdsd</h3> */}
    <SignIn />
    </div>
  )
}

export default SignInPage