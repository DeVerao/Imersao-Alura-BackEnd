import conectarAoBanco from "../config/dbconfig.js";
import { ObjectId } from "mongodb";
import 'dotenv/config';

//O arquivo models lida com toda interaçção direta com o banco de dados.

const dbconection = await conectarAoBanco(process.env.STRING_CONECTION);

async function getAllPosts() { // função que retorna todos os posts
    const db = dbconection.db("MyPrivateDataBase");
    const colection = db.collection("posts");
    return colection.find().toArray();
};
async function createPost(newPost) { // funcao que cria um novo post
    const db = dbconection.db("MyPrivateDataBase");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
};

async function updatePost(id, newPost) { // funcao que atualiza um post
    const db = dbconection.db("MyPrivateDataBase");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objID)}, {$set:newPost});
};

async function deletePost(id) { // funcao que deleta um post
    const db = dbconection.db("MyPrivateDataBase"); 
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return collection.deleteOne({_id: new ObjectId(objID)});
}


export { getAllPosts, createPost, updatePost, deletePost };