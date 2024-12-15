import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary(null); // Clear previous summary
    setError(""); // Clear previous error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (
        response.data.summary &&
        response.data.summary.objectives &&
        response.data.summary.inclusion_exclusion_criteria &&
        response.data.summary.methodology
      ) {
        setSummary(response.data.summary);
        // Store the summary in localStorage to access on the next page
        localStorage.setItem("summary", JSON.stringify(response.data.summary));
        navigate("/summary");
      } else {
        setError("No valid summary generated.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Upload for Summary</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv, .pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadPage;
