(function () {
  let overlay = null;
  let originalParent = null;
  let originalNextSibling = null;

  let scale = 1, translateX = 0, translateY = 0;
  let isDragging = false, startX = 0, startY = 0;
  let activeContainer = null;
  const MIN_SCALE = 1, MAX_SCALE = 5;

  function applyTransform() {
    activeContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function resetTransform() {
    scale = 1; translateX = 0; translateY = 0;
    if (activeContainer) applyTransform();
  }

  function onWheel(e) {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
    if (scale === MIN_SCALE) { translateX = 0; translateY = 0; }
    applyTransform();
  }

  function onPointerDown(e) {
    if (scale === 1) return;
    isDragging = true;
    activeContainer.classList.add("dragging");
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    applyTransform();
  }

  function onPointerUp() {
    isDragging = false;
    if (activeContainer) activeContainer.classList.remove("dragging");
  }

  function onDblClick() {
    resetTransform();
  }

  function escListener(e) {
    if (e.key === "Escape") closeMermaidLightbox();
  }

  function closeMermaidLightbox() {
    if (!overlay) return;
    const container = overlay.querySelector(".mermaid");

    container.classList.remove("mermaid-lightbox-active", "dragging");
    container.style.transform = "";
    container.removeEventListener("wheel", onWheel);
    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("dblclick", onDblClick);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);

    originalParent.insertBefore(container, originalNextSibling);
    overlay.remove();
    overlay = null;
    activeContainer = null;
    document.removeEventListener("keydown", escListener);
  }

  function openMermaidLightbox(container) {
    originalParent = container.parentNode;
    originalNextSibling = container.nextSibling;
    activeContainer = container;
    resetTransform();

    overlay = document.createElement("div");
    overlay.className = "mermaid-lightbox-overlay";
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeMermaidLightbox();
    });

    const closeBtn = document.createElement("button");
    closeBtn.className = "mermaid-lightbox-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", closeMermaidLightbox);

    const hint = document.createElement("div");
    hint.className = "mermaid-lightbox-hint";
    hint.textContent = "Scroll to zoom · Drag to pan · Double-click to reset";

    overlay.appendChild(closeBtn);
    overlay.appendChild(hint);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    container.classList.add("mermaid-lightbox-active");
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("dblclick", onDblClick);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    document.addEventListener("keydown", escListener);
  }

  function initMermaidLightbox() {
    document.querySelectorAll(".mermaid:not([data-lightbox-ready])").forEach((container) => {
      container.dataset.lightboxReady = "true";
      container.addEventListener("click", () => {
        if (!container.classList.contains("mermaid-lightbox-active")) {
          openMermaidLightbox(container);
        }
      });
    });
  }

  const observer = new MutationObserver(initMermaidLightbox);
  observer.observe(document.body, { childList: true, subtree: true });

  if (window.document$) {
    document$.subscribe(initMermaidLightbox);
  } else {
    document.addEventListener("DOMContentLoaded", initMermaidLightbox);
  }
})();