// ══════════════════════════════════════════════
// CONFIG — SUBSTITUA A URL DO SEU APPS SCRIPT!
// ══════════════════════════════════════════════
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz4BlCE2z7NHFxOegmFcQUVckqbrSwadLEBI2K1bXEt6au0MYWflYhrImGdnVVCGuWk/exec";

// ══════════════════════════════════════════════
// ANIMAIS POR NÍVEL
// ══════════════════════════════════════════════
const ANIMALS = [
  { name: "Minhoca",      emoji: "🪱", threshold: 0    },
  { name: "Lagarta",      emoji: "🐛", threshold: 50   },
  { name: "Borboleta",    emoji: "🦋", threshold: 100  },
  { name: "Formiga",      emoji: "🐜", threshold: 150  },
  { name: "Abelha",       emoji: "🐝", threshold: 200  },
  { name: "Besouro",      emoji: "🪲", threshold: 250  },
  { name: "Lagartixa",    emoji: "🦎", threshold: 300  },
  { name: "Sapo",         emoji: "🐸", threshold: 350  },
  { name: "Pinguim",      emoji: "🐧", threshold: 400  },
  { name: "Golfinho",     emoji: "🐬", threshold: 450  },
  { name: "Leão",         emoji: "🦁", threshold: 500  },
  { name: "Tigre",        emoji: "🐯", threshold: 600  },
  { name: "Elefante",     emoji: "🐘", threshold: 700  },
  { name: "Águia",        emoji: "🦅", threshold: 850  },
  { name: "Dragão",        emoji: "🐉", threshold: 1000 },
  { name: "Leviatã",       emoji: "🌊", threshold: 1100 },
  { name: "Quimera",       emoji: "🦁", threshold: 1200 },
  { name: "Hidra",         emoji: "🐍", threshold: 1350 },
  { name: "Unicórnio",     emoji: "🦄", threshold: 1500 },
  { name: "Grifo",         emoji: "🦅", threshold: 1650 },
  { name: "Pégaso",        emoji: "🐎", threshold: 1800 },
  { name: "Fênix",         emoji: "🔥", threshold: 2000 },
  { name: "Espírito",      emoji: "👻", threshold: 2250 },
  { name: "Guardião",      emoji: "🛡️", threshold: 2500 },
  { name: "Mestre Arcano", emoji: "🔮", threshold: 2750 },
  { name: "Semideus",      emoji: "🔱", threshold: 3000 },
  { name: "Titã",          emoji: "🏔️", threshold: 3300 },
  { name: "Anjo",          emoji: "😇", threshold: 3600 },
  { name: "Arcanjo",       emoji: "👼", threshold: 4000 },
  { name: "Estrela do Show",       emoji: "✨", threshold: 4400 },
  { name: "Entidade",      emoji: "🌌", threshold: 4800 },
  { name: " Concurso Prefeitura",  emoji: "🏢", threshold: 5000 },
  { name: "Metrópole",     emoji: "🏙️", threshold: 5200 },
  { name: "Nação",         emoji: "🗺️", threshold: 5400 },
  { name: "Império",       emoji: "👑", threshold: 5600 },
  { name: "Planeta",       emoji: "🌍", threshold: 5800 },
  { name: "Constelação",   emoji: "✨", threshold: 6000 },
  { name: "Galáxia",       emoji: "🌌", threshold: 6200 },
  { name: "Supernova",     emoji: "💥", threshold: 6400 },
  { name: "Buraco Negro",  emoji: "🕳️", threshold: 6600 },
  { name: "Ciborgue",      emoji: "🤖", threshold: 6800 },
  { name: "Matrix",        emoji: "🌐", threshold: 7000 },
  { name: "Singularidade", emoji: "🧠", threshold: 7200 },
  { name: "Hiperespaço",   emoji: "🚀", threshold: 7400 },
  { name: "Eternidade",    emoji: "⏳", threshold: 7600 },
  { name: "Infinito",      emoji: "♾️", threshold: 7800 },
  { name: "Multiverso",    emoji: "🔮", threshold: 8000 },
  { name: "Viajante do Tempo", emoji: "⏳", threshold: 8200 },
  { name: "Arquiteto Cósmico", emoji: "📐", threshold: 8400 },
  { name: "Divindade Estelar", emoji: "☀️", threshold: 8600 },
  { name: "Juiz do Destino",   emoji: "⚖️", threshold: 8900 },
  { name: "Soberano do Vazio", emoji: "👁️", threshold: 9200 },
  { name: "Origem de Tudo",    emoji: "💥", threshold: 9500 },
  { name: "Presença Suprema",  emoji: "👑", threshold: 9800 },
  { name: "Concurso SEDEST",          emoji: "🌟", threshold: 10000 }
]
// ══════════════════════════════════════════════
// PATENTES MILITARES
// ══════════════════════════════════════════════
const RANKS = [
  { name: "Soldado", key: "soldado", icon: "🪖", desc: "Começando a jornada" },
  { name: "Cabo", key: "cabo", icon: "🎗️", desc: "Ganhando experiência em campo" },
  { name: "Tenente", key: "tenente", icon: "⭐", desc: "Top 2º colocado geral" },
  { name: "Major", key: "major", icon: "🎖️", desc: "Veterano de grandes batalhas" },
  { name: "Coronel", key: "coronel", icon: "👑", desc: "Líder absoluto do ranking" },
  { name: "General", key: "general", icon: "🌌", desc: "O auge da hierarquia militar" },
];

// ══════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════
let currentUser = null;
let globalData  = []; // [{ username, date (YYYY-MM-DD), count }]

// ══════════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════════
function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function weekStart() {
  const d   = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().split("T")[0];
}

function showLoading(msg = "carregando...") {
  document.getElementById("loading-overlay").classList.remove("hidden");
  document.getElementById("loading-text").textContent = msg;
}

function hideLoading() {
  document.getElementById("loading-overlay").classList.add("hidden");
}

function showToast(msg, type = "") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove("show"), 3000);
}

function getAnimalForScore(score) {
  let current = ANIMALS[0];
  for (let i = ANIMALS.length - 1; i >= 0; i--) {
    if (score >= ANIMALS[i].threshold) { current = ANIMALS[i]; break; }
  }
  return current;
}

function getAnimalIndex(score) {
  let idx = 0;
  for (let i = ANIMALS.length - 1; i >= 0; i--) {
    if (score >= ANIMALS[i].threshold) { idx = i; break; }
  }
  return idx;
}

function getMilitaryRank(pos) {
  // Se houver menos de 6 itens no RANKS, evita erro
  if (pos === 1) return RANKS[5]; // General (Último da lista de 6)
  if (pos === 2) return RANKS[4]; // Coronel
  if (pos === 3) return RANKS[3]; // Capitão
  if (pos <= 5)  return RANKS[2]; // Tenente
  if (pos <= 10) return RANKS[1]; // Sargento
  return RANKS[0];                // Soldado
}

// ══════════════════════════════════════════════
// AGGREGATE DATA
// ══════════════════════════════════════════════
function aggregateByUser(records) {
  const map = {};
  records.forEach(r => {
    if (!map[r.username]) map[r.username] = 0;
    map[r.username] += r.count;
  });
  return Object.entries(map)
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count);
}

function filterToday(records) {
  const today = todayStr();
  return records.filter(r => r.date === today);
}

function filterWeek(records) {
  const ws    = weekStart();
  const today = todayStr();
  return records.filter(r => r.date >= ws && r.date <= today);
}

function getUserTotal(username) {
  return globalData
    .filter(r => r.username === username)
    .reduce((s, r) => s + r.count, 0);
}

function getUserStreak(username) {
  const userDates = [...new Set(
    globalData.filter(r => r.username === username).map(r => r.date)
  )].sort().reverse();

  if (!userDates.length) return 0;

  let streak = 0;
  const check = new Date();
  for (let i = 0; i < userDates.length; i++) {
    const checkStr = check.toISOString().split("T")[0];
    if (userDates[i] === checkStr) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else if (i === 0 && userDates[0] < checkStr) {
      break;
    } else {
      break;
    }
  }
  return streak;
}

// ══════════════════════════════════════════════
// LOGIN / LOGOUT
// ══════════════════════════════════════════════
function handleLogin() {
  const val = document.getElementById("login-input").value
    .trim().toLowerCase().replace(/[^a-z0-9_]/g, "");

  if (!val || val.length < 2) {
    showToast("⚠️ Nome inválido (mín. 2 chars)", "warning");
    return;
  }

  currentUser = val;
  localStorage.setItem("studywar_user", val);
  enterApp();
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("studywar_user");
  document.getElementById("app-screen").classList.remove("active");
  document.getElementById("login-screen").classList.add("active");
  document.getElementById("login-input").value = "";
}

document.getElementById("login-input").addEventListener("keydown", e => {
  if (e.key === "Enter") handleLogin();
});

// ══════════════════════════════════════════════
// ENTER APP
// ══════════════════════════════════════════════
async function enterApp() {
  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("app-screen").classList.add("active");
  document.getElementById("nav-username").textContent = currentUser;
  buildEvoGrid();
  await refreshData();
}

// ══════════════════════════════════════════════
// FETCH DATA FROM APPS SCRIPT
// ══════════════════════════════════════════════
async function refreshData() {
  showLoading("sincronizando...");
  try {
    if (APPS_SCRIPT_URL === "SUA_URL_DO_APPS_SCRIPT_AQUI") {
      fakeData();
    } else {
      const url = `${APPS_SCRIPT_URL}?action=getAll&t=${Date.now()}`;
      const res  = await fetch(url, { method: "GET", redirect: "follow" });
      const text = await res.text();
      const json = JSON.parse(text.trim().replace(/^\uFEFF/, ""));
      if (json.error) throw new Error(json.error);
      globalData = json.data || [];
    }
    updateUI();
  } catch (e) {
    console.error("refreshData error:", e);
    showToast("Erro ao sincronizar — verifique a URL do Apps Script.", "error");
    if (!globalData.length) fakeData();
    updateUI();
  } finally {
    hideLoading();
  }
}

function fakeData() {
  const today     = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const ystr = yesterday.toISOString().split("T")[0];

  globalData = [
    { username: currentUser, date: today, count: 30  },
    { username: currentUser, date: ystr,  count: 45  },
    { username: "pedro",     date: today, count: 80  },
    { username: "pedro",     date: ystr,  count: 120 },
    { username: "maria",     date: today, count: 55  },
    { username: "carlos",    date: today, count: 20  },
    { username: "ana",       date: today, count: 10  },
  ];
}

// ══════════════════════════════════════════════
// SUBMIT QUESTIONS
// ══════════════════════════════════════════════
async function submitQuestions() {
  const val = parseInt(document.getElementById("count-input").value);
  if (!val || val < 1) { showToast("Quantidade inválida", "error"); return; }

  showLoading("registrando...");
  const oldTotal     = getUserTotal(currentUser);
  const oldAnimalIdx = getAnimalIndex(oldTotal);

  try {
    if (APPS_SCRIPT_URL !== "SUA_URL_DO_APPS_SCRIPT_AQUI") {
      const params = new URLSearchParams({
        action: "addRecord",
        username: currentUser,
        date: todayStr(),
        count: val,
      });
      const url  = `${APPS_SCRIPT_URL}?${params.toString()}`;
      const res  = await fetch(url, { method: "GET", redirect: "follow" });
      const text = await res.text();
      const json = JSON.parse(text.trim().replace(/^\uFEFF/, ""));
      if (json.error) throw new Error(json.error);
    } else {
      globalData.push({ username: currentUser, date: todayStr(), count: val });
    }

    await refreshData();
    showToast(`+${val} questões registradas! ✓`, "success");
    document.getElementById("count-input").value = 10;

    const newTotal     = getUserTotal(currentUser);
    const newAnimalIdx = getAnimalIndex(newTotal);
    if (newAnimalIdx > oldAnimalIdx) {
      setTimeout(() => showMilestone(ANIMALS[newAnimalIdx]), 800);
    }

  } catch (e) {
    console.error("submitQuestions error:", e);
    showToast("Erro ao salvar", "error");
    hideLoading();
  }
}

// ══════════════════════════════════════════════
// UPDATE UI
// ══════════════════════════════════════════════
function updateUI() {
  const total      = getUserTotal(currentUser);
  const todayTotal = filterToday(globalData).filter(r => r.username === currentUser).reduce((s, r) => s + r.count, 0);
  const weekTotal  = filterWeek(globalData).filter(r => r.username === currentUser).reduce((s, r) => s + r.count, 0);
  const streak     = getUserStreak(currentUser);
  const animal     = getAnimalForScore(total);
  const animalIdx  = getAnimalIndex(total);
  const nextAnimal = ANIMALS[Math.min(animalIdx + 1, ANIMALS.length - 1)];

  // Nav avatar
  document.getElementById("nav-avatar").textContent = animal.emoji;

  // Hero
  document.getElementById("hero-animal").textContent = animal.emoji;
  document.getElementById("hero-name").textContent   = currentUser;
  document.getElementById("hero-title").textContent  = animal.name.toUpperCase();

  // Animal progress bar
  const progressStart = animal.threshold;
  const progressEnd   = nextAnimal.threshold;
  const pct = animalIdx === ANIMALS.length - 1
    ? 100
    : Math.floor(((total - progressStart) / (progressEnd - progressStart)) * 100);

  document.getElementById("animal-progress-fill").style.width = pct + "%";
  document.getElementById("animal-progress-pct").textContent  = pct + "%";
  document.getElementById("animal-progress-label").textContent =
    animalIdx === ANIMALS.length - 1
      ? "🏆 Nível máximo!"
      : `Próximo: ${nextAnimal.name} ${nextAnimal.emoji}`;

  // Stats
  document.getElementById("stat-today").textContent  = todayTotal;
  document.getElementById("stat-week").textContent   = weekTotal;
  document.getElementById("stat-total").textContent  = total;
  document.getElementById("streak-text").textContent =
    `${streak} dia${streak !== 1 ? "s" : ""} seguido${streak !== 1 ? "s" : ""}`;

  // Objetivo 10000
  const objPct = Math.min(Math.floor((total / 10000) * 100), 100);
  document.getElementById("obj-current").textContent          = total;
  document.getElementById("obj-pct").textContent              = objPct + "%";
  document.getElementById("obj-progress-fill").style.width    = objPct + "%";

  // Patente militar
  const allRank = aggregateByUser(globalData);
  const myPos   = (allRank.findIndex(r => r.username === currentUser) + 1) || (allRank.length + 1);
  const milRank = getMilitaryRank(myPos);
  document.getElementById("rank-icon").textContent         = milRank.icon;
  document.getElementById("rank-name-display").textContent = milRank.name.toUpperCase();
  document.getElementById("rank-desc-display").textContent = milRank.desc;

  // Listas de rank
  renderRankDay();
  renderRankWeek();
  renderRankAll();
  renderTodayLogs();
  updateEvoGrid(total);
}

// ══════════════════════════════════════════════
// RENDER RANK LISTS
// ══════════════════════════════════════════════
function renderRankList(elId, records) {
  const agg = aggregateByUser(records);
  const el  = document.getElementById(elId);

  if (!agg.length) {
    el.innerHTML = '<div class="empty-state"><span>🫙</span>Nenhum dado ainda.</div>';
    return;
  }

  el.innerHTML = agg.map((item, i) => {
    const pos      = i + 1;
    const posClass = pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : "other";
    const posLabel = pos <= 3 ? ["🥇","🥈","🥉"][pos - 1] : pos;
    const animal   = getAnimalForScore(getUserTotal(item.username));
    const milRank  = getMilitaryRank(pos);
    const isMe     = item.username === currentUser;

    return `<li class="rank-item">
      <div class="rank-pos ${posClass}">${posLabel}</div>
      <div class="rank-avatar">${animal.emoji}</div>
      <div class="rank-info">
        <div class="rank-username ${isMe ? "is-me" : ""}">
          ${item.username}${isMe ? " (você)" : ""}
          <span class="rank-badge ${milRank.key}">${milRank.name}</span>
        </div>
        <div class="rank-meta">${animal.name}</div>
      </div>
      <div class="rank-score fw-mono">${item.count}</div>
    </li>`;
  }).join("");
}

function renderRankDay() {
  document.getElementById("rank-day-date").textContent =
    `📅 ${new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}`;
  renderRankList("rank-day-list", filterToday(globalData));
}

function renderRankWeek() {
  const ws = weekStart();
  const we = todayStr();
  document.getElementById("rank-week-label").textContent =
    `${new Date(ws + "T12:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} → ` +
    `${new Date(we + "T12:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}`;
  renderRankList("rank-week-list", filterWeek(globalData));
}

function renderRankAll() {
  renderRankList("rank-all-list", globalData);
}

function renderTodayLogs() {
  const logs = globalData.filter(r => r.username === currentUser && r.date === todayStr());
  const el   = document.getElementById("today-logs-list");

  if (!logs.length) {
    el.innerHTML = '<div class="empty-state"><span>📝</span>Nenhum registro hoje ainda.</div>';
    return;
  }

  const total = logs.reduce((s, r) => s + r.count, 0);
  el.innerHTML =
    logs.map((r, i) => `
      <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:14px;">
        <span style="color:var(--muted);">Registro ${i + 1}</span>
        <span class="fw-mono" style="color:var(--accent3);">+${r.count}</span>
      </div>`).join("") +
    `<div style="display:flex;justify-content:space-between;padding:12px 0;font-weight:700;">
      <span>Total de hoje</span>
      <span class="fw-mono" style="color:var(--accent);">${total}</span>
    </div>`;
}

// ══════════════════════════════════════════════
// EVOLUTION GRID
// ══════════════════════════════════════════════
function buildEvoGrid() {
  document.getElementById("evo-grid").innerHTML = ANIMALS.map((a, i) => `
    <div class="evo-item" id="evo-item-${i}">
      <div class="evo-emoji">${a.emoji}</div>
      <div class="evo-info">
        <div class="evo-name">${a.name}</div>
        <div class="evo-req">${a.threshold}+ questões</div>
      </div>
    </div>`).join("");
}

function updateEvoGrid(total) {
  const current = getAnimalIndex(total);
  ANIMALS.forEach((_, i) => {
    const el = document.getElementById(`evo-item-${i}`);
    if (!el) return;
    el.classList.remove("unlocked", "current");
    if (i === current)    el.classList.add("unlocked", "current");
    else if (i < current) el.classList.add("unlocked");
  });
}

// ══════════════════════════════════════════════
// MILESTONE POPUP
// ══════════════════════════════════════════════
function showMilestone(animal) {
  document.getElementById("milestone-animal").textContent = animal.emoji;
  document.getElementById("milestone-title").textContent  = "VOCÊ EVOLUIU!";
  document.getElementById("milestone-sub").textContent    = `Bem-vindo ao nível ${animal.name}! Continue estudando! 🎉`;
  document.getElementById("milestone-popup").classList.add("show");
}

function closeMilestone() {
  document.getElementById("milestone-popup").classList.remove("show");
}

// ══════════════════════════════════════════════
// COUNTER CONTROLS
// ══════════════════════════════════════════════
function changeCount(delta) {
  const inp = document.getElementById("count-input");
  inp.value = Math.max(1, (parseInt(inp.value) || 0) + delta);
}

function setCount(n) {
  document.getElementById("count-input").value = n;
}

// ══════════════════════════════════════════════
// TAB SWITCHING
// ══════════════════════════════════════════════
function switchTab(name) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
  document.querySelector(`[data-tab="${name}"]`).classList.add("active");
  document.getElementById(`tab-${name}`).classList.add("active");
}

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
(function init() {
  hideLoading();
  const saved = localStorage.getItem("studywar_user");
  if (saved) {
    currentUser = saved;
    document.getElementById("login-input").value = saved;
    enterApp();
  }
})();
