import express from "express";
import { listAllPosts, postNewPost, updateNewPost, uploadImage, deleteOnePost } from "../controller/postsController.js";
import multer from "multer";
import cors from "cors";

const corsOptions = {   
    origin: '*',
    optionsSuccessStatus: 200
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "./uploads/"),
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listAllPosts);

    app.get("/posts/:id", listAllPosts);
    app.post("/post", postNewPost);
    app.post("/upload", upload.single("image"), uploadImage);
    app.put("/update/:id", updateNewPost);
    app.delete("/delete/:id", deleteOnePost);
}

export default routes;