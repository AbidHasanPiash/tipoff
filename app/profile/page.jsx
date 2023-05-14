'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

export default function MyProfile() {
    const {data:session} = useSession();
    const [posts, setPosts] = useState([])
    useEffect(()=>{
      const fetchPost = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
      if(session?.user.id) fetchPost();
    },[]);
    const handleEdid = () => {

    }
    const handleDelete = async () => {
        
    }
  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile"
        data={posts}
        handleEdid={handleEdid}
        handleDelete={handleDelete}
    />
  )
}
