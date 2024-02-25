import { connectToDB } from "../lib/db/database";
import User from "../lib/db/models/user";
import Doc from "../lib/db/models/doc";

export default class Doc{
    #docId = null;
    #userId = null;
    #title = "";
    #blocks = [];
    #neighbors = [];
    #comments = [];

    defaultDoc(docType) {
        return ({
            title: 'Title',
            blocks: [],
            neighbors: [],
            comments: []
        })
    }

    constructor({docId, userId}) {
        if (!userId) throw ('userId is necessary');
        this.#userId = userId;
        this.#docId = docId;

        // const defaultDoc = this.defaultDoc();

        // this.#title = doc?.title || defaultDoc.title;
        // this.#blocks = doc?.contents || defaultDoc.contents;
        // this.#neighbors = doc?.neighbors || defaultDoc.neighbors;
        // this.#comments = doc?.comments || defaultDoc.comments;
    }

    async updateDoc() {
        const doc = Doc.findOne({ _id: this.#docId });
        
    }

    // async updateDB() {
        
    // }

    addBlocks(to, blocks) {
        if (to < 0 || to >= this.#blocks.length) throw ('cannot add because destination index is out of range');
        if (!blocks) throw ('cannot add because blocks is falsy');
        // if (!blocks) {
        //     blocks = 
        // }
        this.#blocks.splice(to, 0, ...blocks);
    }
    extractBlocks(from) {
        try {
            const len = from[1] - from[0] + 1;
            return li.splice(from[0], len);
        } catch (error) {
            throw ('cannot remove blocks : ', error);
        }
    }
    moveBlocks(from, to) {
        try {
            const blocks = this.extractBlocks(from);
            const idx = to > from[1] ? to - len : to;
            this.addBlocks(idx, blocks);
        } catch (error) {
            throw ('cannot move blocks : ', error);
        }
    }

    async createDoc(doc) {
        try {
            const newDoc = {
                ...this.defaultDoc(),
                ...doc
            };
            const docId = await Doc.create(newDoc).then(doc => doc._id);
            //TODO : add more data to help representing posts page
            await this.addPost({
                type:'docId',
                docId
            });

            return docId;
        } catch (error) {
            throw ('cannot create new doc : ', error);
        }
    }
    async splitDoc(from) {
        try {
            let blocks = [];
            if (from) {
                blocks = this.extractBlocks(from);
            }
            const doc = {
                ...this.defaultDoc(),
                blocks
            };
            const docId = this.createDoc(doc);
            const newBlock = {
                type: 'docId',
                content: String(docId)
            };
            this.#blocks.splice(from[0], 0, newBlock);
        } catch (error) {
            throw ('cannot derivate new doc : ', error);
        }
    }
    async addPost({ title, newDocId }) {
        try {
            await connectToDB();
            await User.findOneAndUpdate({ _id: this.#userId }, { $push: { post: {title, newDocId} } });       
        } catch (error) {
            throw ('cannot update list of post : ', error);
        }
    }

    createComment({ text }) {
        this.#comments.push({ text });
    }
    getComments() {
        return this.#comments;
    }

    get metadata(){
        return `
            title : ${this.#title}
            ${this.#blocks.length} blocks
            ${this.#neighbors.length} neighbors
        `
    }
}