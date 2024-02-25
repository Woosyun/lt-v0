import InsertDoc from "@/temp/(old)db/insertDoc";

const getNewDocId = () => {
  const result = InsertDoc({});
  const defaultDocId = result.insertedId;

  return defaultDocId
}

export default getNewDocId