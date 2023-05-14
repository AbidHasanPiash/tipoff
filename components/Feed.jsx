'use client';

import {BsSearchHeart} from "react-icons/bs"
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map(post=>(
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default function Feed() {
  const [isFocused, setIsFocused] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {
  }
  useEffect(()=>{
    const fetchPost = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPost();
  },[]);
  return (
    <section className="feed">
      <form className="w-full flex items-center justify-center">
        <div className={`relative w-full flex items-center bg-black/10 dark:bg-white/10 rounded-full py-2 mx-5
          ${isFocused?'dark:text-amber-400 ring-1 ring-blue-500 dark:ring-amber-400':'text-white'}`}
        >
          <input 
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
            required
            className="w-full py-1 px-5 outline-none bg-transparent"
          />
          <span className="absolute right-5">
            <BsSearchHeart size={25} className={`${isFocused && 'text-blue-500 dark:text-amber-400'}`}/>
          </span>
        </div>
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}
