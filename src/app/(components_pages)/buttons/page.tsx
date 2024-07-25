import { Button } from '@/components/ui/button'
import React from 'react'

function ButtonsPage() {
  return (
    <div className='flex flex-col gap-y-5 h-full w-1/2  p-10 justify-start items-start'>
        <Button variant={'default'} >default</Button>
        <Button variant={'primary'} >primary</Button>
        <Button variant={'primaryOutline'} >primaryOutline</Button>
        <Button variant={'secondary'} >secondary</Button>
        <Button variant={'secondaryOutline'} >secondaryOutline</Button>
        <Button variant={'danger'} >danger</Button>
        <Button variant={'dangerOutline'} >dangerOutline</Button>
        <Button variant={'super'} >super</Button>
        <Button variant={'superOutline'} >superOutline</Button>
        <Button variant={'ghost'} >ghost</Button>
        <Button variant={'sidebar'} >sidebar</Button>
        <Button variant={'sidebarOutline'} >sidebarOutline</Button>
    </div>
  )
}

export default ButtonsPage