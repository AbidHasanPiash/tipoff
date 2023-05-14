'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {BsHeart, BsHeartFill} from "react-icons/bs"

export default function PromptCard({post, handleTagClick, handleEdit, handleDelete}) {
  const [heartClicked, setHeartClicked] = useState(false);
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-widest">{post.creator.username}</h3>
            <p className="text-sm opacity-70">{post.creator.email}</p>
          </div>
        </div>
        <div className="p-2 text-xl cursor-pointer">
          <div onClick={()=>setHeartClicked((prev)=>!prev)}>
            {heartClicked?<BsHeartFill className="text-red-500"/>:<BsHeart/>}
          </div>
        </div>
      </div>
      <p className="my-4">{post.prompt}</p>
      <p className="text-blue-400 cursor-pointer" onClick={()=>handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
    </div>
  )
}
