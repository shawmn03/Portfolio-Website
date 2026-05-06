const canvas = document.getElementById("lava");
const ctx = canvas.getContext("2d");
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let mouse = { x: -1000, y: -1000 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseout", () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

let isExiting = false;

const colors = [
  "#FFA269",
  "#F3B353",
  "#9A9D85",
  "#EE6D8A"
];

class Clump {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = 160 + Math.random() * 120;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.dx = (Math.random() - 0.5) * 1.2;
    this.dy = (Math.random() - 0.5) * 1.2;
  }
  update() {
    if (isExiting) {
      this.r += 60; 
    } else {
      this.x += this.dx;
      this.y += this.dy;

      let dxMouse = this.x - mouse.x;
      let dyMouse = this.y - mouse.y;
      let dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      let maxDist = 300; 

      if (dist < maxDist && dist > 0) {
        let force = (maxDist - dist) / maxDist;
        this.x += (dxMouse / dist) * force * 1.5; 
        this.y += (dyMouse / dist) * force * 1.5;
      }

      if (this.x < 0) { this.x = 0; this.dx *= -1; }
      if (this.x > W) { this.x = W; this.dx *= -1; }
      if (this.y < 0) { this.y = 0; this.dy *= -1; }
      if (this.y > H) { this.y = H; this.dy *= -1; }
    }
  }
  draw() {
    const grad = ctx.createRadialGradient(
      this.x, this.y, this.r * 0.1,
      this.x, this.y, this.r
    );
    
    grad.addColorStop(0, this.color);
    grad.addColorStop(0.4, this.color); 
    grad.addColorStop(1, "transparent");
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

const clumps = Array.from({ length: 20 }, () => new Clump());

function animate() {
  ctx.clearRect(0, 0, W, H);
  
  ctx.globalCompositeOperation = "screen"; 
  ctx.globalAlpha = 0.7; 
  
  clumps.forEach(clump => {
    clump.update();
    clump.draw();
  });
  requestAnimationFrame(animate);
}
animate();

const btn = document.getElementById("enter-btn");
const title = document.getElementById("main-title");

btn.addEventListener("click", (e) => {
  e.preventDefault(); 
  isExiting = true;   
  
  title.style.opacity = "0";
  btn.style.opacity = "0";
  btn.style.pointerEvents = "none"; 
  
  setTimeout(() => {
    window.location.href = btn.href;
  }, 400);
});