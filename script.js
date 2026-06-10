window.addEventListener("DOMContentLoaded", () => {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  document.body.classList.add("cursor-enabled");

  // ───── PARALLAX ─────
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 20;
    targetY = (e.clientY / window.innerHeight - 0.5) * 20;

    moveCursor(e.clientX, e.clientY);
    spawnGhost(e.clientX, e.clientY);
  });

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

  // ───── GHOST TRAIL (OPTIMIZED) ─────
  let lastGhostX = 0;
  let lastGhostY = 0;

  function spawnGhost(x, y) {
    // Only spawn a ghost if the cursor has moved at least 18px
    // This stops the trail from being too crowded
    const dist = Math.hypot(x - lastGhostX, y - lastGhostY);
    if (dist < 0.1) return;

    lastGhostX = x;
    lastGhostY = y;

    const ghost = document.createElement("div");
    ghost.className = "cursor-ghost";
    ghost.style.left = x + "px";
    ghost.style.top = y + "px";
    document.body.appendChild(ghost);

    // Clean up using animationend for perfect timing
    ghost.addEventListener("animationend", () => {
      ghost.remove();
    });
  }
});