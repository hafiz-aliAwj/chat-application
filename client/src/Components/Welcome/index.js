import Image from "next/image";
import React, { useEffect, useState } from "react";

function Welcome({user}) {
    const [name, setName] = useState("");
    useEffect(() => {
        if (user) {
          setName(user.username);
          console.log(name);
        }
      }, [user]);
  return (
    <>
      <div className="w-3/4 flex justify-center items-center">
        <div className="flex flex-col items-center text-white">
            <Image src={"/robot.gif"} height={300} width={250} alt="hi" />
            <h1 className="text-3xl">HI <span className="text-4xl font-bold">{name}</span></h1>
            <h2>Select a chat to start conversation</h2>
        </div>
      </div>
    </>
  );
}

export default Welcome;
