import multer from "multer";
import slugify from "slugify";
import slugifyConfig from "./slugify";
import { resolve } from "path";

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", "public", "static", "uploads"),
        filename: (req, file, callback) => {
            const hash = new Date().getTime();
            const ext = file.originalname.split(".")[1];
            let fileName = file.originalname.split(".")[0]
            fileName = slugify(fileName, slugifyConfig)
            const fullFileName = `${hash}-${fileName}.${ext}`;
            req.body.poster = fullFileName;
            callback(null, fullFileName);
        }
    })
}