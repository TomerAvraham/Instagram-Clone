const router = require("express").Router();
const Query = require("../config/mysql");
const authJwt = require("../middleware/jwt.middleware");

router.get("/all", authJwt, async (req, res) => {
  try {
    const allProfiles_q = `SELECT users.id, users.username, users.profilePhotoUrl FROM users`;
    const profiles = await Query(allProfiles_q);
    res.status(200).send({ profiles });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.get("/:id", authJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const postsDetails_q = `select posts.id, posts.url,
    count(distinct likes.id) as numberOfLikes,
    count(distinct comments.id) as numberOfComments
    from posts
    left join likes on likes.postId = posts.id
    left join comments on comments.postId = posts.id
    where posts.userId = ? group by 1 `;

    const userDetails_q = `select users.username, users.username,
    users.profilePhotoUrl, users.email, 
    (SELECT count(followers.userWhoFollowingAfterId) from followers where userWhoFollowingAfterId = ${id})as followers,
	  (SELECT count(followers.userId) from followers where userId = ${id} ) as following,
    (SELECT EXISTS(SELECT * FROM followers WHERE userId = ${req.user.id} and userWhoFollowingAfterId = ${id}))
    as isCurrUserFollow
    from users
    left join followers on followers.userWhoFollowingAfterId = users.id
    where users.id = ? group by 1`;

    const profilePosts = await Query(postsDetails_q, id);
    const profileUserDetails = await Query(userDetails_q, id);

    return res.status(200).send({ profilePosts, profileUserDetails });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.post("/follow", authJwt, async (req, res) => {
  try {
    const { id } = req.body;
    const follow_q = `insert into followers(userId, userWhoFollowingAfterId)
    values(?, ?)`;

    await Query(follow_q, req.user.id, id);
    res.status(201).send({ message: "Follow Success" });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.delete("/unFollow/:id", authJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const unFollow_q = `delete from followers where userId = ${req.user.id} and userWhoFollowingAfterId = ${id}`;

    await Query(unFollow_q, id);
    res.status(200).send({ message: "unFollow Success" });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

router.put("/edit", authJwt, async (req, res) => {
  try {
    const { newUsername, newProfileUrl } = req.body;
    let editProfile_q = "";
    if (!newUsername && newProfileUrl) {
      editProfile_q = `update users set profilePhotoUrl = "${newProfileUrl}" where id = ?`;
    } else if (newUsername && !newProfileUrl) {
      editProfile_q = `update users set username = "${newUsername}" where id = ?`;
    } else if (newUsername && newProfileUrl) {
      editProfile_q = `update users set profilePhotoUrl = "${newProfileUrl}", username = "${newUsername}" where id = ?`;
    } else if (!newUsername && !newProfileUrl) {
      res.status(500).send({ message: "No details" });
    }
    await Query(editProfile_q, req.user.id);

    return res.redirect(303, `/api/profile/${req.user.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something want wrong. Please try again" });
  }
});

module.exports = router;
