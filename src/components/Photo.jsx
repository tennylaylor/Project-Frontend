import React, { useState } from "react";

const Photo = ({ onBack }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Resize and compress image
  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let { width, height } = img;

        // Maintain aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          } else {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress the image
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImage = canvas.toDataURL("image/jpeg", 0.8); // 80% quality

        callback(resizedImage);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    resizeImage(selectedFile, 800, 600, (resizedImage) => {
      const newPhoto = {
        id: Date.now(),
        url: resizedImage,
        caption: "",
      };
      setPhotos([...photos, newPhoto]);
      setSelectedFile(null);
    });
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
            <img
              src={photo.url}
              alt="Fridge photo"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            />
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
