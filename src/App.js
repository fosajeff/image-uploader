import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import Result from "./components/Result";
import Upload from "./components/Upload";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState({});

  const apiLink =
    process.env.NODE_ENV === "production"
      ? "https://peejay-image-uploader-backend.herokuapp.com/api"
      : "http://localhost:4040/api";

  const axiosInstance = axios.create({
    baseURL: apiLink,
  });

  useEffect(() => {
    handleRetryUpload();
  }, []);

  const handleRetryUpload = () => {
    setIsLoading(false);
    setIsFinished(false);
    setError({});
    setImageUrl("");
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      setImageUrl(response.data.imageUrl);
      setIsLoading(false);
      setIsFinished(true);
    } catch (error) {
      setError(error.response.data);
      setIsLoading(false);
      setIsFinished(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading progress={progress} />
      ) : isFinished ? (
        <Result
          retryUpload={handleRetryUpload}
          error={error}
          imageUrl={imageUrl}
        />
      ) : (
        <Upload onUpload={handleUpload} />
      )}
    </>
  );
}

export default App;
