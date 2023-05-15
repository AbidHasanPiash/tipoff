'use client'

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {BsHeart, BsHeartFill} from "react-icons/bs"

export default function PromptCard({post, handleTagClick, handleEdit, handleDelete}) {
  const [heartClicked, setHeartClicked] = useState(false);
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div onClick={handleProfileClick} className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
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
      {session?.user.id === post.creator._id &&
      pathName === '/profile' && (
        <div className="pt-2 mt-2 flex items-center justify-end gap-5 border-t border-t-gray-500 border-opacity-50">
          <p className="text-sm cursor-pointer text-green-400" onClick={handleEdit} >
            Edit
          </p>
          <p className="text-sm cursor-pointer text-red-400" onClick={handleDelete} >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}
