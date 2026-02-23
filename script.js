/* =========================================
   PAINEL MUNICIPAL — script.js
   =========================================
   
   CONFIGURAÇÃO DOS DASHBOARDS
   ===========================
   Para trocar os links do Looker Studio, edite apenas o objeto
   `DASHBOARDS` abaixo. Substitua a propriedade `url` de cada
   secretaria pelo link do relatório correspondente.
   
   Exemplo:
   guarda: {
     label: "Guarda Municipal",
     url: "https://lookerstudio.google.com/embed/reporting/SEU-ID-AQUI/page/PAGINA"
   }
   ========================================= */

const DASHBOARDS = {
  guarda: {
  label: "Guarda Municipal",
  url: "https://lookerstudio.google.com/embed/reporting/f8eec4a6-00d8-44de-b01f-9b76abfa4356/page/OvUpF",
  ativo: true
},
  defesa: {
    label: "Defesa Civil",
    url: "LINK_DEFESA",
    ativo: true
  },
  vigilancia: {
    label: "Vigilância Patrimonial",
    url: "LINK_VIGILANCIA",
    ativo: true
  },
  bombeiros: {
    label: "Bombeiros",
    url: "LINK_BOMBEIROS",
    ativo: true
  },
  outros: {
    label: "Outros - Segurança",
    url: "LINK_OUTROS",
    ativo: true
  },

  // Outras secretarias
  saude: { label: "Saúde", ativo: false },
  educacao: { label: "Educação", ativo: false },
  infraestrutura: { label: "Infraestrutura", ativo: false }
};

/* ---- Estado ---- */
let currentKey = null;

/* ---- Referências DOM ---- */
const welcomeScreen   = document.getElementById("welcomeScreen");
const iframeContainer = document.getElementById("iframeContainer");
const reportFrame     = document.getElementById("reportFrame");
const iframeLoading   = document.getElementById("iframeLoading");
const currentLabel    = document.getElementById("currentSecretaria");
const sidebar         = document.getElementById("sidebar");

/* ---- Carregar dashboard ---- */
function loadDashboard(key) {
  const dash = DASHBOARDS[key];
  if (!dash) return;

  currentKey = key;

  // Atualiza itens ativos no menu
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.key === key);
  });

  // Atualiza breadcrumb
  currentLabel.textContent = dash.label;

  // Mostra container e loading
  welcomeScreen.style.display   = "none";
  iframeContainer.style.display = "flex";
  iframeLoading.style.display   = "flex";

  // Carrega iframe
  reportFrame.src = dash.url;

  // Fecha sidebar no mobile
  if (window.innerWidth <= 900) {
    closeSidebar();
  }
}

/* ---- Esconde loading quando iframe carrega ---- */
function hideLoading() {
  iframeLoading.style.display = "none";
}

/* ---- Recarregar iframe ---- */
function reloadIframe() {
  if (!currentKey) return;
  iframeLoading.style.display = "flex";
  reportFrame.src = reportFrame.src; // força reload
}

/* ---- Toggle Sidebar (mobile) ---- */
function toggleSidebar() {
  const isOpen = sidebar.classList.contains("open");
  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("visible");
  document.body.style.overflow = "";
}

/* ---- Overlay ---- */
const overlay = document.createElement("div");
overlay.className = "sidebar-overlay";
overlay.addEventListener("click", closeSidebar);
document.body.appendChild(overlay);

/* ---- Data/Hora no topo ---- */
function updateDate() {
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("currentDate").textContent =
    now.toLocaleDateString("pt-BR", opts);
}

updateDate();
setInterval(updateDate, 60_000);

function toggleSubmenu(groupId) {
  const group = document.getElementById(groupId);
  group.classList.toggle("active");
}

