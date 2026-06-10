window.addEventListener("DOMContentLoaded", () => {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  document.body.classList.add("cursor-enabled");

  // ───── STATE ─────
  let targetX = 0,targetY = 0;
  let currentX = 0,currentY = 0;
  let points = [];
  let isTrailActive = true; // The button state

  // ───── BUTTON TOGGLE ─────
  const toggleBtn = document.getElementById("toggle-trail");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isTrailActive = !isTrailActive;
      toggleBtn.innerText = isTrailActive ? "trail: on" : "trail: off";
      if (!isTrailActive) {
        points = []; // Wipe the trail immediately
      }
    });
  }

  // ───── MOUSE EVENTS ─────
  document.addEventListener("mousemove", e => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 20;
    targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    moveCursor(e.clientX, e.clientY);

    if (isTrailActive) {
      points.push({ x: e.clientX, y: e.clientY, life: 1 });
    }
  });

  // ───── PARALLAX ─────
  function animateParallax() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    document.querySelectorAll(".parallax-item").forEach(el => {
      const depth = parseFloat(el.dataset.depth) || 1;
      const moveX = currentX * depth;
      const moveY = currentY * depth;
      const base = el.dataset.baseTransform || "";
      el.style.transform = `${base} translate(${moveX}px, ${moveY}px)`;
    });
    requestAnimationFrame(animateParallax);
  }
  animateParallax();

  // ───── CUSTOM CURSOR ─────
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);
  function moveCursor(x, y) {
    cursor.style.transform = `translate(${x}px, ${y}px)`;
  }

  // ───── CANVAS TRON TRAIL ─────
  const canvas = document.getElementById("trail-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Only draw if active
    if (isTrailActive) {
      points.forEach((p, i) => {
        p.life -= 0.0;
        if (p.life <= 0) points.splice(i, 1);
      });

      if (points.length > 2) {
        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          ctx.strokeStyle = `rgba(15, 75, 255, ${p.life * 0.7})`;
          if (i === 0) ctx.moveTo(p.x, p.y);else
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
});