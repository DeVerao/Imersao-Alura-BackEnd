import { getAllPosts, createPost, updatePost, deletePost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

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

    try{
        const imgBuffer = fs.readFileSync(`./uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        };

        const createNewPost = await updatePost(id, post);;
        res.status(201).json(createNewPost);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
};

async function deleteOnePost(req, res) {
    const id = req.params.id;
    try{
        const deletedPost = await deletePost(id);
        res.status(200).json(deletedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}

export { listAllPosts, postNewPost, uploadImage, updateNewPost, deleteOnePost };