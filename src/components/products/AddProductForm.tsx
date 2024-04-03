"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { uploadImage } from "@/app/utils/upload-file";
import prisma from "@/app/utils/db";
import ImageUploadField from "../images/ImageUploadField";

declare type Product = {
  name: string;
  description: string;
  images: string[];
};

export default function CreateProductForm() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imagesError, setImagesError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).slice(0, 5); // Limit to the first 5 files
    const filteredFiles = selectedFiles.filter((file) => file.size <= 3145728); // Filter out files larger than 3MB

    // Generate previews
    const newImagePreviews = filteredFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagePreviews(newImagePreviews);
    setImages(filteredFiles); // Update the state with filtered files
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    // Example upload logic (placeholder)
    const uploadedUrls = await Promise.all(
      images.map(async (file) => {
        const url = await uploadImage(file);
        console.log("Uploaded image URL:", url);
        return url;
      })
    );

    const productData = {
      name: productName,
      description,
      images: uploadedUrls,
    };

    // Reset the form (optional)
    setProductName("");
    setDescription("");
    setImages([]);
    setImagePreviews([]);
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name:
        </label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="images"
          className="block text-sm font-medium text-gray-700"
        >
          Product Images:
        </label>
        <ImageUploadField
          multiple
          onImagesChange={setImages}
          setError={(message: string) => setImagesError(message)}
        />
        {imagesError && <p className="text-red-500">{imagesError}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt="Preview"
            className="rounded-lg h-40 object-cover"
          />
        ))}
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {uploading ? "Uploading..." : "Create Product"}
      </button>
    </form>
  );
}
