import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from "fs";

async function listAllPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts); 
};



async function postNewPost(req, res) {
    const newPost = req.body;
    try{
        const createNewPost = await createPost(newPost);
        res.status(201).json(createNewPost);
    } catch (error) {
        res.status(500).json({ error: "falha na requisição" });
    };
};

async function uploadImage(req, res) {
    const newPost = {
        descricao:"",
        imgUrl: req.file.originalname,
        alt:""
    }
    try{
        const createNewPost = await createPost(newPost);
        const updatedImage = `uploads/${createNewPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(201).json(createNewPost);
    } catch (error) {
        res.status(500).json({ error: "falha na requisição" });
    };
};

async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/uploads/${id}.png`;
    const post = {
        imgUrl: urlImg,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try{
        const createNewPost = await updatePost(id, post);;
        res.status(201).json(createNewPost);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
};
export { listAllPosts, postNewPost, uploadImage, updateNewPost };