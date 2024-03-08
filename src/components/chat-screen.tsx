"use client";
import { useContext } from "react";
import PromptInput from "@/components/prompt-input";
import { ChatContext } from "@/components/chat-provider";
import MessagesSection from "@/components/messages";
import { MessagesContext } from "@/components/messages-provider";

export default function ChatScreen() {
  const { isChatPresent } = useContext(ChatContext);
  const { messages } = useContext(MessagesContext);
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 lg:gap-8 px-4 py-6 lg:p-12">
      {!isChatPresent ? (
        <section className="flex flex-col justify-between items-center">
          <h1 className="text-3xl lg:text-4xl font-bold">
            The <span className="text-primary">AI</span> Genie
          </h1>
          <h4>
            Ask your <span className="text-primary">queries</span> and get it{" "}
            <span className="text-primary">answered</span>
          </h4>
        </section>
      ) : (
        <div className="flex gap-2 items-center">
          <div className="hidden lg:block"></div>
          <h1 className="text-xl 2xl:text-4xl w-full font-bold">
            The <span className="text-primary">AI</span> Genie
          </h1>
        </div>
      )}
      {messages.length > 0 && (
        <section className="grow w-full h-full bg-foreground/10 lg:px-8 px-2 py-4 rounded-lg">
          <MessagesSection messages={messages} />
        </section>
      )}
      <PromptInput />
    </main>
  );
}
