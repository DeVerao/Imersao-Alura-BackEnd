import conectarAoBanco from "../config/dbconfig.js";

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

export { getAllPosts, createPost };