import React, { useState, useCallback } from "react";

// ImageUploadField props type
interface ImageUploadFieldProps {
  multiple?: boolean;
  onImagesChange: (images: File[]) => void; // Callback to update parent component
  setError: (message: string) => void; //Callback to set an error message (empty string to clear error state)
}

const useImageUpload = (
  onImagesChange: (images: File[]) => void,
  setError: (message: string) => void,
  multiple = false
) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Utility to update both images and previews
  const updateImagesAndPreviews = useCallback(
    (newImages: File[]) => {
      setImages(newImages);
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
      onImagesChange(newImages);
      setError("");
    },
    [onImagesChange, setError]
  );

  // Adds new images, filtering out duplicates and oversized files
  const addImages = useCallback(
    (newFiles: File[]) => {
      const filteredFiles = newFiles.filter(
        (file) =>
          file.size <= 3145728 && !images.some((img) => img.name === file.name)
      );
      if (multiple && images.length + filteredFiles.length > 5) {
        filteredFiles.length = 5 - images.length; // Adjust the array length to enforce the limit
      }

      updateImagesAndPreviews([...images, ...filteredFiles]);
    },
    [images, multiple, updateImagesAndPreviews]
  );

  // Replace or remove image logic
  const modifyImage = useCallback(
    (file: File | null, index: number) => {
      if (!file) {
        // For deletion
        updateImagesAndPreviews(images.filter((_, i) => i !== index));
        return;
      }

      // For replacement
      const newImages = [...images];
      newImages[index] = file;
      updateImagesAndPreviews(newImages);
    },
    [images, updateImagesAndPreviews]
  );

  return { images, previews, addImages, modifyImage };
};

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  multiple = false,
  onImagesChange,
  setError,
}) => {
  const { images, previews, addImages, modifyImage } = useImageUpload(
    onImagesChange,
    setError, // Pass setError to the hook
    multiple
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      addImages(Array.from(event.target.files));
    }
  };

  const changeImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const isDuplicate = images.some(
      (existingFile, idx) => idx !== index && existingFile.name === file.name
    );
    if (isDuplicate) {
      setError(
        "This image is already selected. Please choose a different image."
      );
      return;
    } else if (file.size > 3145728) {
      setError("File is too large. Please select a file less than 3MB.");
      return;
    }
    modifyImage(file, index);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-10 md:gap-4 justify-center md:justify-start p-4 md:p-0">
        {previews.length > 0 && (
          <>
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative group w-32 h-32 md:w-24 md:h-24 lg:w-32 lg:h-32"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transition duration-300 ease-in-out transform md:group-hover:scale-105"
                />
                <div className="absolute w-full h-full inset-0 flex justify-between items-start p-2 opacity-100 md:opacity-0 rounded-lg md:group-hover:opacity-100 md:group-hover:scale-105 md:bg-[rgba(0,0,0,.4)] transition duration-300 ease-in-out text-white">
                  {" "}
                  <button
                    aria-label="Delete image"
                    className="p-2 absolute -right-4 -top-4 bg-[rgba(0,0,0,.6)] rounded-lg z-10 radius-5 md:bg-transparent md:-right-1 md:-top-1 text-white hover:text-red-600 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      modifyImage(null, index);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <label className="p-2 absolute -left-4 -top-4 bg-[rgba(0,0,0,.6)] rounded-lg z-10 radius-5 md:bg-transparent md:-left-1 md:-top-1 text-white hover:text-blue-600 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => changeImage(e, index)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </>
        )}

        {(multiple ? images.length < 5 : images.length === 0) && (
          <label className="relative w-32 h-32 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex flex-col justify-center items-center bg-white bg-opacity-10 rounded-lg cursor-pointer border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300 ease-in-out group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-500 group-hover:text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            <span className="text-sm text-blue-500 group-hover:text-blue-700">
              Add Image
            </span>
            <input
              type="file"
              multiple={multiple}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploadField;
