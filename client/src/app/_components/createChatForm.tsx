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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const friends = [
  {
    id: 1,
    name: "Pedro",
  },
  {
    id: 2,
    name: "João",
  },
  {
    id: 3,
    name: "Maria",
  },
  {
    id: 4,
    name: "Ana",
  },
  {
    id: 5,
    name: "José",
  },
  {
    id: 6,
    name: "Carlos",
  },
  {
    id: 7,
    name: "Paulo",
  },
  {
    id: 8,
    name: "Luís",
  },
  {
    id: 9,
    name: "Rui",
  },
  {
    id: 10,
    name: "Miguel",
  },
  {
    id: 11,
    name: "Fernando",
  },
  {
    id: 12,
    name: "Bruno",
  },
  {
    id: 13,
    name: "Ricardo",
  },
  {
    id: 14,
    name: "Cristiano",
  },
  {
    id: 15,
    name: "André",
  },
  {
    id: 16,
    name: "Inês",
  },
];

export default function CreateChatForm() {
  return (
    <Dialog>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DialogTrigger asChild>
              <SidebarMenuButton className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </SidebarMenuButton>
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
                <DialogDescription>
                  <TabsContent value="groupChat">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create new group chat</CardTitle>
                        <CardDescription>
                          Select friends to participate in the chat.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[150px] pr-4">
                          <div className="space-y-2">
                            {friends.map((friend) => (
                              <div
                                key={friend.id}
                                className="space-y-1 flex flex-row gap-3 pb-2 items-center border-b"
                              >
                                <Checkbox />
                                <Label>{friend.name}</Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <Button>Create Chat</Button>
                      </CardFooter>
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
                </DialogDescription>
              </Tabs>
            </DialogContent>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Dialog>
  );
}
