import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Countdown Timer
const countdownDate = new Date("Sep 10, 2026 10:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerText = "Event Started!";
    return;
  }

  document.getElementById('days').innerText = Math.floor(distance / (1000*60*60*24));
  document.getElementById('hours').innerText = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  document.getElementById('minutes').innerText = Math.floor((distance % (1000*60*60)) / (1000*60));
  document.getElementById('seconds').innerText = Math.floor((distance % (1000*60))/1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Admin Login
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  const message = document.getElementById('loginMessage');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user.email === "santudilee123@gmail.com") {
      document.getElementById('adminPanel').style.display = "block";
      message.innerText = "Login successful ✅";
    } else {
      await signOut(auth);
      message.innerText = "You are not authorized ❌";
    }
  } catch (error) {
    message.innerText = "Login failed ❌";
    console.error(error);
  }
});

onAuthStateChanged(auth, (user) => {
  if(user && user.email === "santudilee123@gmail.com"){
    document.getElementById('adminPanel').style.display = "block";
  } else {
    document.getElementById('adminPanel').style.display = "none";
  }
});

window.adminLogout = async () => {
  await signOut(auth);
  document.getElementById('loginMessage').innerText = "Logged out";
  document.getElementById('adminPanel').style.display = "none";
};

// Music Controls
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.2;
window.playMusic = ()=> bgMusic.play();
window.pauseMusic = ()=> bgMusic.pause();
window.deleteMusic = ()=> { bgMusic.pause(); bgMusic.src = ""; };

// Simple Slow Particles
const particlesContainer = document.getElementById('particles');
for(let i=0;i<50;i++){
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.top = Math.random()*100 + '%';
  p.style.left = Math.random()*100 + '%';
  p.style.width = p.style.height = Math.random()*4+2+'px';
  p.style.background = 'rgba(255,255,255,0.3)';
  p.style.position = 'absolute';
  p.style.borderRadius = '50%';
  p.style.animation = `move ${10+Math.random()*10}s linear infinite`;
  particlesContainer.appendChild(p);
}
