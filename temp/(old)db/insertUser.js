// import { MongoClient } from 'mongodb';
// import dbInfo from '@/lib/db/info';

// async function InsertDoc(doc) {
//   const client = new MongoClient(dbInfo.uri);

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const database = client.db(dbInfo.dbName);
//     const collection = database.collection(dbInfo.colName);

//     const result = await collection.insertOne(doc);
//     // console.log(`Inserted ${result.insertedCount} document into the collection`);

//     return result.insertedId;

//   } finally {
//     await client.close();
//     console.log('Connection to MongoDB closed');
//   }
// }

// export default InsertDoc