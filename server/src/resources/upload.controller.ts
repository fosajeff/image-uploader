import { NextFunction, Request, Response, Router } from "express";
import HttpException from "../utils/http.exception";
import upload from "../utils/multer";

export interface IController {
  router: Router;
  path: string;
}

class UploadController implements IController {
  public router = Router();
  public path = "/upload";

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(this.path, upload.single("image"), this.upload);
  }

  private async upload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    if (!req.file) {
      return next(new HttpException(400, "Could not upload file"));
    } else {
      res.send({
        imageUrl: (req.file as Express.MulterS3.File).location,
      });
    }
  }
}

export default UploadController;
