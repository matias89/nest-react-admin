import axios from 'axios';
import React, { useState } from 'react';

const ImageUploader: React.FC<{
  userId: string;
  onChange: (filepath: string) => void;
}> = ({ userId, onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `/api/images/upload/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      onChange(response.data.filename);
      setMessage('Image uploaded successfully');
    } catch (error) {
      setMessage('Failed to upload image');
    }
  };

  return (
    <div>
      <h3>Upload Image</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-brand-primary text-white p-2 border rounded-md"
        >
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploader;
