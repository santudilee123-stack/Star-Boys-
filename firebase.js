// Firebase Modular SDK (v12)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAR0ed_Xfvw6_hF21uwEU2NpO2-Cts_A0k",
  authDomain: "star-boys-1d890.firebaseapp.com",
  projectId: "star-boys-1d890",
  storageBucket: "star-boys-1d890.appspot.com",
  messagingSenderId: "718247990043",
  appId: "1:718247990043:web:d257a07140070d568b79be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 🔐 ADMIN LOGIN
window.adminLogin = async function(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful ✅");
  } catch (error) {
    alert("Login failed ❌");
    console.error(error);
  }
};

// 🔐 LOGOUT
window.adminLogout = async function() {
  await signOut(auth);
  alert("Logged out");
};

// 👀 Detect Admin State
onAuthStateChanged(auth, (user) => {
  const adminPanel = document.getElementById("admin-panel");
  if (user && user.email === "santudilee123@gmail.com") {
    if (adminPanel) adminPanel.style.display = "block";
  } else {
    if (adminPanel) adminPanel.style.display = "none";
  }
});

// 🎵 Upload Music to Firebase Storage
window.uploadMusic = async function() {
  const fileInput = document.getElementById('uploadMusic');
  const file = fileInput.files[0];
  if (!file) return alert("Select an MP3 file first!");

  const musicRef = ref(storage, 'music/' + file.name);
  await uploadBytes(musicRef, file);
  document.getElementById('bgMusic').src = URL.createObjectURL(file);
  alert("Music uploaded successfully ✅");
};

// 🎵 Delete Music (resets default)
window.deleteMusic = async function() {
  const musicElement = document.getElementById('bgMusic');
  musicElement.pause();
  musicElement.currentTime = 0;
  musicElement.src = "music/default.mp3";
  alert("Music stopped/deleted ✅");
};
