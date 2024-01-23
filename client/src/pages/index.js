import React, {useEffect} from 'react';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem("chat-user")){
      router.push("/login");
    }
  }, [])
  return (
    <div>
      Chat
    </div>
  )
}
