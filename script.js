<script>
  window.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      document.body.classList.add("mobile-mode");
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function updateTarget(x, y) {
      targetX = (x / window.innerWidth - 0.5) * 20;
      targetY = (y / window.innerHeight - 0.5) * 20;
    }

    document.addEventListener("mousemove", (e) => {
      updateTarget(e.clientX, e.clientY);
    });

    document.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        updateTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    function animateParallax() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      document.querySelectorAll(".parallax-item").forEach((el) => {
        const depth = parseFloat(el.dataset.depth) || 1;
        const moveX = currentX * depth;
        const moveY = currentY * depth;

        const base = el.dataset.baseTransform || "";
        el.style.transform = `${base} translate(${moveX}px, ${moveY}px)`;
      });

      requestAnimationFrame(animateParallax);
    }

    animateParallax();
  });
</script>
window.addEventListener("DOMContentLoaded", () => {
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isDesktop) {
    document.body.classList.add('cursor-enabled');
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function updateTarget(x, y) {
    targetX = (x / window.innerWidth - 0.5) * 20;
    targetY = (y / window.innerHeight - 0.5) * 20;
  }

  document.addEventListener("mousemove", (e) => {
    updateTarget(e.clientX, e.clientY);
  });

  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      updateTarget(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  function animateParallax() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    document.querySelectorAll(".parallax-item").forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 1;
      const moveX = currentX * depth;
      const moveY = currentY * depth;

      const base = el.dataset.baseTransform || "";
      el.style.transform = `${base} translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animateParallax);
  }

  animateParallax();
});