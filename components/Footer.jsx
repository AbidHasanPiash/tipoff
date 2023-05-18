import Image from "next/image";
import Link from "next/link";
import {SiLinkedin, SiGithub, SiGmail} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="mt-20 relative">
      <svg viewBox="0 -20 700 110" width="100%" height="110" preserveAspectRatio="none">
          <path 
            className="fill-current text-gray-100 dark:text-gray-700" 
            transform="translate(0, -20)" 
            d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700" 
            // fill="#CEB964" 
          />
          <path 
            className="fill-current text-gray-100 dark:text-gray-800" 
            d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z" 
            // fill="#E6E7E9" 
          />
      </svg>
      <div className="bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent">
        <div className="w-full max-w-5xl m-auto space-y-8 px-6 text-gray-600 dark:text-gray-400 md:px-12 lg:px-20">
          <div className="grid grid-cols-8 gap-6 md:gap-0">
            <div className="col-span-8 border-r border-gray-100 dark:border-gray-800 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between gap-3 text-xl border-b border-white dark:border-gray-800 py-6 md:block md:space-y-6 md:border-none md:py-0">
                <div>
                    <Image
                    src={'/images/tipoff.png'}
                    alt="logo tailus"
                    width="80"
                    height="80"
                    className="dark:brightness-200 dark:grayscale hover:grayscale-0 hover:brightness-100"
                    />
                    <span className="hidden md:block">
                        Developer -
                        <Link 
                            href={'https://abidhasan.vercel.app/'} 
                            target="_blank"
                            className="hover:text-[#ff7782]"
                        >
                            <span className="font-abidFont tracking-widest font-extrabold"> Abid Hasan</span>
                        </Link>
                    </span>
                </div>
                <div>
                    <span className="md:hidden block py-3">
                        Developer - 
                        <Link 
                            href={'https://abidhasan.vercel.app/'} 
                            target="_blank"
                            className="hover:text-[#ff7782]"
                        >
                            <span className="font-abidFont tracking-widest font-extrabold"> Abid Hasan</span>
                        </Link>
                    </span>
                    <div className="flex gap-6 md:pb-5">
                        <Link href={'https://www.linkedin.com/in/abidhasanpiash/'} target="_blank">
                            <SiLinkedin className="hover:text-[#ff7782]"/>
                        </Link>
                        <Link href={'https://github.com/AbidHasanPiash'} target="_blank">
                            <SiGithub className="hover:text-[#ff7782]"/>
                        </Link>
                        <Link href={'mailto:mp.abidhasan@gmail.com'} target="_blank">
                            <SiGmail className="hover:text-[#ff7782]"/>
                        </Link>
                    </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-3xl px-5 flex flex-col items-center justify-center col-span-8 md:col-span-6 lg:col-span-5">
              <div className="w-full flex justify-between pb-5">
                  <Link href="#">Help</Link>
                  <Link href="#">Feedback</Link>
                  <Link href="#">Privacy</Link>
                  <Link href="#">Terms</Link>
              </div>
              <div className="w-full flex justify-between border-t border-gray-100 dark:border-gray-800 py-3">
                <span>
                  &copy; tipoff 2023
                </span>
                <span>All right reserved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
