import React, { useState } from "react";

const Photo = ({ onBack }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhoto = {
        id: Date.now(),
        url: reader.result,
        caption: "",
      };
      setPhotos([...photos, newPhoto]);
      setSelectedFile(null);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemovePhoto = (photoId) => {
    setPhotos(photos.filter((photo) => photo.id !== photoId));
  };

  const handleCaptionChange = (photoId, newCaption) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === photoId ? { ...photo, caption: newCaption } : photo
      )
    );
  };

  return (
    <div className="photo-gallery">
      <button onClick={onBack} className="mb-4">
        Back to Home
      </button>

      <div className="upload-controls">
        <input type="file" accept="image/*" onChange={handleFileSelect} />
        <button onClick={handleUpload} disabled={!selectedFile}>
          Upload Photo
        </button>
      </div>

      <div className="photos-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt="Fridge photo" />
            <input
              type="text"
              value={photo.caption}
              onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
              placeholder="Add a caption"
            />
            <button onClick={() => handleRemovePhoto(photo.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photo;
