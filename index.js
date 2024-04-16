const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const app = express()
const router = express.Router()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;
const PASSWORD = process.env.PASSWORD;

const POSTCONTROLLER = require("./routes/postController");


app.get('/', (req, res) => {
  res.send("FUNCIONOU")
})

//GET POSTAGEM
router.get('/posts', POSTCONTROLLER.findAllPosts)

//GET ONE POSTAGEM
router.get('/posts', POSTCONTROLLER.searchPosts)

//CRIAR POSTAGEM
router.post('/createpost', POSTCONTROLLER.createPost)

//UPDATE POSTS
router.put('/updatepost/:id', POSTCONTROLLER.updatePost)

//DELETE POSTS
router.delete('/deletepost/:id', POSTCONTROLLER.deletePost)

app.use('/api', router);

mongoose.connect(`mongodb+srv://calielalbuquerque7:${PASSWORD}@cluster0.fqj5xa3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  console.log("Banco conectado")
}).catch((err) => {
  console.error(err)
})

app.listen(PORT, () => {
  console.log("Servidor ONLINE")
})