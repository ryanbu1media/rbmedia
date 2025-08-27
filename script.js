<script>
window.addEventListener("DOMContentLoaded", () => {
  // ── Parallax setup ──
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  document.body.classList.add("cursor-enabled");

  // Parallax variables
  let pTargetX = 0, pTargetY = 0;
  let pCurrentX = 0, pCurrentY = 0;

  function updateParallaxTarget(x, y) {
    pTargetX = (x / window.innerWidth - 0.5) * 20;
    pTargetY = (y / window.innerHeight - 0.5) * 20;
  }

  document.addEventListener("mousemove", (e) => {
    updateParallaxTarget(e.clientX, e.clientY);
  });

  function animateParallax() {
    pCurrentX += (pTargetX - pCurrentX) * 0.1;
    pCurrentY += (pTargetY - pCurrentY) * 0.1;

    document.querySelectorAll(".parallax-item").forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 1;
      const moveX = pCurrentX * depth;
      const moveY = pCurrentY * depth;
      const base = el.dataset.baseTransform || "";
      el.style.transform = `${base} translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animateParallax);
  }

  requestAnimationFrame(animateParallax);

  