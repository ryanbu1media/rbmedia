<script>
window.addEventListener("DOMContentLoaded", () => {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  document.body.classList.add("cursor-enabled");

  // Parallax variables
  let pTargetX = 0, pTargetY = 0;
  let pCurrentX = 0, pCurrentY = 0;

  // Update target positions from mouse
  document.addEventListener("mousemove", (e) => {
    pTargetX = (e.clientX / window.innerWidth - 0.5) * 20;
    pTargetY = (e.clientY / window.innerHeight - 0.5) * 20;
  });

  <!-- Parallax & Hover Script -->
<script>
window.addEventListener("DOMContentLoaded", () => {
  // Check if the device supports desktop-style hover
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return; // Stop script on mobile/tablet

  document.body.classList.add("cursor-enabled"); // Optional: add a CSS class for custom cursors

  // ── Parallax Variables ──
  let pTargetX = 0, pTargetY = 0; // Target position based on mouse
  let pCurrentX = 0, pCurrentY = 0; // Smoothed current position

  // ── Update parallax target from mouse movement ──
  document.addEventListener("mousemove", (e) => {
    // Map mouse position to a range (-10 to 10) for parallax movement
    pTargetX = (e.clientX / window.innerWidth - 0.5) * 20;
    pTargetY = (e.clientY / window.innerHeight - 0.5) * 20;
  });

  // ── Hover scale & rotation setup ──
  document.querySelectorAll(".parallax-item").forEach(el => {
    // Initialize hover data attributes
    el.dataset.hoverScale = 1;
    el.dataset.hoverRotate = 0;

    // When mouse enters element: increase scale & rotate
    el.addEventListener("mouseenter", () => {
      el.dataset.hoverScale = 1.05; // Increase to make element grow slightly
      el.dataset.hoverRotate = 50;   // Increase rotation for visible effect (adjust as needed)
    });

    // When mouse leaves element: reset scale & rotation
    el.addEventListener("mouseleave", () => {
      el.dataset.hoverScale = 1;    // Normal size
      el.dataset.hoverRotate = 0;   // No rotation
    });
  });

  // ── Animate parallax + hover smoothly ──
  function animateParallax() {
    // Smoothly move current parallax toward target
    pCurrentX += (pTargetX - pCurrentX) * 0.1;
    pCurrentY += (pTargetY - pCurrentY) * 0.1;

    // Apply movement, scale, and rotation to each parallax item
    document.querySelectorAll(".parallax-item").forEach(el => {
      const depth = parseFloat(el.dataset.depth) || 1;       // Parallax depth
      const moveX = pCurrentX * depth;
      const moveY = pCurrentY * depth;

      const hoverScale = parseFloat(el.dataset.hoverScale || 1);
      const hoverRotate = parseFloat(el.dataset.hoverRotate || 0);
      const base = el.dataset.baseTransform || "";          // Preserve any base transforms

      // Combine base transform + parallax movement + hover scale & rotation
      el.style.transform = `${base} translate(${moveX}px, ${moveY}px) scale(${hoverScale}) rotate(${hoverRotate}deg)`;
    });

    requestAnimationFrame(animateParallax); // Loop the animation
  }

  animateParallax(); // Start the animation loop
});
</script>