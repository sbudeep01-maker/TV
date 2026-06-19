const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("bg"),
alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.z = 10;

// particles
const particlesGeometry = new THREE.BufferGeometry();

const count = 5000;
const positions = [];

for(let i=0;i<count;i++){

positions.push(
(Math.random()-0.5)*100,
(Math.random()-0.5)*100,
(Math.random()-0.5)*100
);

}

particlesGeometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(positions,3)
);

const particlesMaterial = new THREE.PointsMaterial({
size:0.1,
color:0xff3333
});

const particles = new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particles);

// fluid movement
function animate(){

requestAnimationFrame(animate);

particles.rotation.y += 0.0007;
particles.rotation.x += 0.0003;

renderer.render(scene,camera);

}

animate();

window.addEventListener("mousemove",(e)=>{

let x = (e.clientX/window.innerWidth-0.5)*2;
let y = (e.clientY/window.innerHeight-0.5)*2;

particles.rotation.y = x*0.4;
particles.rotation.x = y*0.4;

});

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
