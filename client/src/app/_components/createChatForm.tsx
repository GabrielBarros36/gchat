"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent, useState } from "react";
import axios from "axios";
import type { Group, Friend } from "../fetchData";

interface CreateGroupResponse {
  group_id: number;
  message: string;
}

interface Props {
  addGroupChat: (chat: Group) => void;
  friends: Friend[];
}

export default function CreateChatForm({ addGroupChat, friends }: Props) {
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (friendId: number, checked: boolean) => {
    setSelectedMemberIds((prev) => {
      if (checked) {
        return [...prev, friendId];
      } else {
        return prev.filter((id) => id !== friendId);
      }
    });
  };

  function createGroupChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    if (selectedMemberIds.length === 0) {
      return;
    }

    setIsLoading(true);

    const payload = {
      token: token,
      groupName: e.currentTarget.groupName.value,
      memberIds: selectedMemberIds,
    };
    axios
      .post<CreateGroupResponse>(
        "https://api.gchat.cloud/group/create",
        payload
      )
      .then((response) => {
        addGroupChat({
          id: response.data.group_id,
          name: payload.groupName,
          profile_picture: "",
          members: [],
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Dialog>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DialogTrigger asChild>
              <div className="w-full text-center">
                <Button
                  variant="outline"
                  className="flex-1 gap-2 hover:bg-primary/10"
                >
                  <PlusCircle className="h-4 w-4 text-primary" />
                  <span>New Chat</span>
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-center">
                Create a new chat
              </DialogTitle>
              <Tabs defaultValue="Group Chat" className="pr-2">
                <DialogHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="groupChat">Group Chat</TabsTrigger>
                    <TabsTrigger value="temporaryChat">
                      Temporary Chat
                    </TabsTrigger>
                  </TabsList>
                </DialogHeader>
                <TabsContent value="groupChat">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create new group chat</CardTitle>
                      <CardDescription>
                        Select friends to participate in the chat.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={(e) => createGroupChat(e)}
                        className="flex flex-col gap-4"
                      >
                        <Input
                          type="text"
                          name="groupName"
                          placeholder="Chat name"
                          className="w-full"
                          required
                        />
                        <ScrollArea className="h-[150px] pr-4">
                          <div className="space-y-2">
                            {friends.map((friend) => (
                              <div
                                key={friend.friend_id}
                                className="space-y-1 flex flex-row gap-3 pb-2 items-center border-b"
                              >
                                <Checkbox
                                  onCheckedChange={(e) =>
                                    handleCheckboxChange(
                                      friend.friend_id,
                                      e as boolean
                                    )
                                  }
                                />

                                <Label>{friend.username}</Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <Button
                          className="w-[30%]"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "..." : "Create Chat"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="temporaryChat">
                  <Card>
                    <CardHeader>
                      <CardTitle>Start Temporary Chat</CardTitle>
                      <CardDescription>
                        Only accessible by link and password and self-deletes
                        after selected duration.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label>Duration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="360">6 hours</SelectItem>
                            <SelectItem value="1440">1 day</SelectItem>
                            <SelectItem value="10080">7 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Set Password (Optional)</Label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Create Chat</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Dialog>
  );
}
