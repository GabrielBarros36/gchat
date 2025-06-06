"use client";

import { Card } from "@/components/ui/card";
import { LogOut, Menu, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import Ping from "./_components/ping";
import ThemeToggle from "./_components/theme-toggle";
import {
  Sidebar,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CreateChatForm from "./_components/createChatForm";
import ManageFriends from "./_components/manageFriends";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SettingsModal from "./_components/settingsModal";
import { usernameToColor } from "./utils";
import axios from "axios";
import AuthModals from "./_components/authModals";
import GroupManagementModal from "./_components/groupManagementModal";
import { fetchAll } from "./fetchData";
import type {
  User,
  Group,
  Friend,
  FriendRequest,
  TempGroup,
} from "./fetchData";
import Chat from "./_components/chat";
import ChatList from "./_components/chatList";

export default function Home() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [connected, setConnected] = useState(false);

  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [tempGroups, setTempGroups] = useState<TempGroup[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [incomingFriends, setIncomingFriends] = useState<FriendRequest[]>([]);
  const [outgoingFriends, setOutgoingFriends] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoad(true);
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token not found in localStorage.");
        setShowAuthModal(true);
        setIsAuth(false);
        setInitialLoad(false);
        return;
      }

      try {
        const tokenCheckResponse = await axios.get(
          `https://api.gchat.cloud/user/check-token?token=${token}`
        );

        if (!tokenCheckResponse.data.valid) {
          console.log("Token is invalid.");
          setShowAuthModal(true);
          setIsAuth(false);
          setInitialLoad(false);
          localStorage.removeItem("token");
          return;
        }

        setIsAuth(true);
        const fetchedData = await fetchAll();

        console.log("Data fetched successfully");

        setUser(fetchedData.user);
        setGroups(fetchedData.groups);
        setFriends(fetchedData.friends);
        setIncomingFriends(fetchedData.incomingFriends);
        setOutgoingFriends(fetchedData.outgoingFriends);
        setTempGroups(fetchedData.tempGroups);
      } catch (error) {
        console.error("Error during initial data load:", error);
        setShowAuthModal(true);
        setIsAuth(false);
        localStorage.removeItem("token");
      } finally {
        setInitialLoad(false);
      }
    };

    loadInitialData();
  }, [isAuth]);

  const addGroupChat = (newGroup: Group) => {
    setGroups((prev) => [...prev, newGroup]);
    setSelectedChat(newGroup.id);
  };

  const addTempGroupChat = (newGroup: TempGroup) => {
    setTempGroups((prev) => [...prev, newGroup]);
  };

  const addGroupMember = (memberIds: number[], groupId: number) => {
    const membersToAdd: Friend[] = friends.filter((f) =>
      memberIds.includes(f.friend_id)
    );

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: [...group.members, ...membersToAdd],
          };
        }
        return group;
      })
    );
  };

  const editGroupPicture = (groupId: number, pictureUrl: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            profile_picture: pictureUrl,
          };
        }
        return group;
      })
    );
  };

  const removeGroupMember = (friendId: number, groupId: number) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter(
              (member) => member.friend_id !== friendId
            ),
          };
        }
        return group;
      })
    );
  };

  const changeChat = (groupId: number) => {
    setSelectedChat(groupId);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setShowAuthModal(true);
    setIsAuth(false);

    setUser(null);
    setGroups([]);
    setFriends([]);
    setIncomingFriends([]);
    setOutgoingFriends([]);
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-medium text-primary animate-pulse">
            Loading GChat...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div>
        {showAuthModal && (
          <AuthModals
            hideAuthModal={() => {
              setIsAuth(true);
              setShowAuthModal(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col">
      <SidebarProvider>
        <Sidebar>
          <h1 className="text-md font-semibold text-center pt-4">GChat</h1>
          <div className="flex flex-row justify-between">
            <CreateChatForm
              addGroupChat={addGroupChat}
              friends={friends}
              addTempChat={addTempGroupChat}
            />
            <ManageFriends
              initialFriends={friends}
              initialIncomingFriends={incomingFriends}
              initialOutgoingFriends={outgoingFriends}
            />
          </div>
          <ChatList
            groups={groups}
            tempGroups={tempGroups}
            changeChat={changeChat}
            user={user}
          />
          <SidebarFooter>
            <hr />
            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage src={user?.profile_picture} />
                  <AvatarFallback>
                    {user?.username.substring(0, 2).toUpperCase() ?? ""}
                  </AvatarFallback>
                </Avatar>
                <p
                  className="font-semibold"
                  style={{ color: usernameToColor(user?.username ?? "") }}
                >
                  {user?.username ?? "unknown"}
                </p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <TooltipProvider delayDuration={0}>
                  <SettingsModal
                    user={
                      user ?? {
                        username: "",
                        profile_picture: "",
                        email: "",
                        id: -1,
                      }
                    }
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={logOut}>
                        <LogOut className="h-5 w-5 font-semibold hover:text-primary hover:cursor-pointer" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Log Out</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1">
          <header className="flex flex-row h-16 items-center justify-between border-b px-6">
            <div className="flex flex-row gap-2 items-center">
              <SidebarTrigger>
                <Menu className="h-6 w-6" />
              </SidebarTrigger>
            </div>
            <h1 className="font-semibold ">
              {selectedChat ? (
                <GroupManagementModal
                  group={groups.find((group) => group.id === selectedChat)!}
                  friends={friends}
                  user={user}
                  removeGroupMember={removeGroupMember}
                  addGroupMember={addGroupMember}
                  editGroupPicture={editGroupPicture}
                />
              ) : (
                "Select a chat"
              )}
            </h1>
            <div className="flex flex-row items-center gap-3">
              <Ping connected={connected} />
              <ThemeToggle />
            </div>
          </header>
          {!selectedChat ? (
            <div className="h-full flex flex-col items-center justify-center">
              <Card className="flex flex-col items-center max-w-md text-center p-8 ">
                <MessageSquare className="h-16 w-16 text-primary/80 mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-primary">
                  Welcome to GChat
                </h2>
                <p className="mb-6">
                  Select a conversation from the sidebar to start chatting, or
                  create a new conversation.
                </p>
              </Card>
            </div>
          ) : (
            <Chat
              user={user}
              updatePing={(isConnected) => setConnected(isConnected)}
              groupId={selectedChat}
              key={selectedChat}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
