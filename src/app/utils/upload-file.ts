import { storage } from "@/app/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File) => {
  if (!file) return;

  // Create a storage reference
  const storageRef = ref(storage, `images/${file.name}`);

  // Upload file
  const snapshot = await uploadBytes(storageRef, file);

  // Get the URL of the uploaded file
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
