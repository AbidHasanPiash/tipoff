import PromptCard from "./PromptCard"

export default function Profile({name, desc, data, handleEdid, handleDelete}) {
  return (
    <section className="w-full max-w-full p-10 flex flex-col items-start">
      <h1 className="text-6xl font-extrabold">
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='py-5 text-xl'>{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map(post=>(
          <PromptCard 
            key={post._id}
            post={post}
            handleEdit={()=> handleEdid && handleEdid(post)}
            handleDelete={()=> handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}
