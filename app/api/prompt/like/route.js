import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async (req, res) => {
  const { postId, userId } = await req.json();
  let liked = false;
  try {
    await connectToDB();
    // Find the post
    const post = await Prompt.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userLiked = post.likedBy.includes(userId);

    if (userLiked) {
      // Remove user's like from post and user's likedPosts array
      await Promise.all([
        Prompt.findByIdAndUpdate(
          postId,
          { $pull: { likedBy: userId }, $inc: { likes: -1 } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          userId,
          { $pull: { likedPosts: postId } }
        ),
      ]);
      liked = false;
      // res.status(200).json(liked);
      return new Response(liked, { status: 200 });
    } else {
      // Add user's like to post and user's likedPosts array
      await Promise.all([
        Prompt.findByIdAndUpdate(
          postId,
          { $push: { likedBy: userId }, $inc: { likes: 1 } },
          { new: true }
        ),
        User.findByIdAndUpdate(
          userId,
          { $push: { likedPosts: postId } }
        ),
      ]);
      liked = true;
      // res.status(200).json(liked);
      return new Response(liked, { status: 200 });
    }
  } catch (error) {
    return new Response(liked, { status: 500 });
  }
}