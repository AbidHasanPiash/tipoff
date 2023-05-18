import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        if(!prompt) return new Response("Prompt not found!", {status:404});
        const totalLikes = prompt.likes;
        return new Response(JSON.stringify(totalLikes), {status:200});
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status:500});
    }
}