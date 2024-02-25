import { connectToDB } from "@/lib/db/database";
import Doc from "@/lib/db/models/doc";
import User from "@/lib/db/models/user";

export async function POST(request) {
  try {
    const {userId} = await request.json();

    connectToDB();
    const { posts } = await User.findById(userId).select({ posts:1 });
    // const { posts } = await User.findOne({ _id: userId }).select({ posts:1 });
    //get title
    let postIds = posts.map((post) => post.id);
    // console.log('(api/dashboard) postIds : ', postIds);

    let updatedPosts = await Doc.find({ _id: { $in: postIds } }, { _id: 1, title: 1 }).lean();
    // console.log('(api/dashboard) updatedPosts : ', updatedPosts);
  
    return Response.json({
      posts: updatedPosts
    })
  } catch (error) {
    console.log('cannot get dashboard : ', error.message);
  }
}