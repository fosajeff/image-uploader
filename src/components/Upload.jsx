import React, { useMemo } from "react";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { useDropzone } from "react-dropzone";
import Layout from "./Layout";

import imgIcon from "../assets/image.svg";

const baseStyle = {};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Upload = () => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] } });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Layout>
      <Card body className="p-sm-4 p-3">
        <CardBody>
          <CardTitle tag="h2" className="text-muted">
            Upload your image
          </CardTitle>
          <CardSubtitle className="py-4 mb-3 text-muted" tag="h6">
            File should be Jpeg, Png...
          </CardSubtitle>

          <div className="image-dropzone" {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <img src={imgIcon} width="130" alt="upload" className="mt-4" />
            <p className="my-sm-5 my-4">Drag & drop your image here</p>
          </div>

          <div className="pt-4 text-muted">Or</div>

          <Button color="primary" className="mt-sm-4 mt-3 px-3">
            Choose a file
          </Button>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Upload;
