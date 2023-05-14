'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

export default function CreatePost() {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag:'',
    });
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId:session?.user.id,
                    prompt:post.prompt,
                    tag:post.tag
                })
            })
            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
          }
    }
  return (
    <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={createPrompt}
    />
  )
}
