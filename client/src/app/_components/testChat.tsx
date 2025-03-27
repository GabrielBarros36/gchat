import { Card } from "@/components/ui/card";
import type { Message, User } from "../fetchData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usernameToColor } from "../utils";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useRef, useState } from "react";
interface Props {
  initialMessages: Message[];
  user: User | null;
}

export default function TestChat({ initialMessages, user }: Props) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputMessage = e.currentTarget.inputMessage.value;

    if (inputMessage.trim() && wsRef.current) {
      wsRef.current.send(inputMessage);
      e.currentTarget.reset();
    }
  };

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const ws = new WebSocket(`wss://ws.gchat.cloud/ws?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  if (user === null) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      <main className="flex-1 overflow-hidden px-6 pb-3 pt-1">
        <div
          ref={scrollRef}
          className="flex h-full w-full overflow-y-auto scrollbar-hidden"
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              {messages.map((message) =>
                message.user_id === user.id ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="flex flex-col">
                      <Card className="bg-primary border-0 shadow-none py-2 px-4 text-white w-fit rounded-tr-none ml-12 text-sm">
                        {message.content}
                      </Card>
                      <p className="text-sm opacity-40 text-right pr-3">
                        {new Date(message.timestamp).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        }) +
                          "  • " +
                          new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex justify-start">
                    <div className={`flex gap-3 max-w-[80%] flex-row`}>
                      <Avatar className="h-9 w-9 mt-1">
                        <AvatarImage src={message.profile_picture} />
                        <AvatarFallback>
                          {message.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p
                          className="text-sm"
                          style={{
                            color: usernameToColor(message.username),
                          }}
                        >
                          {message.username}
                        </p>
                        <Card className="bg-slate-300 border-0 shadow-none py-2 px-4 text-black w-fit rounded-tl-none text-sm">
                          {message.content}
                        </Card>
                        <p className="text-sm opacity-40">
                          {new Date(message.timestamp).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          }) +
                            " • " +
                            new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <hr />
      </main>
      <footer className="pb-5">
        <form
          onSubmit={sendMessage}
          className="flex flex-row gap-2 mt-3 w-full justify-center"
        >
          <Input
            className="w-[60%]"
            type="text"
            name="inputMessage"
            placeholder="Type your message..."
            disabled={!connected}
            required
          />
          <Button className="w-[5%]" disabled={!connected}>
            <Send />
          </Button>
        </form>
      </footer>
    </div>
  );
}
