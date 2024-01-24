import React, { useEffect, useState } from "react";

function AllContacts({ contacts, user, changeChat }) {
  const appName = "Chirp";
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(undefined);
  useEffect(() => {
    if (user) {
      setName(user.username);
      console.log(name);
    }
    console.log(contacts);
  }, [user]);
  const changeSelectedChat = (index, contact) => {
    setSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <div className="h-full w-1/4 bg-[#0c0c3b]">
        {name && (
          <div className="w-full h-full text-white bg-[#0c0c3b]">
            <div className="flex h-1/6 w-full justify-center items-center  pt-2">
              <div className="bg-white text-black font-black py-2 px-4 mr-3 text-3xl rounded-full">
                {appName.charAt(0)}
              </div>
              <h3 className="text-white font-bold text-3xl">{appName}</h3>
            </div>
            <div className="overflow-y-auto h-4/6 ">
            {contacts.map((contact, index) => {
                return(                   
            <div onClick={() => changeSelectedChat(index, contact)} className="max-h-20 min-h-16 w-full bg-gray-800 mb-1 rounded flex justify-start items-center pl-4" key={contact._id}>
            <div className="bg-white text-black font-black py-1 px-3 mr-3 text-xl rounded-full">
                {contact.username.charAt(0)}
              </div>
              <h3 className="text-white font-medium text-lg">{contact.username}</h3>
            </div>
                )
            })}
            </div>
            <div className="h-1/6 m-0 p-0">
            <div className="  bg-[#510061]  w-full h-full  overflow-hidden rounded flex justify-start items-center py-3 pl-4">
            <div className="bg-white text-black font-black py-1 px-3 mr-3 text-2xl rounded-full">
                {name.charAt(0)}
              </div>
              <h3 className="text-white font-medium text-lg">{name}</h3>
            </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AllContacts;
