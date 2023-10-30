'use client';

import {BeakerIcon, BoltIcon, SunIcon} from '@heroicons/react/24/solid'
import {useRouter} from 'next/navigation'

export default function Page() {
  const router = useRouter();
  return (
         <div className="text-white flex flex-col items-center justify-center h-screen ">
      
      <h1 className="text-5xl font-bold mb-20"> tutor</h1>
      <div className="flex space-x-8 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <button  onClick={()=>router.push('/okay')} className="infoText hover:cursor-pointer ">Exxplain maths to me</button>
            <p className="infoText">explain computer to me</p>
            <p className="infoText">explain youtube to me</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <BoltIcon className="h-8 w-8" />
            <h2>Math Questions</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Grade 1 math question</p>
            <p className="infoText">Grade 2 math question</p>
            <p className="infoText">Grade 3 math question</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <BeakerIcon className="h-8 w-8" />
            <h2>Explain Solution</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">explain Solution of the question to me</p>
          </div>
        </div>
      </div>
    </div>
  )
}


