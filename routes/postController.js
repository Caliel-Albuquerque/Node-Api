const Post = require("../models/Post")

exports.createPost = async (req, res) => {
  try {
    const { name, content, image, datePost } = req.body;
    const post = new Post({ name, content, image, datePost })

    await post.save();
    res.status(201).send({ message: "Post adicionado com sucesso", post })

  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.findAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).send(posts);

  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const updates = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o post' });
  }
}

exports.searchPosts = async (req, res) => {
  try {
    const query = req.query.q;
    const searchResults = await Post.find({ $text: { $search: query } });
    res.status(200).json(searchResults);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao realizar a pesquisa' });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id; 

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
  
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir o post' });
  }
};