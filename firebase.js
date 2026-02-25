import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAR0ed_Xfvw6_hF21uwEU2NpO2-Cts_A0k",
  authDomain: "star-boys-1d890.firebaseapp.com",
  projectId: "star-boys-1d890",
  storageBucket: "star-boys-1d890.appspot.com",
  messagingSenderId: "718247990043",
  appId: "1:718247990043:web:d257a07140070d568b79be"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Upload files
export async function uploadFile(file, folder){
  const storageRef = ref(storage, `${folder}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
