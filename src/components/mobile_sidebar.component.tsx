import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import SidebarComponent from './sidebar.component'
import { DialogTitle } from '@radix-ui/react-dialog'

function MobileSidebarComponent() {
  return (
    <div>
        <Sheet >
            <SheetTrigger title='sidebar menu'aria-details='sa'>
                <Menu className='text-white' />
            </SheetTrigger>
            <SheetContent  className='p-0 z-[100]' side={'left'}>
                <DialogTitle className='hidden'>t</DialogTitle>
                <SidebarComponent />
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileSidebarComponent