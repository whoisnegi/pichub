import cloudinary from "../config/cloudinary";
import Datauri from "datauri/parser";
import path from "path";

export default async function uploadFileToCloudinary(req) {
  const dUri = new Datauri();
  const dataUri = (req) =>
    dUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );
  const file = dataUri(req).content;
  const {
    url,
    public_id,
  } = await cloudinary.v2.uploader.upload(file);
  return { url, public_id };
}
