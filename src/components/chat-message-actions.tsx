'use client'


import { Button } from './ui/button'
import { useCopyToClipboard } from '@/lib/use-copy-to-clipboard'
import { cn } from '../lib/utils'
import { ChatMessageProps } from './chat-message'
import { CheckIcon, CopyIcon } from 'lucide-react'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: {type:string,message:string}
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.message)
  }

  return (
    <div
      className={cn(
        'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <CheckIcon /> : <CopyIcon />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  )
}
