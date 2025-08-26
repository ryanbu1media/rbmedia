<script>
window.addEventListener("DOMContentLoaded", () => {
  // Enable desktop cursor enhancements
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  document.body.classList.add("cursor-enabled");

  // ── Parallax setup ──
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  function updateTarget(x, y) {
    targetX = (x / window.innerWidth - 0.5) * 20;
    targetY = (y / window.innerHeight - 0.5) * 20;
  }

  document.addEventListener("mousemove", (e) => {
    updateTarget(e.clientX, e.clientY);
  });

  // ── Parallax animation loop ──
  function animateFrame() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    document.querySelectorAll(".parallax-item").forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 1;
      const moveX = currentX * depth;
      const moveY = currentY * depth;
      const base = el.dataset.baseTransform || "";
      el.style.transform = `${base} translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animateFrame);
  }

  requestAnimationFrame(animateFrame);
});
</script>
