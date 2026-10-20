// Cerutti Fabril — interacciones del sitio
const CONFIG = {
  // Número internacional sin +, espacios ni guiones.
  whatsapp: "543465493307",
};

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function closeMenu(restoreFocus = false) {
  if (!nav?.classList.contains("open")) return;

  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menú");
  document.body.classList.remove("no-scroll");
  if (restoreFocus) menuToggle?.focus();
}

menuToggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  document.body.classList.toggle("no-scroll", open);
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => closeMenu());
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
}, { passive: true });

// Galería accesible con cierre por botón, clic en el fondo o Escape.
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxClose = document.querySelector(".lightbox-close");
let lastGalleryTrigger = null;

function openLightbox(item) {
  if (!lightbox || !lightboxImg || !lightboxTitle || !lightboxDescription) return;

  lastGalleryTrigger = item;
  lightboxImg.src = item.dataset.image;
  lightboxImg.alt = item.dataset.title || "Trabajo de Cerutti Fabril";
  lightboxTitle.textContent = item.dataset.title || "Trabajo realizado";
  lightboxDescription.textContent = item.dataset.description || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox?.classList.contains("open")) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lastGalleryTrigger?.focus();
}

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => openLightbox(item));
});
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
lightbox?.addEventListener("keydown", event => {
  if (event.key === "Tab") {
    event.preventDefault();
    lightboxClose?.focus();
  }
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (lightbox?.classList.contains("open")) closeLightbox();
  else closeMenu(true);
});

// El formulario sólo valida localmente hasta que se configure un servicio de envío.
const form = document.getElementById("quoteForm");
const status = document.getElementById("formStatus");
const fileInput = form?.querySelector('input[type="file"]');
const fileLabelText = fileInput?.nextElementSibling;

fileInput?.addEventListener("change", () => {
  if (!fileLabelText) return;
  const count = fileInput.files?.length ?? 0;
  fileLabelText.textContent = count
    ? `${count} archivo${count === 1 ? "" : "s"} seleccionado${count === 1 ? "" : "s"}`
    : "Elegir archivos";
});

form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const nombre = new FormData(form).get("nombre");
  if (status) {
    status.textContent = `Gracias, ${nombre}. Los datos y archivos se validaron en este navegador, pero no se enviaron. Falta conectar el formulario a un correo o servidor.`;
  }
  form.reset();
  if (fileLabelText) fileLabelText.textContent = "Elegir archivos";
});

// Mostrar WhatsApp únicamente cuando se configure un número real.
const whatsappLink = document.getElementById("whatsappBtn");
const whatsappNumber = CONFIG.whatsapp.replace(/\D/g, "");
if (whatsappLink) {
  if (/^\d{8,15}$/.test(whatsappNumber)) {
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, quiero consultar por un repuesto o reparación.")}`;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.hidden = false;
  } else {
    whatsappLink.hidden = true;
  }
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Marca en la navegación la sección que está a la vista.
const sectionLinks = [...(nav?.querySelectorAll('a[href^="#"]') ?? [])];
const trackedSections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  trackedSections.forEach(section => sectionObserver.observe(section));
}

// Animaciones progresivas con alternativa visible si no hay soporte.
const revealItems = document.querySelectorAll("section > .container");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealItems.forEach(item => {
    item.classList.add("reveal");
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
