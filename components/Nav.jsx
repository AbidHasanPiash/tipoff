"use client"
import Link from 'next/link';
import Image from 'next/image';
import {TbMenu} from 'react-icons/tb';
import {VscClose} from 'react-icons/vsc';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

export default function Nav() {
  const [isOpen, setOpen] = useState(false);
  const isUserLogedIn = true;
  const [providers, setProviders] = useState(null);
  useEffect(()=>{
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);
  return (
    <nav className='fixed top-0 left-0 right-0 p-3 bg-white/10 dark:bg-black/10 backdrop-blur-md'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <Link href={'/'}>
          <div className='group flex items-center justify-center space-x-2 cursor-pointer'>
            <Image 
              className='group-hover:rotate-45 duration-150'
              src={'/images/tipoff.png'}
              alt='logo'
              width={40}
              height={40}
            />
            <h1 
              className='text-xl tracking-widest font-bold uppercase 
              hover:underline underline-offset-8'
            >
              TIPOFF
            </h1>
          </div>
        </Link>
        <div>
          {isUserLogedIn ?
            <>
              {/* Desktop view */}
              <div className='hidden md:flex items-center space-x-6'>
                <Link href={'/create-post'} className='filled_btn'>Create Post</Link>
                <button onClick={signOut} className='outlined_btn'>Sign Out</button>
                <Link href={'/profile'} className='rounded-full ring ring-rose-500'>
                  <Image 
                    src={'/images/tipoff.png'}
                    alt='logo'
                    width={40}
                    height={40}
                  />
                </Link>
              </div>
              {/* Mobile View icon only*/}
              <div className='flex md:hidden z-30'>
                <div onClick={()=>setOpen((prev)=>!prev)} className='cursor-pointer'>
                  {!isOpen?<TbMenu size={30}/>:<VscClose size={30}/>}
                </div>
              </div>
            </>
            :
            <>
              {providers && Object.values(providers).map((provider)=>(
                <button
                  type='button'
                  key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className='filled_btn'
                >
                  Sign In
                </button>
              ))}
            </>
          }
        </div>
      </div>
      {/* Mobile View body only*/}
      {isUserLogedIn && 
      <div 
        className={`${isOpen ? 'h-60 text-2xl font-semibold':'h-0 pt-5 text-[0px]'} 
        md:hidden flex items-center justify-end transition-all duration-300`}
      >
        <div className='flex flex-col text-right px-6 space-y-7'>
          <Link href={'/create-post'} onClick={()=>setOpen(false)} className=''>Create Post</Link>
          <button onClick={()=>{signOut; setOpen(false)}} className=''>Sign Out</button>
          <Link href={'/profile'} onClick={()=>setOpen(false)} className=''>My Profile</Link>
        </div>
      </div>}
    </nav>
  )
}
