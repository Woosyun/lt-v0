// mongoose는 browser에서 지원하지 않는다.

import { connectToDB } from "../lib/db/database";
import Doc from "../lib/db/models/doc";
import User from "../lib/db/models/user";

export async function getNewDocId({userId}) {
    await connectToDB();
    try {
        const doc = await Doc.create({
            title: 'title0'
        });
        const docTitle = doc.title;
        const docRef = 'doc';
        const docId = doc._id.toString();
        // console.log('title : ', docTitle);
        // console.log('Ref : ', docRef);
        // console.log('docId : ', docId);

        await User.findOneAndUpdate({ _id: userId }, { $push: { post: { docTitle,docRef, docId } } });

        return docId;
    } catch (error) {
        console.log('cannot get new doc id : ', error.message);
    }
}