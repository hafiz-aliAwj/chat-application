import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AllContacts from "@/Components/AllContacts";
import Welcome from "@/Components/Welcome";
import ChatContainer from "@/Components/ChatContainer";
import { userAgent } from "next/server";

export default function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [user, setUser] = useState(undefined);
  // const [name,SetName] = useState("");
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
        const response = await axios.get(
          `http://localhost:4000/auth/users/${user.email}`
        );
        console.log(response); // Log the entire response object
        setContacts(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  const chatChanger = (chat) => {
    setCurrentChat(chat);
  };


  
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
            <ChatContainer currentChat={currentChat}/>
          )}
        </div>
      </div>
    </>
  );
}
