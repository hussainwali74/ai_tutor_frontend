import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { cn } from "../lib/utils";
import { CodeBlock } from "@/components/ui/codeblock";
import { ChatMessageActions } from "./chat-message-actions";

import { FC, memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import Image from "next/image";

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children && prevProps.className === nextProps.className
);

export interface ChatMessageProps {
  message: { role: string; content: string };
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn(" relative z-0 mb-4 flex lg:flex-row flex-col text   text-base md:-ml-12 bg-[#F6F4FD]")}
      {...props}
    >
      {message.role === "assistant" ? (
        <div className={cn("flex h-12 w-12 shrink-0 select-none", "bg-transparent text-[#7160A8]")}>
          <Image
            alt="atma"
            height={64}
            width={64}
            className="w-8 h-8 lg:w-10 lg:h-10 "
            src="/ai_avatar.png"
          />
        </div>
      ) : null}
      {message.role === "user" ? (
        <div className="flex w-12 h-12 select-none lg:hidden xl:hidden shrink-0">
          <Image
            alt="aatma"
            height={64}
            width={64}
            className="w-8 h-8 lg:w-10 lg:h-10 "
            src="/user_avatar.png"
          />
        </div>
      ) : null}

      <div
        className={`flex-1 px-1 ml-4 space-y-2 overflow-hidden ${
          message.role == "user" ? "bg-[#7160A8] px-4 mr-2 rounded py-2 justify-end text-end" : "text-start"
        } text`}
      >
        <MemoizedReactMarkdown
          className={`prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 ${
            message.role == "assistant" ? "text-[#7160A8]" : "text-white text-end"
          }`}
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
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
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>

      {message.role === "user" ? (
        <div className="hidden w-12 h-12 select-none lg:flex shrink-0">
          <Image
            alt="aatma"
            height={64}
            width={64}
            className="w-8 h-8 lg:w-10 lg:h-10 "
            src="/user_avatar.png"
          />
        </div>
      ) : null}
    </div>
  );
}
