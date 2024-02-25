import { connectToDB } from "@/lib/db/database"
import Doc from "@/lib/db/models/doc";

export async function POST(request) {
  const { docId } = await request.json()

  await connectToDB();
  const doc = await Doc.findOne({ _id: docId }, { title:1, blocks:1, comments:1});

  return Response.json({ doc });
}