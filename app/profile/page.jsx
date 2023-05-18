'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import LovedPrompt from "@components/LovedPrompt";

export default function MyProfile() {
  const router = useRouter();
  const {data:session} = useSession();
  const [posts, setPosts] = useState([])
  // const [lovedPosts, setLovedPosts] = useState([]);
  useEffect(()=>{
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    // const fetchLovedPost = async () => {
    //   const response = await fetch("/api/prompt");
    //   const data = await response.json();
    //   setPosts(data);
    // }
    if(session?.user.id) fetchPost();
    else router.push(`/`);
  },[session?.user.id]);
  const handleEdid = (post) => {
    router.push(`/uptade-post?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <section>
      <Profile
        name="My"
        desc="Welcome to your personalized profile"
        data={posts}
        handleEdid={handleEdid}
        handleDelete={handleDelete}
      />
      <LovedPrompt/>
    </section>
  )
}
