import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("./uploads"));
routes(app);

function buscarPostPorId(id){
    return posts.findIndex((post)=> {
        return post.id === Number(id)
    } )
}

app.listen(3000, '0.0.0.0', ()=>{
    console.log("Server running on port 3000"
)} );




