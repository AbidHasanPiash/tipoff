import PromptCard from "./PromptCard"

export default function Profile({name, desc, data, handleEdid, handleDelete}) {
  return (
    <section className="w-full max-w-full p-10 flex flex-col items-start">
      <h1 className="text-6xl font-extrabold">
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='py-5 text-xl'>{desc}</p>
      <div className="feed">
      <h1 className="text-start w-full text-4xl font-bold green_gradient">{name === 'My' ? name:`${name}'s`} posts </h1>
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(post=>(
          <PromptCard 
            key={post._id}
            post={post}
            handleEdit={()=> handleEdid && handleEdid(post)}
            handleDelete={()=> handleDelete && handleDelete(post)}
          />
        ))}
      </div>
      </div>
    </section>
  )
}
