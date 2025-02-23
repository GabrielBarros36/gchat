"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Menu, MessageSquare, Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Ping from "./_components/ping";
import ThemeToggle from "./_components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CreateChatForm from "./_components/createChatForm";

const chats = [
  {
    id: 1,
    name: "Chat 1",
    messages: [
      {
        id: 1,
        message: "Hello Chat 1",
      },
      {
        id: 2,
        message: "Hi",
      },
      {
        id: 3,
        message: "How are you?",
      },
    ],
  },
  {
    id: 2,
    name: "Chat 2",
    messages: [
      {
        id: 1,
        message: "Hello",
      },
      {
        id: 2,
        message: "Hi Chat 2",
      },
      {
        id: 3,
        message: "How are you?",
      },
    ],
  },
  {
    id: 3,
    name: "Chat 3",
    messages: [
      {
        id: 1,
        message: "Hello Chat 3",
      },
      {
        id: 2,
        message: "Hi",
      },
      {
        id: 3,
        message: "How are you?",
      },
    ],
  },
];

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.gchat.cloud");
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log(messages);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && wsRef.current) {
      wsRef.current.send(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <CreateChatForm />
        <SidebarContent>
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  onClick={() => setSelectedChat(chat.id)}
                  isActive={selectedChat === chat.id}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {chat.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex flex-row h-16 items-center justify-between border-b px-6">
          <div className="flex flex-row gap-2 items-center">
            <SidebarTrigger>
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <h1 className="font-semibold">
              {selectedChat
                ? chats.find((chat) => chat.id === selectedChat)?.name
                : "Select a chat"}
            </h1>
          </div>
          <h1 className="text-xl font-bold">GChat</h1>
          <div className="flex flex-row items-center gap-3">
            <Ping connected={connected} />
            <p className="text-sm">
              Status: {connected ? "Connected" : "Disconnected"}
            </p>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-2 w-full">
            {selectedChat &&
              chats
                .find((chat) => chat.id === selectedChat)
                ?.messages?.map((message, index) =>
                  index % 2 == 0 ? (
                    <div key={index} className="flex justify-end">
                      <Card className="bg-slate-800 border-0 shadow-lg py-2 px-4 text-white w-fit rounded-full">
                        {message.message}
                      </Card>
                    </div>
                  ) : (
                    <div key={index} className="flex justify-start">
                      <Card className="bg-slate-300 border-0 shadow-lg py-2 px-4 text-black w-fit rounded-full">
                        {message.message}
                      </Card>
                    </div>
                  )
                )}
          </div>
        </main>
        <footer className="pb-5">
          <form
            onSubmit={sendMessage}
            className="flex flex-row gap-2 mt-3 w-full justify-center"
          >
            <Input
              className="w-[60%]"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!connected}
            />
            <Button className="w-[5%]" disabled={!inputMessage}>
              <Send />
            </Button>
          </form>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
