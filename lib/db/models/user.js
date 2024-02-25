import { Schema, model, models } from 'mongoose';

const groupSchema = new Schema({
    ref: String,
    id: Schema.Types.ObjectId,
    role: String
});
const postSchema = new Schema({
    ref: String,
    id: Schema.Types.ObjectId
});

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    name: {
        type: String,
        required: [true, 'name is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    // groups: {
    //     type: [groupSchema]
    // },
    posts: {
        type: [postSchema]
    }
});

const User = models?.User || model("User", UserSchema);

export default User;