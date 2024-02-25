export default class ManageDoc{
  #blocks = [];
  #docId = null;
  #userId = null;
  #title = "";

  constructor({docId=null, userId=null}) {
    if (!docId) throw ('doc id missed!!');
    this.#docId = docId;
  }

  async fetch() {
    try {
      const res = await fetch(`/api/get-doc`, {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({ docId: this.#docId })
      });
      const { doc } = await res.json();

      this.#title = doc.title;
      this.#blocks = [...doc.blocks];
    } catch (error) {
      console.log('(ManageDoc) cannot fetch doc : ', error.message);
    }
  }

  async upload() {
    try {
      // const docId = this.#docId;
      // const title = this.#title;
      // const blocks = [...this.#blocks];
      const res = await fetch('/api/upload-doc', {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
          docId: this.#docId,
          title: this.#title,
          blocks: this.#blocks,
        })
      });
      const { status, message } = await res.json();
      console.log(status, message);
      
    } catch (error) {
      console.log('(ManageDoc)cannot upload doc : ', error.message);
    }
  }

  async splitDoc({ fst, lst }) {
    try {
      // 1. extract blocks
      const length = lst - fst + 1;
      const blocks = this.#blocks.splice(fst, length);
      // 2. create new doc
      const res = await fetch('/api/create/doc', {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({ userId: this.#userId, title: this.#title, blocks: blocks })
      });
      // 3. insert new block in blocks of this doc that refers new doc
      const { docId } = await res.json();
      const newBlock = {
        type: "in",
        content: docId
      };
      this.#blocks.splice(fst, 0, newBlock);
    } catch (error) {
      console.log('(ManageDoc)cannot split doc : ', error.message);
    }
  }

  get blocks() {
    return this.#blocks;
  }
  set blocks(newBlocks) {
    this.#blocks = newBlocks;
  }
  get title() {
    return this.#title;
  }
  set title(newTitle) {
    this.#title = newTitle;
  }
}