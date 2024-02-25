import { connectToDB } from "@/lib/db/database";
import Doc from "@/lib/db/models/doc";

export async function POST(request) {
  try {
    const {docId, title, blocks} = await request.json();
    await connectToDB();
    let doc = await Doc.findOne({ _id: docId });
    doc.title = title;
    doc.blocks = blocks;
    const res = await doc.save();
    // console.log('(upload-doc) updated doc: ', doc);
  
    return Response.json({status:200, message:"doc updated!!"});
  } catch (error) {
    return Response.json({ status: 404, message: `error while updating doc : ${error.message}` });
  }

  // console.log('(upload-doc) docId : ', docId);
  // console.log('(upload-doc) title : ', title);
  // console.log('(upload-doc) blocks : ', blocks);
  

}