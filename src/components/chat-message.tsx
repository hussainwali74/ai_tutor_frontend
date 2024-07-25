import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { cn } from "../lib/utils";
import { CodeBlock } from "@/components/ui/codeblock";
import { ChatMessageActions } from "./chat-message-actions";

import { FC, memo } from 'react'
import ReactMarkdown, { Options, Components} from 'react-markdown'

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)


export interface ChatMessageProps {
  message: { type: string; message: string };
}
export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn("group relative mb-4 flex  md:-ml-12 bg-[#F6F4FD]")}
      {...props}
    >
      {message.type === "bot" ? (
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 select-none   ",
            "bg-transparent  text-[#7160A8]"
          )}
        >
          <img height={64} width={64} src="/ai_avatar.png" />
        </div>
      ) : null}

      <div
        className={`flex-1 px-1 ml-4 space-y-2 overflow-hidden ${
          message.type == "user" ? "bg-[#7160A8] px-4 mr-2 rounded py-2 justify-end text-end " : "text-start"
        } text`}
      >
        <MemoizedReactMarkdown
          className={`prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 ${
            message.type == "bot" ? "text-[#7160A8]" : "text-white text-end"
          }`}
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children} </p>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children?.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  );
                }
                
                // children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {message.message}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>

      {message.type === "user" ? (
        <div className="flex w-12 h-12 select-none shrink-0">
          <img height={64} width={64} src="/user_avatar.png" />
        </div>
      ) : null}
    </div>  
  );
}
