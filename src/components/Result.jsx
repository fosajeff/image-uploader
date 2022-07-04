import React, { useRef, useState } from "react";
import { Button, CardTitle } from "reactstrap";
import Layout from "./Layout";

import successIcon from "../assets/success.png";
import errorIcon from "../assets/error.jpeg";
import previewImg from "../assets/test.jpg";
const Result = ({ imageUrl, error, retryUpload }) => {
  const [btnText, setBtnText] = useState("Copy link");

  const imageUrlTextArea = useRef(null);
  const displayLink = () => {
    const link = imageUrl;
    return `${link.slice(0, 48)}...`;
  };

  const handleCopy = () => {
    const element = imageUrlTextArea.current;
    document.getSelection().selectAllChildren(element);

    navigator.clipboard.writeText(imageUrl);

    setBtnText("Copied!");
    const timeoutId = setTimeout(() => {
      setBtnText("Copy link");
      clearTimeout(timeoutId);
    }, 1500);
  };

  return (
    <Layout className="pt-4">
      {imageUrl && (
        <>
          <div className="text-center pb-md-2">
            <div className="mb-3">
              <img width="40" src={successIcon} alt="success" />
            </div>
            <CardTitle tag="h4" className="text-muted mb-4 pb-2">
              Uploaded Successfully!
            </CardTitle>
            <div className="preview-img">
              <img width="100%" src={previewImg} alt="preview" />
            </div>
          </div>
          <div className="upload-result mt-md-4">
            <span ref={imageUrlTextArea}>{displayLink()}</span>
            <Button
              onClick={handleCopy}
              size="sm"
              color="primary"
              className="px-3 "
            >
              {btnText}
            </Button>
          </div>
          <div className="smaller-screen-btn">
            <Button
              onClick={handleCopy}
              block
              color="primary"
              className="px-3 mt-3 btn-2"
            >
              {btnText}
            </Button>
          </div>
        </>
      )}
      {!imageUrl && (
        <div className="text-center pb-2">
          <div className="mb-3">
            <img width="40" src={errorIcon} alt="success" />
          </div>
          <CardTitle tag="h4" className="text-danger mb-4 pb-2">
            Upload Failed!
          </CardTitle>
          <p className="text-muted pb-2">Could not upload image</p>
          <Button
            onClick={retryUpload}
            size="lg"
            block
            color="primary"
            className="mt-sm-4 mt-3 px-3"
          >
            Try Again
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default Result;
