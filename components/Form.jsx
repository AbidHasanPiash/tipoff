import Link from 'next/link'
import React from 'react'

export default function Form({type, post, setPost, submitting, handlesubmit}) {
  return (
    <section className='w-full max-w-full p-10 flex flex-col items-start'>
      <h1 className='text-6xl font-extrabold'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='py-5 text-xl'>
        Share the most exciting, exhilarating, and spine-chilling tales 
        and horrible extraordinary adventures!
      </p>
      <form 
        onSubmit={handlesubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <p className='font-semibold text-base'>
            Your tales
          </p>
          <textarea
            value={post.prompt}
            onChange={(e)=>setPost({...post, prompt: e.target.value})}
            placeholder='write your tales here..'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <p className='font-semibold text-base'>
            Tag <span className='text-xs opacity-70'> ( #place, #food, #transport )</span>
          </p>
          <input
            value={post.tag}
            onChange={(e)=>setPost({...post, tag: e.target.value})}
            placeholder="#Cox'sBazar"
            required
            className='form_input'
          />
        </label>
        <div className='flex items-center justify-end space-x-5'>
          <Link href={'/'}>Cancel</Link>
          <button 
            type='submit' 
            disabled={submitting}
            className='px-5 py-1.5 bg-blue-600 rounded-full'
          >
            {submitting?`${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  )
}
