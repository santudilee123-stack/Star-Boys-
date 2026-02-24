// Firebase Modular SDK (v12)

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


// 🔐 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAR0ed_Xfvw6_hF21uwEU2NpO2-Cts_A0k",
  authDomain: "star-boys-1d890.firebaseapp.com",
  projectId: "star-boys-1d890",
  storageBucket: "star-boys-1d890.firebasestorage.app",
  messagingSenderId: "718247990043",
  appId: "1:718247990043:web:d257a07140070d568b79be"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// 🔐 ADMIN LOGIN FUNCTION
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


// 👥 VISITOR COUNTER FIXED
async function updateVisitorCount() {
  const counterRef = doc(db, "stats", "visitors");
  const docSnap = await getDoc(counterRef);

  if (!docSnap.exists()) {
    // Document doesn't exist → create starting at 2000
    await setDoc(counterRef, { count: 2000 });
    document.getElementById("visitorCount").innerText = 2000;
  } else {
    // Document exists → increment by 1
    const currentCount = docSnap.data().count || 2000;
    await updateDoc(counterRef, {
      count: increment(1)
    });
    document.getElementById("visitorCount").innerText = currentCount + 1;
  }
}

// Call it
updateVisitorCount();
