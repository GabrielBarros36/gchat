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
import { groupMessages, groups, messages, users } from "./fakeData/fakeData";

const chats = groups;
const message = messages;
const groupMessage = groupMessages;
const user = users;

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

    /*
    const payload = {
      message: inputMessage,
      group_id: selectedChat,
      sender_id: 1,
    };
    if (inputMessage.trim() && wsRef.current) {
      console.log("sent");
      wsRef.current.send(JSON.stringify(payload));
      setInputMessage("");
    }
      */
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <h1 className="text-md font-semibold text-center pt-4">GChat</h1>
        <CreateChatForm />
        <SidebarContent>
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.groupID}>
                <SidebarMenuButton
                  onClick={() => setSelectedChat(chat.groupID)}
                  isActive={selectedChat === chat.groupID}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {chat.group_name}
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
          </div>
          <h1 className="font-semibold ">
            {selectedChat
              ? chats.find((chat) => chat.groupID === selectedChat)?.group_name
              : "Select a chat"}
          </h1>
          <div className="flex flex-row items-center gap-3">
            <p className="text-sm invisible md:visible">
              Status: {connected ? "Connected" : "Disconnected"}
            </p>
            <Ping connected={connected} />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-2 w-full">
            {selectedChat && selectedChat !== -1 ? (
              chats.find((chat) => chat.groupID === selectedChat)?.groupID &&
              message
                .filter((msg) =>
                  groupMessage.find(
                    (gm) =>
                      gm.messageID === msg.messageID &&
                      gm.groupID === selectedChat
                  )
                )
                .map((message) =>
                  message.senderID == 1 ? (
                    <div key={message.messageID} className="flex justify-end">
                      <div className="flex flex-col">
                        <Card className="bg-primary border-0 shadow-lg py-2 px-4 text-white w-fit rounded-full ml-12">
                          {message.content}
                        </Card>
                        <p className="text-sm opacity-40 text-right pr-3">
                          {new Date(message.sent_at).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          }) +
                            " " +
                            new Date(message.sent_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={message.messageID}
                      className="flex flex-col justify-start"
                    >
                      <p className="text-sm pl-3">
                        {
                          user.find(
                            (person) => person.userID === message.senderID
                          )?.username
                        }
                      </p>
                      <Card className="bg-slate-300 border-0 shadow-lg py-2 px-4 text-black w-fit rounded-full mr-12">
                        {message.content}
                      </Card>
                      <p className="text-sm opacity-40 pl-3">
                        {new Date(message.sent_at).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        }) +
                          " " +
                          new Date(message.sent_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </p>
                    </div>
                  )
                )
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {messages.map((message, index) =>
                  index % 2 == 0 ? (
                    <div key={index} className="flex justify-end">
                      <div className="flex flex-col">
                        <Card className="bg-primary border-0 shadow-lg py-2 px-4 text-white w-fit rounded-full ml-12">
                          {message}
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="flex justify-start">
                      <Card className="bg-slate-300 border-0 shadow-lg py-2 px-4 text-black w-fit rounded-full mr-12">
                        {message}
                      </Card>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </main>
        <footer className="pb-5">
          {selectedChat && (
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
          )}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
