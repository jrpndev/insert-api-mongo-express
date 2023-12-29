import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadFile = async (owner, bookId, file, metadata,name) => {
    try {

      const storage = getStorage();
      const storageRef = ref(storage, `books/${owner}/${bookId}/${name}`);
      await uploadBytes(storageRef, file, metadata);
      return getDownloadURL(storageRef);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to upload file.');
    }
  };

export default uploadFile;