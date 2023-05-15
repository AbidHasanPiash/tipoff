'use client';

import {BsSearchHeart} from "react-icons/bs"
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  return (
    <section className="feed">
      <form className="w-full max-w-xl flex items-center justify-center">
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
            className="w-full m-1 px-5 outline-none bg-transparent rounded-full"
          />
          <span className="absolute right-5">
            <BsSearchHeart size={25} className={`${isFocused && 'text-blue-500 dark:text-amber-400'}`}/>
          </span>
        </div>
      </form>

      <div className="px-5">
        {/* All Prompts */}
        {searchText ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        )}
      </div>
    </section>
  )
}
