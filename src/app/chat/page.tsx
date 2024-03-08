"use client";
import { ChatContext } from "@/components/chat-provider";
import ChatScreen from "@/components/chat-screen";
import { MessagesContext } from "@/components/messages-provider";
import { MessageType } from "@/types/MessageType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Home() {
  const queryClient = new QueryClient();
  const [isChatPresent, setIsChatPresent] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  return (
    <QueryClientProvider client={queryClient}>
      <ChatContext.Provider value={{ isChatPresent, setIsChatPresent }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <TooltipProvider>
            <ChatScreen />
          </TooltipProvider>
        </MessagesContext.Provider>
      </ChatContext.Provider>
    </QueryClientProvider>
  );
}
