// ================= Movie Intro & Particles =================
const introOverlay = document.getElementById('introOverlay');
const mainPage = document.getElementById('mainPage');

// Simple particle effect
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*3+1,
    speed: Math.random()*1.5+0.5
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.fillStyle='rgba(255,215,0,0.8)';
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.y -= p.speed;
    if(p.y<0)p.y=canvas.height;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Hide overlay after 7 seconds
setTimeout(()=>{
  introOverlay.style.display='none';
  mainPage.style.display='block';
},7000);

// ================= Admin Login =================
function showLogin(){document.getElementById("loginBox").style.display='block';}

function login(){
  const pass=document.getElementById("password").value;
  if(pass==="starboys123"){
    document.getElementById("adminPanel").style.display='block';
    alert("Login Successful");
  } else { alert("Wrong Password"); }
}

// ================= Media Upload =================
const galleryPhotos = [];
const galleryVideos = [];

function uploadPhoto(){
  const file=document.getElementById("photoUpload").files[0];
  if(!file)return alert("Select a photo first");
  galleryPhotos.push(file);
  alert("Photo uploaded!");
}

function uploadVideo(){
  const file=document.getElementById("videoUpload").files[0];
  if(!file)return alert("Select a video first");
  galleryVideos.push(file);
  alert("Video uploaded!");
}

// ================= Notice =================
function addNotice(){
  const text = document.getElementById("noticeText").value;
  if(!text) return;
  const div = document.createElement('div');
  div.className='notice';
  div.innerText=text;
  document.getElementById('noticeBoard').appendChild(div);
  document.getElementById("noticeText").value='';
}
