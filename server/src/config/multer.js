import multer from "multer";
import Datauri from "datauri/parser";
import path from "path";

const dUri = new Datauri();
export const dataUri = (req) =>
    dUri.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
    );

const upload = multer({
    storage: multer.memoryStorage({}),
    limits: {
        fileSize: 5000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image"));
        }
        cb(null, true);
    },
});

export default upload;
