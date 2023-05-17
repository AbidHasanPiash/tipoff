"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {


  const [isLiked, setIsLiked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const sessionUserId = session?.user.id;
  
  const isUserLiked = (sessionUserId) => {
    try {
      if (post.likedBy.includes(sessionUserId)) {
        setIsLiked(true);
        return true;
      } else {
        setIsLiked(false);
        return false;
      }
    } catch (error) {
      console.error(error);
      setIsLiked(false);
      return false;
    }
  };
  useEffect(() => {
    isUserLiked(sessionUserId);
  }, [sessionUserId]);

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  const handleHeartClick = async () => {
    setIsLiked((prev)=>!prev);
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/like", {
        method: "POST",
        body: JSON.stringify({
          postId: post._id,
          userId: session.user.id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const { liked } = data;
        console.log(`Post ${liked ? "liked!" : "unliked!"}`);
      }
    } catch (error) {
      console.log("like is not done for: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={handleProfileClick}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-widest">
              {post.creator.username}
            </h3>
            <p className="text-sm opacity-70">{post.creator.email}</p>
          </div>
        </div>
        <div className="p-2 text-xl cursor-pointer">
          <button disabled={submitting} onClick={handleHeartClick}>
            {isLiked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
          </button>
        </div>
      </div>
      <p className="my-4">{post.prompt}</p>
      <p
        className="text-blue-400 cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="pt-2 mt-2 flex items-center justify-end gap-5 border-t border-t-gray-500 border-opacity-50">
          <p
            className="text-sm cursor-pointer text-green-400"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm cursor-pointer text-red-400"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
