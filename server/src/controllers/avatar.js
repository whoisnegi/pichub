import sharp from "sharp";
import User from "../models/user";
import uploadFileToCloudinary from "../utils/cloudinaryUpload";
import cloudinary from "../config/cloudinary";

class AvatarControl {
  static async uploadAvatar(req, res) {
    try {
      if (req.file) {
        req.file.buffer = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();

        if (req.user.avatar.public_id) {
          await cloudinary.v2.uploader.destroy(
            req.user.avatar.public_id
          );
        }
        const {
          url,
          public_id,
        } = await uploadFileToCloudinary(req);
        req.user.avatar.public_id = public_id;
        req.user.avatar.imageUrl = url;
        req.user.save();
        res.status(200).json({
          message: "Image uploaded successfully",
          data: req.user.avatar,
        });
      }
    } catch (e) {
      res.status(400).json({
        error: e.message,
        message:
          "Something went wrong while processing your request",
      });
    }
  }

  static multerErrHandler(err, req, res, next) {
    res.status(400).send({ error: err.message });
  }

  static async deleteAvatar(req, res) {
    if (!req.user.avatar) {
      return res
        .status(200)
        .json({ msg: "No profile pic found" });
    }
    try {
      await cloudinary.v2.uploader.destroy(
        req.user.avatar.public_id
      );
      req.user.avatar = undefined;
      await req.user.save();
      res.status(200).json({
        message: "Profile pic removed Successfully",
        error: null,
      });
    } catch (error) {
      res.status(400).json({ error: e.message });
    }
  }

  static async getAvatar(req, res) {
    try {
      const user = await User.findById(req.user._id);
      if (!user || !user.avatar) {
        return res.status(404).json({ error: "Not Found" });
      }
      res.status(200).json({
        message: "Success",
        image: user.avatar.imageUrl,
        error: "",
      });
    } catch (e) {
      res.status(400).send();
    }
  }
}

export default AvatarControl;
