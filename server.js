import express from "express";

const app = express();
app.use(express.json());
const posts = [
    {
        id: 1,
        descricao: "Um gatinho branco e fofo com olhos azuis brilhantes.",
        imagem: "https://example.com/gatinho1.jpg"
    },
    {
        id: 2,
        descricao: "Gatinho malhado com uma personalidade muito curiosa.",
        imagem: "https://example.com/gatinho2.jpg"
    },
    {
        id: 3,
        descricao: "Um persa elegante com pelos longos e sedosos.",
        imagem: "https://example.com/gatinho3.jpg"
    },
    {
        id: 4,
        descricao: "Gatinho siamês com olhos azuis intensos e corpo esbelto.",
        imagem: "https://example.com/gatinho4.jpg"
    },
    {
        id: 5,
        descricao: "Um gatinho ruivo com um rabo bem peludo.",
        imagem: "https://example.com/gatinho5.jpg"
    }
];

function buscarPostPorId(id){
    return posts.findIndex((post)=> {
        return post.id === Number(id)
    } )
}

app.listen(3000, ()=>{console.log("Server running on port 3000")} );
app.get("/posts", (req, res) => {
    res.status(200).json(posts); 
});

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});
