import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadFile = async (ownerId, itemId, file, metadata, name, type) => {
  try {

    const storage = getStorage();
    const storageRef = ref(storage, `${ownerId}/${itemId}/${type}/${name}`);
    await uploadBytes(storageRef, file, metadata);
    return getDownloadURL(storageRef);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to upload file.');
  }
};

export default uploadFile;