const Post = require('../models/Posts');
const fs = require('fs');

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`});
  post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id })
    .then((post) => {res.status(200).json(post)})
    .catch((error) => {res.status(404).json({error: error});
    }
  );
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllpost = (req, res, next) => {
  Post.find()
  .then((posts) => {res.status(200).json(posts)})
  .catch((error) => {res.status(400).json({error: error})}
  );
};

exports.likePost = (req, res, next) => {    
  const like = req.body.like;
  if (like == 1) {
    Post.updateOne({_id: req.params.id}, { $inc: { likes: 1}, $push: { usersLiked: req.body.userId}, _id: req.params.id })
      .then( () => res.status(200).json({ message: 'Vous aimez ce post !' }))
      .catch( error => res.status(400).json({ error}))

  } else if (like == -1) {
    Post.updateOne({_id: req.params.id}, { $inc: { dislikes: 1}, $push: { usersDisliked: req.body.userId}, _id: req.params.id })
      .then( () => res.status(200).json({ message: 'Vous n\'aimez pas ce post !' }))
      .catch( error => res.status(400).json({ error}))

  } else { 
    Post.findOne( {_id: req.params.id})
      .then( post => {
          if( post.usersLiked.indexOf(req.body.userId)!== -1){
            Post.updateOne({_id: req.params.id}, { $inc: { likes: -1},$pull: { usersLiked: req.body.userId}, _id: req.params.id })
              .then( () => res.status(200).json({ message: 'Vous n\'aimez plus ce post !' }))
              .catch( error => res.status(400).json({ error}))
              }
          else if( post.usersDisliked.indexOf(req.body.userId)!== -1) {
            Post.updateOne( {_id: req.params.id}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId}, _id: req.params.id})
              .then( () => res.status(200).json({ message: 'Vous aimez peut-être ce post !' }))
              .catch( error => res.status(400).json({ error}))
              }           
      })
      .catch( error => res.status(400).json({ error}))             
  }   
};