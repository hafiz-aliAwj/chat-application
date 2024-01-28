import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function ChatContainer({ user, currentChat, createMessage, allChats }) {
  const [username, setUsername] = useState("");
  const [chatname, setChatname] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);
  useEffect(() => {
    if (currentChat) {
      setChatname(currentChat.username);
    }
  }, [currentChat]);
  const handleChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessage(message);
    setMessage("");
  };

  const sortedMessages = allChats.sort((a, b) => a.date - b.date);
  return (
    <div className="h-full w-3/4 bg-[#171566] flex flex-col">
      <div className="w-full bg-[#3f3cff] py-3 flex px-5 items-center">
        <div className="bg-white text-black font-black py-1 px-3 text-2xl rounded-full inline">
          {chatname.charAt(0)}
        </div>
        <h3 className="text-white font-medium text-lg pl-5">{chatname}</h3>
      </div>
      <div className="h-full overflow-y-auto border border-gray-300 p-4 flex flex-col">
        {sortedMessages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 max-w-[80%] ${
              message.sender === username ? "self-end" : "self-start"
            } ${
              message.sender === username ? "bg-green-200" : "bg-blue-200"
            } p-2 rounded`}
          >
             {message.content}
          </div>
        ))}
      </div>

      <div className="w-full bg-[#3f3cff] py-3 flex  px-5 items-center">
        <div className="bg-white text-black font-black py-1 px-3 text-2xl rounded-full inline">
          {username.charAt(0)}
        </div>
        <div className="w-full">
          <form
            className="flex px-5 items-center w-full justify-between"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              name="chat"
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
              value={message}
              className="rounded-3xl h-10 w-full mr-5 px-3 overflow-auto"
            />
            <button
              type="submit"
              className="float-right rounded-full bg-[#171566] p-2"
            >
              <IoIosSend color="black" size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
