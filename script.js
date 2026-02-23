/* =========================================
   PAINEL MUNICIPAL — script.js
========================================= */

const DASHBOARDS = {
  guarda: {
    label: "Guarda Municipal",
    url: "https://lookerstudio.google.com/embed/reporting/f8eec4a6-00d8-44de-b01f-9b76abfa4356/page/OvUpF",
    ativo: true
  },
  defesa: { label: "Defesa Civil", url: "LINK_DEFESA", ativo: true },
  vigilancia: { label: "Vigilância Patrimonial", url: "LINK_VIGILANCIA", ativo: true },
  bombeiros: { label: "Bombeiros", url: "LINK_BOMBEIROS", ativo: true },
  outros: { label: "Outros - Segurança", url: "LINK_OUTROS", ativo: true },

  saude: { label: "Saúde", ativo: false },
  educacao: { label: "Educação", ativo: false },
  infraestrutura: { label: "Infraestrutura", ativo: false }
};

let currentKey = null;

/* ===== Referências Globais ===== */
const welcomeScreen   = document.getElementById("welcomeScreen");
const iframeContainer = document.getElementById("iframeContainer");
const reportFrame     = document.getElementById("reportFrame");
const iframeLoading   = document.getElementById("iframeLoading");
const currentLabel    = document.getElementById("currentSecretaria");
const sidebar         = document.getElementById("sidebar");

/* ===== Data ===== */
function updateDate() {
  const dateEl = document.getElementById("currentDate");
  if (!dateEl) return;

  const now = new Date();
  const opts = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  dateEl.textContent = now.toLocaleDateString("pt-BR", opts);
}

updateDate();
setInterval(updateDate, 60000);

/* ===== Submenu ===== */
function toggleSubmenu(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;

  group.classList.toggle("active");
}

/* ===== Carregar Dashboard ===== */
function loadDashboard(key) {
  const dash = DASHBOARDS[key];
  if (!dash || !dash.ativo) return;

  currentKey = key;

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.remove("active");
  });

  if (currentLabel) currentLabel.textContent = dash.label;

  if (welcomeScreen) welcomeScreen.style.display = "none";
  if (iframeContainer) iframeContainer.style.display = "flex";
  if (iframeLoading) iframeLoading.style.display = "flex";

  if (reportFrame) reportFrame.src = dash.url;

  if (window.innerWidth <= 900) {
    closeSidebar();
  }
}

/* ===== Loading ===== */
function hideLoading() {
  if (iframeLoading) iframeLoading.style.display = "none";
}

/* ===== Reload ===== */
function reloadIframe() {
  if (!currentKey || !reportFrame) return;
  iframeLoading.style.display = "flex";
  reportFrame.src = reportFrame.src;
}

/* ===== Sidebar Mobile ===== */
function toggleSidebar() {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("visible");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("visible");
}

/* ===== Overlay ===== */
const overlay = document.createElement("div");
overlay.className = "sidebar-overlay";
overlay.addEventListener("click", closeSidebar);
document.body.appendChild(overlay);