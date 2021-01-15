const router = require("express").Router();
const Query = require("../config/mysql");
const authJwt = require("../middleware/jwt.middleware");

router.get("/all", authJwt, async (req, res) => {
  try {
    const posts_q = `SELECT posts.id, posts.create_at, posts.url , users.username, users.profilePhotoUrl 
    FROM posts inner join users where posts.userId = users.id;`;
    let posts = await Query(posts_q);

    for (let i = 0; i < posts.length; i++) {
      const postLikes_q = `SELECT userWhoLikeId as userId, users.username FROM likes
      inner join users on users.id = userWhoLikeId  where postId = ?
     `;
      const postComments_q = `SELECT users.username as commentUserUsername, users.profilePhotoUrl, comments.id,  comments.commentUserId, comments.create_at, 
      comments.comment FROM comments inner join users on comments.commentUserId = users.id where postId = ?;`;

      const likes = await Query(postLikes_q, posts[i].id);
      const comment = await Query(postComments_q, posts[i].id);

      posts[i] = { ...posts[i], likes, comment };
    }

    res.status(200).send({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.post("/like", authJwt, async (req, res) => {
  try {
    const { postId } = req.body;
    const like_q = `insert into likes (userWhoLikeId, postId)
    values (?, ?)`;
    await Query(like_q, req.user.id, postId);
    const newLike = { userId: req.user.id, username: req.user.username };
    res.status(201).send({ newLike });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.delete("/unlike/:postId", authJwt, async (req, res) => {
  try {
    const { postId } = req.params;
    const unlike_q = `delete from likes where userWhoLikeId = ? and postId = ?`;
    await Query(unlike_q, req.user.id, postId);

    res.status(200).send({ userId: req.user.id });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.post("/comment", authJwt, async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const addComment_q = `insert into comments (commentUserId, postId, comment) 
    values (?, ?, ?)`;
    await Query(addComment_q, req.user.id, postId, comment);
    const lastComment_q = `SELECT users.username as commentUserUsername, users.profilePhotoUrl, comments.id,  comments.commentUserId, comments.create_at, 
    comments.comment FROM comments inner join users on comments.commentUserId = users.id WHERE comments.id = @@Identity`;
    const lastComment = await Query(lastComment_q);
    res.status(201).send({ comment: lastComment[0] });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.post("/add", authJwt, async (req, res) => {
  try {
    console.log(req.user.id);
    const { url } = req.body;
    const newPost_q = `insert into posts (userId, url) 
        values (?, ?)`;
    await Query(newPost_q, req.user.id, url);
    res.status(201).send({ message: "newPostCreated" });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Try again later." });
  }
});

module.exports = router;
