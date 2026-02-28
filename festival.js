import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

/* Firebase Config */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET_NAME",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/* Countdown */
const countdownDate = new Date("Sep 10, 2026 10:00:00").getTime();
setInterval(()=>{
  const now = new Date().getTime();
  const distance = countdownDate-now;
  if(distance<0) return;
  document.getElementById("days").innerText=Math.floor(distance/(1000*60*60*24));
  document.getElementById("hours").innerText=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  document.getElementById("minutes").innerText=Math.floor((distance%(1000*60*60))/(1000*60));
  document.getElementById("seconds").innerText=Math.floor((distance%(1000*60))/1000);
},1000);

/* Dark Mode */
document.getElementById("darkModeToggle").onclick=()=>{
  document.body.classList.toggle("dark-mode");
};

/* Music */
const bgMusic=document.getElementById("bgMusic");
document.getElementById("playMusicBtn").onclick=()=>bgMusic.play();
document.getElementById("pauseMusicBtn").onclick=()=>bgMusic.pause();

/* Admin Login */
document.getElementById("loginBtn").onclick=()=>{
  const email=document.getElementById("adminEmail").value;
  const pass=document.getElementById("adminPassword").value;
  if(email==="admin@gmail.com" && pass==="Star123"){
    document.getElementById("adminPanel").style.display="block";
    document.getElementById("loginMessage").innerText="Login Success";
  } else {
    document.getElementById("loginMessage").innerText="Wrong Credentials";
  }
};

document.getElementById("logoutBtn").onclick=()=>{
  document.getElementById("adminPanel").style.display="none";
};

/* Upload Photo */
document.getElementById("uploadPhotoBtn").onclick=async()=>{
  const file=document.getElementById("photoUpload").files[0];
  if(!file){alert("Select photo first");return;}
  try{
    const storageRef=ref(storage,"photos/"+file.name);
    await uploadBytes(storageRef,file);
    alert("Photo Uploaded");
    loadGallery();
  }catch(e){alert("Upload failed");}
};

/* Upload Video */
document.getElementById("uploadVideoBtn").onclick=async()=>{
  const file=document.getElementById("videoUpload").files[0];
  if(!file){alert("Select video first");return;}
  try{
    const storageRef=ref(storage,"videos/"+file.name);
    await uploadBytes(storageRef,file);
    alert("Video Uploaded");
    loadGallery();
  }catch(e){alert("Upload failed");}
};

/* Upload Music */
document.getElementById("uploadMusicBtn").onclick=async()=>{
  const file=document.getElementById("musicUpload").files[0];
  if(!file){alert("Select music first");return;}
  const storageRef=ref(storage,"audio/"+file.name);
  await uploadBytes(storageRef,file);
  const url=await getDownloadURL(storageRef);
  bgMusic.src=url;
  bgMusic.play();
};

/* Load Gallery */
async function loadGallery(){
  const photoContainer=document.getElementById("photoContainer");
  const videoContainer=document.getElementById("videoContainer");
  photoContainer.innerHTML="";
  videoContainer.innerHTML="";

  const photos=await listAll(ref(storage,"photos"));
  for(const item of photos.items){
    const url=await getDownloadURL(item);
    const img=document.createElement("img");
    img.src=url;
    photoContainer.appendChild(img);
  }

  const videos=await listAll(ref(storage,"videos"));
  for(const item of videos.items){
    const url=await getDownloadURL(item);
    const vid=document.createElement("video");
    vid.src=url;
    vid.controls=true;
    videoContainer.appendChild(vid);
  }
}

loadGallery();
