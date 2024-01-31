import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AllContacts from "@/Components/AllContacts";
import Welcome from "@/Components/Welcome";
import ChatContainer from "@/Components/ChatContainer";

export default function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [allChats,setAllChats] = useState([])
  const router = useRouter();

  useEffect(() => {
    checking();
  }, []);
  useEffect(() => {
    fetchingUsers();
  }, [user]);
  const checking = async () => {
    if (!localStorage.getItem("chat-user")) {
      router.push("/login");
    } else {
      setUser(await JSON.parse(localStorage.getItem("chat-user")));
    }
  };
  const fetchingUsers = async () => {
    if (user) {
      try {
        const response = await fetch(`http://localhost:4000/auth/users/${user.username}`);
        const data = await response.json();
        setContacts(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  const chatChanger = (chat) => {
    setCurrentChat(chat);
    getAllMessages();
  };

  const createMessage = async (message) => {
    const sender = user.username;
    const reciever = currentChat.username;
    try {
      const response = await fetch("http://localhost:4000/message/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender : user.username,
          reciever: currentChat.username,
          content: message,
        })
      })
      getAllMessages();
    } catch (error) {
      console.error("An error occurred during message", error)
    }
  };

  const getAllMessages = async () => {
    try {
      const response = await fetch("http://localhost:4000/message/getAllMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user1: user.username,
          user2: currentChat.username,
        }),
      });
      if(response.ok){
        const data = await response.json();
        setAllChats(data);
       
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <div className="bg-[#121246] flex justify-center items-center h-screen w-full ">
        <div className="bg-black rounded-xl w-11/12 h-5/6 flex">
          <AllContacts
            contacts={contacts}
            user={user}
            changeChat={chatChanger}
          />
          {currentChat === undefined ? (
            <Welcome user={user}/>
          ) : (
            <ChatContainer currentChat={currentChat} user={user} createMessage={createMessage} allChats ={allChats}/>
          )}
        </div>
      </div>
    </>
  );
}
