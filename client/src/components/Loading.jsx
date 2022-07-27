import React from "react";
import { CardTitle, Progress } from "reactstrap";
import Layout from "./Layout";

const Loading = ({ progress }) => {
  return (
    <Layout>
      <CardTitle tag="h4" className="text-muted mb-5">
        Uploading...
      </CardTitle>
      <Progress value={progress} />
    </Layout>
  );
};

export default Loading;
