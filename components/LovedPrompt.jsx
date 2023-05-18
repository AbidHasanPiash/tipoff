import PromptCard from "./PromptCard"

export default function LovedPrompt(data) {
    const length = Object.keys(data).length;
  return (
    <section className="w-full max-w-full p-10 flex flex-col items-start">
      <div className="feed">
      <h1 className="text-start w-full text-4xl font-bold green_gradient">Loved posts</h1>
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {   
            length === 0
            ?<p>There is no data</p>
            :data.map(post=>(
                <PromptCard 
                key={post._id}
                post={post}
                />
            ))
        }
      </div>
      </div>
    </section>
  )
}
