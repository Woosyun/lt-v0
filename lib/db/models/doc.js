import { Schema, model, models } from 'mongoose';

const contentSchema = new Schema({
  type: String,
  content: Schema.Types.Mixed
});

const DocSchema = new Schema({
  title: {
    type: String,
    // required: [true, 'Title is required'],
    // match: [/^[A-Za-z0-9]+$/, "unvalid title name!"]
  },
  // doc_type: {
  //   type: String,
  //   required: [true, 'doc\' s type is neccesary!']
  // },
  // owner: {
  // },
  // permission: {
  //   type: Number,
  //   required: [true, 'permission should be set']
  // },
  blocks: {
    type: [contentSchema]
  },
  // neighbors: {
  //   type: [contentSchema]
  // },
  // comments: {
  //   type: [String]
  // },
  // tags: {
  //   type: []
  // }
});

const Doc = models?.Doc || model("Doc", DocSchema);

export default Doc;