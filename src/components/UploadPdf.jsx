import React, { useState } from 'react';
import './uploadPdf.css';
const UploadPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus("");
    } else {
      setUploadStatus("Por favor, selecione um arquivo PDF.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Por favor, selecione um arquivo PDF.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/employees/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (response.ok) {
        setUploadStatus("Upload e processamento bem-sucedidos!");
      } else {
        setUploadStatus("Ocorreu um erro durante o upload.");
      }
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      setUploadStatus("Erro ao enviar o arquivo.");
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          className="file-input" 
        />
        <button type="submit" className="upload-button">Enviar PDF</button>
      </form>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default UploadPdf;
