import express, { Application } from "express";
import cors from "cors";
import ErrorMiddleware from "./src/utils/error.middleware";
import { IController } from "resources/upload.controller";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: IController[], port?: number) {
    this.express = express();
    this.port = Number(process.env.PORT || port);

    this.initialiseMiddleware();
    this.intialiseControllers(controllers);
    this.initialiseErrorMiddleware();
  }

  private initialiseMiddleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  private intialiseControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialiseErrorMiddleware(): void {
    this.express.use(ErrorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () =>
      console.log(`Server running on PORT ${this.port}`)
    );
  }
}

export default App;
