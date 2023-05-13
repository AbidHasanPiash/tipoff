import Feed from "@components/Feed"

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h1 className='pt-20 pb-10 text-4xl md:text-6xl text-center font-extrabold tracking-widest'>
        Discover & Share 
      <br/>
      <span className='orange_gradient'>Experiences you gather</span></h1>
      <p className='lg:text-xl max-w-3xl text-center px-3'>
        TipOff is an open-world Experiences sharing tool for 
        the modern world to discover, and share your valuable 
        tips. Explore new places & Share your guidance here.
      </p>
      <Feed/>
    </section>
  )
}
