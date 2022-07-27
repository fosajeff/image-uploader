import React, { useMemo } from "react";
import { Alert, Button, CardSubtitle, CardTitle } from "reactstrap";
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

const Upload = ({ onUpload: uploadFile }) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    noClick: true,
    noKeyboard: true,
    maxSize: 2097152, // 2MB
  });

  if (acceptedFiles.length > 0) {
    uploadFile(acceptedFiles[0]);
  }

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
    <Layout className="pt-4 text-center">
      <CardTitle tag="h2" className="text-muted">
        Upload your image
      </CardTitle>

      {fileRejections.length > 0 ? (
        <Alert className="my-4 py-2" color="danger">
          <small>
            File type must be JPEG | JPG | PNG and not larger than 2MB
          </small>
        </Alert>
      ) : (
        <CardSubtitle className="py-4 mb-3 text-muted" tag="h6">
          File should be Jpeg, Png...
        </CardSubtitle>
      )}

      <div className="image-dropzone" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img src={imgIcon} width="130" alt="upload" className="mt-4" />
        <p className="my-sm-5 my-4">Drag & drop your image here</p>
      </div>

      <div className="pt-4 text-muted">Or</div>

      <Button onClick={open} color="primary" className="mt-sm-4 mt-3 px-3">
        Choose a file
      </Button>
    </Layout>
  );
};

export default Upload;
