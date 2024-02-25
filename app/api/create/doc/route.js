import { connectToDB } from "@/lib/db/database";
import Doc from "@/lib/db/models/doc";
import User from "@/lib/db/models/user";

export async function POST(request) {
  try {
    const { userId, title, blocks } = await request.json();
    // console.log('(api/create/doc) recieved userId : ', userId);

    await connectToDB();

    const newTitle = title || Date().toString();
    const newBlocks = blocks || [];
    
    
    const doc = await Doc.create({
      title: newTitle,
      blocks: newBlocks
    });
    // const docId = doc._id.toString();
    const docId = doc._id.toString();
    const docTitle = doc.title;
    const docRef = 'doc';

    const user = await User.findOneAndUpdate({ _id: userId }, {
      $push: {
        posts: {
          ref: docRef,
          id: docId
        }
      }
    });
    // console.log('(api/create/doc) updated user : ', user);

    return Response.json({ docId });
  } catch (error) {
    console.log('cannot create doc : ', error.message);
  }
}