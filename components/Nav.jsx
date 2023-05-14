"use client"
import Link from 'next/link';
import Image from 'next/image';
import {TbMenu} from 'react-icons/tb';
import {VscClose} from 'react-icons/vsc';
import {RiShareCircleFill, RiLogoutCircleLine} from 'react-icons/ri';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

export default function Nav() {
  const [isOpen, setOpen] = useState(false);
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
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
          {session?.user ?
            <>
              {/* Desktop view */}
              <div className='hidden md:flex items-center space-x-6'>
                <Link href={'/create-post'} className='filled_btn'>Create Post</Link>
                <button onClick={()=>signOut()} className='outlined_btn'>Sign Out</button>
                <Link href={'/profile'} className='rounded-full ring ring-gray-200'>
                  <Image 
                    className='rounded-full'
                    src={session?.user.image}
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
      {session?.user && 
      <div 
        className={`${isOpen ? 'h-60 text-2xl font-semibold border-b':'h-0 pt-5 text-[0px]'} 
        md:hidden  flex items-center justify-center transition-all duration-300`}
      >
        <div className='flex flex-col items-start space-y-10'>
          <span className='flex items-center space-x-3'>
            <span className={`${isOpen?'block':'hidden'}`}><RiShareCircleFill size={30}/></span>
            <Link href={'/create-post'} onClick={()=>setOpen(false)}>Create Post</Link>
          </span>
          <span className='flex items-center space-x-3'>
            <span className={`${isOpen?'block':'hidden'}`}><RiLogoutCircleLine size={30}/></span>
            <button onClick={()=>{signOut(); setOpen(false)}}>Sign Out</button>
          </span>
          <span className='flex items-center space-x-3'>
            <Image className={`${isOpen?'block':'hidden'} rounded-full ml-1 ring-2 ring-gray-200`}src={session?.user.image}alt='logo'width={25}height={25}/>
            <Link href={'/profile'} onClick={()=>setOpen(false)}>My Profile</Link>
          </span>
        </div>
      </div>}
    </nav>
  )
}
