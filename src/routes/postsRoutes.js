import express from "express";
import { listAllPosts, postNewPost, uploadImage } from "../controller/postsController.js";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "./uploads/"),
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
});

const routes = (app) => {
    app.use(express.json());
    app.get("/posts", listAllPosts);

    app.get("/posts/:id", listAllPosts);
    app.post("/post", postNewPost);
    app.post("/upload", upload.single("image"), uploadImage);
}

export default routes;