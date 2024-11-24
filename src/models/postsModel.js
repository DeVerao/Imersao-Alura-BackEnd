import conectarAoBanco from "../config/dbconfig.js";
import { ObjectId } from "mongodb";
import 'dotenv/config';

const dbconection = await conectarAoBanco(process.env.STRING_CONECTION);

async function getAllPosts() {
    const db = dbconection.db("MyPrivateDataBase");
    const colection = db.collection("posts");
    return colection.find().toArray();
};
async function createPost(newPost) {
    const db = dbconection.db("MyPrivateDataBase");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
};

async function updatePost(id, newPost) {
    const db = dbconection.db("MyPrivateDataBase");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objID)}, {$set:newPost});
};

export { getAllPosts, createPost, updatePost };