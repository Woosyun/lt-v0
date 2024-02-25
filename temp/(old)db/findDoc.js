import { MongoClient } from 'mongodb';

export const findDoc = async (query) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = database.collection(process.env.MONGODB_COLLECTION_NAME_DOC);

    const foundDocument = await collection.findOne(
      query,
      { projection: { _id: 0 } }
    );

    if (foundDocument) {
      console.log('Found document:', foundDocument);
    } else {
      console.log('Document not found');
    }
    
    return foundDocument;
  } catch(err) { 
    console.error(err);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

// find().catch(console.error);