import User from "../models/user";
import Post from "../models/post";

class UserControl {
  static async userProfile(req, res) {
    try {
      const posts = await Post.find({
        owner: req.user._id,
      }).sort({
        createdAt: -1,
      });
      const data = {
        user: req.user,
        posts,
      };
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async checkForUsername(req, res) {
    try {
      let user = await User.findOne({
        username: req.body.username,
      });
      if (user) {
        return res.status(200).json({
          statusCode: 200,
          message: "Username exists",
          result: true,
          error: "",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Username doesn't exist",
        result: false,
        error: "",
      });
    } catch (e) {
      res.json(e);
    }
  }

  static async updateUserProfile(req, res) {
    const updates = Object.keys(req.body);

    const allowedUpdates = [
      "name",
      "username",
      "age",
      "bio",
    ];

    //check for available username in front end
    const isvalidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isvalidOperation) {
      return res
        .status(400)
        .send({ error: "Invalid updates" });
    }
    try {
      updates.forEach(
        (update) => (req.user[update] = req.body[update])
      );
      await req.user.save();
      res.json({
        user: req.user,
        Result: "Updated Successfully",
      });
    } catch (e) {
      // validation failure
      res.status(400).json({
        error: e.message,
      });
    }
  }

  static async deleteUserProfile(req, res) {
    try {
      await req.user.remove(); //can also use findbyidanddelete
      // sendCancellationEmail(req.user.email, req.user.name);
      res.status(200).json({ message: "User Deleted" });
    } catch (err) {
      res.status(500).json({
        error: "Server Error",
      });
    }
  }

  static async openUserProfile(req, res) {
    let id = req.params.id;
    try {
      const user = await User.findById(id);
      const posts = await Post.find({ owner: id });
      res.json({ user, posts });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }

  static async followUser(req, res) {
    try {
      const followId = req.body.followId;
      const userId = req.user.id;

      const user = await User.findById(followId);

      // Check if the user is following the other user already
      if (
        user.followers.some(
          (follower) =>
            follower.userId.toString() === userId
        )
      ) {
        return res
          .status(400)
          .json({ msg: "Already following this user" });
      }

      user.followers.unshift({ userId: userId });
      await user.save();

      req.user.following.unshift({ userId: followId });
      await req.user.save();

      res.json({
        following: req.user.following,
        followers: user.followers,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async unFollowUser(req, res) {
    try {
      const unFollowId = req.body.unFollowId;
      const userId = req.user.id;

      const user = await User.findById(unFollowId);
      user.followers = user.followers.filter(
        (follower) => follower.userId.toString() !== userId
      );
      await user.save();

      req.user.following = req.user.following.filter(
        (follower) =>
          follower.userId.toString() !== unFollowId
      );
      await req.user.save();

      res.json({
        following: req.user.following,
        followers: user.followers,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

export default UserControl;
