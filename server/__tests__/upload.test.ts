import http from "http";
import supertest from "supertest";
import { readFile } from "fs/promises";
import { resolve } from "path";

import UploadController from "../src/resources/upload.controller";
import App from "../app";

const app = new App([new UploadController()]);

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = supertest(http.createServer(await app.express));
});

describe("POST /api/upload", () => {
  let testImage: Buffer;

  test("Upload image to AWS", async () => {
    try {
      testImage = await readFile(resolve("./test-upload/shepherd.jpg"));

      if (testImage) {
        const response = await request
          .post("/api/upload")
          .set("Content-Type", "multipart/form-data")
          .attach("image", testImage);

        expect(response.status).toEqual(200);
        expect(response.body.imageUrl).toBeTruthy();
        expect(response.body.imageUrl.length).toBeGreaterThan(0);
      } else {
        throw new Error("File not found");
      }
    } catch (error) {}
  });
});
