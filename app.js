const AVATARS = {
  kitten: "./assets/siggy_kitten.png",
  sleek: "./assets/siggy_adult_sleek.png",
  normal: "./assets/siggy_adult_normal.png",
  chubby: "./assets/siggy_adult_chubby.png",
};

const COPY = {
  ko: {
    langButton: "EN",
    startTitle: "시기를 키워볼까요?",
    startCopy: "24턴 동안 행동과 아이템을 골라 시기의 성격과 엔딩을 만들어주세요.",
    startButton: "지갑 연결하고 시작",
    siggyName: "시기",
    actionTitle: "메인 행동 선택",
    actionHint: "하나만 선택",
    itemTitle: "아이템 선택",
    previewTitle: "변화 미리보기",
    previewWaiting: "행동과 아이템을 선택하면 변화량이 표시됩니다.",
    aiIdle: "행동과 아이템을 고르면 이번 턴의 변화를 예측해드릴게요.",
    confirm: "턴 확정",
    logTitle: "기록",
    logHint: "최근 턴",
    noLog: "아직 기록이 없습니다.",
    catnip: "캣닢",
    expected: "예상",
    turn: "턴",
    wildTone: "야생 성향",
    houseTone: "집냥 성향",
    balancedTone: "균형 성향",
    ritualTitle: "시기가 Ritual AI 서버에 접속하려고 해요",
    ritualCopy: "야생성이 충분히 높고 캣닢 부스터를 여러 번 사용했습니다. 접속을 승인하면 특별한 힘을 얻지만 스트레스도 올라갑니다.",
    approve: "승인",
    reject: "거절",
    ending: "엔딩",
    endingDesc: (title) => `24턴 동안의 선택으로 시기는 '${title}' 엔딩에 도달했습니다.`,
    mint: "Ritual에 기록하기",
    mintPending: "준비 중",
    again: "다시 시작",
    walletMissing: "MetaMask에서 열어주세요. 지갑이 감지되지 않았습니다.",
    chainSwitching: "Ritual Chain으로 전환 중...",
    txPreparing: "기록 트랜잭션을 준비 중입니다...",
    contractMissing: "CONTRACT_ADDRESS가 아직 설정되지 않았습니다.",
    networkGuide: "Ritual Chain으로 전환해주세요. RPC: https://rpc.ritualfoundation.org / Chain ID: 1979 / Symbol: RITUAL / Explorer: https://explorer.ritualfoundation.org",
    txSent: (hash) => `Ritual Chain에 기록했어요: ${hash}`,
    txFailed: (message) => `기록 실패: ${message}`,
  },
  en: {
    langButton: "KO",
    startTitle: "Raise your Siggy?",
    startCopy: "Choose actions and items for 24 turns to shape Siggy's personality and ending.",
    startButton: "Connect Wallet and Start",
    siggyName: "Siggy",
    actionTitle: "Choose Action",
    actionHint: "Pick one",
    itemTitle: "Choose Item",
    previewTitle: "Delta Preview",
    previewWaiting: "Select an action and item to preview stat changes.",
    aiIdle: "Pick an action and item, and I will forecast this turn.",
    confirm: "Confirm Turn",
    logTitle: "History",
    logHint: "Recent turns",
    noLog: "No turns recorded yet.",
    catnip: "Catnip",
    expected: "Expected",
    turn: "Turn",
    wildTone: "Wild leaning",
    houseTone: "House-cat leaning",
    balancedTone: "Balanced",
    ritualTitle: "Siggy is trying to access the Ritual AI server",
    ritualCopy: "Wildness is high and Catnip Booster has been used several times. Approval grants unusual power, but also increases stress.",
    approve: "Approve",
    reject: "Reject",
    ending: "Ending",
    endingDesc: (title) => `After 24 turns, Siggy reached the '${title}' ending.`,
    mint: "Record on Ritual",
    mintPending: "Preparing",
    again: "Play Again",
    walletMissing: "Please open this in MetaMask. No wallet was detected.",
    chainSwitching: "Switching to Ritual Chain...",
    txPreparing: "Preparing record transaction...",
    contractMissing: "CONTRACT_ADDRESS is not set yet.",
    networkGuide: "Please switch to Ritual Chain. RPC: https://rpc.ritualfoundation.org / Chain ID: 1979 / Symbol: RITUAL / Explorer: https://explorer.ritualfoundation.org",
    txSent: (hash) => `Recorded on Ritual Chain: ${hash}`,
    txFailed: (message) => `Record failed: ${message}`,
  },
};

const RITUAL_CHAIN = {
  chainId: "0x7BB",
  chainName: "Ritual",
  nativeCurrency: { name: "RITUAL", symbol: "RITUAL", decimals: 18 },
  rpcUrls: ["https://rpc.ritualfoundation.org"],
  blockExplorerUrls: ["https://explorer.ritualfoundation.org"],
};

const CONTRACT_ADDRESS = "여기에_배포된_주소_입력";

function isContractAddressSet() {
  return /^0x[a-fA-F0-9]{40}$/.test(CONTRACT_ADDRESS);
}

if (!isContractAddressSet()) {
  console.warn("CONTRACT_ADDRESS not set");
}

const STATS = [
  { key: "wildness", label: { ko: "야생성", en: "Wildness" }, color: "var(--color-stat-wild)", initial: 50 },
  { key: "social", label: { ko: "친밀도", en: "Social" }, color: "var(--color-stat-social)", initial: 50 },
  { key: "hygiene", label: { ko: "위생", en: "Hygiene" }, color: "var(--color-stat-hygiene)", initial: 50 },
  { key: "stress", label: { ko: "스트레스", en: "Stress" }, color: "var(--color-stat-stress)", initial: 20 },
  { key: "weight", label: { ko: "체중", en: "Weight" }, color: "var(--color-stat-weight)", initial: 42 },
];

const ACTIONS = [
  { id: "hunt", label: { ko: "사냥 놀이", en: "Hunt Play" }, icon: "./assets/icon_hunt.png", delta: { wildness: 10, social: -2, stress: 3, weight: -2 } },
  { id: "groom", label: { ko: "그루밍", en: "Grooming" }, icon: "./assets/icon_groom.png", delta: { social: 6, hygiene: 12, stress: -5 } },
  { id: "surf", label: { ko: "데이터 서핑", en: "Data Surfing" }, icon: "./assets/icon_surf.png", delta: { wildness: -2, social: 5, stress: 5 } },
  { id: "wheel", label: { ko: "쳇바퀴 달리기", en: "Running Wheel" }, icon: "./assets/icon_wheel.png", delta: { wildness: 4, stress: -6, weight: -7 } },
  { id: "leave", label: { ko: "집 비우기", en: "Leave Home" }, icon: "./assets/icon_leave.png", delta: { wildness: 7, social: -6, hygiene: -5, stress: 8 } },
];

const ITEMS = [
  { id: "feed", label: { ko: "기본 바이오 사료", en: "Bio Feed" }, icon: "./assets/icon_feed.png", delta: { weight: 5, stress: -2 } },
  { id: "churu", label: { ko: "프리미엄 츄르", en: "Premium Churu" }, icon: "./assets/icon_churu.png", delta: { social: 8, weight: 4, stress: -3 } },
  { id: "catnip", label: { ko: "캣닢 부스터", en: "Catnip Booster" }, icon: "./assets/icon_catnip.png", delta: { wildness: 8, stress: 5 } },
  { id: "salmon", label: { ko: "연어 오일", en: "Salmon Oil" }, icon: "./assets/icon_salmon.png", delta: { hygiene: 6, weight: 2, stress: -2 } },
];

const AI_COMMENTS = {
  ko: [
    "이번 선택은 시기의 성격을 부드럽게 밀어줍니다.",
    "좋아요. 수치가 한쪽으로 확 기울지는 않지만 안정적이에요.",
    "시기가 꽤 강한 신호를 받았어요. 엔딩 방향이 조금 바뀔 수 있습니다.",
    "스트레스 관리가 중요해 보여요. 다음 턴에는 회복 행동도 좋아요.",
  ],
  en: [
    "This choice nudges Siggy's personality in a soft direction.",
    "Nice. The stats stay stable without swinging too hard.",
    "Siggy received a strong signal. The ending path may shift.",
    "Stress needs attention. A recovery action could help next turn.",
  ],
};

const ENDINGS = [
  { id: "overlord", image: "./assets/ending_01_overlord.png", title: { ko: "성역의 지배자, 초지능 Siggy", en: "Sanctum Overlord, Superintelligent Siggy" } },
  { id: "lapcat", image: "./assets/ending_02_lapcat.png", title: { ko: "방구석 무릎냥이", en: "Cozy Lap Cat" } },
  { id: "megaloaf", image: "./assets/ending_03_megaloaf.png", title: { ko: "거대 식빵 뚱냥이", en: "Mega Loaf Chonker" } },
  { id: "celeb", image: "./assets/ending_04_celeb.png", title: { ko: "인스타 스타 셀럽묘", en: "Viral Celebrity Cat" } },
  { id: "streetking", image: "./assets/ending_05_streetking.png", title: { ko: "길거리 대장 낭만고양이", en: "Romantic Street King" } },
  { id: "hunter", image: "./assets/ending_06_hunter.png", title: { ko: "사냥꾼 호랑이냥", en: "Tiger Hunter Cat" } },
  { id: "destroyer", image: "./assets/ending_07_destroyer.png", title: { ko: "프로 가구 파괴범", en: "Professional Furniture Destroyer" } },
  { id: "hermit", image: "./assets/ending_08_hermit.png", title: { ko: "은둔형 외톨이 식빵묘", en: "Hermit Loaf Cat" } },
  { id: "tsundere", image: "./assets/ending_09_tsundere.png", title: { ko: "밀당의 천재 츤데레묘", en: "Tsundere Mastermind" } },
  { id: "dusty", image: "./assets/ending_10_dusty.png", title: { ko: "꼬질꼬질 요정 먼지냥", en: "Dusty Little Fairy" } },
  { id: "hissmaster", image: "./assets/ending_11_hissmaster.png", title: { ko: "방구석 여포 하악질 마스터", en: "Hiss Master of the Room" } },
  { id: "alien", image: "./assets/ending_12_alien.png", title: { ko: "우주선 납치 엔딩", en: "Alien Abduction Ending" } },
];

const INITIAL_STATE = {
  lang: "ko",
  screen: "start",
  turn: 0,
  selectedAction: null,
  selectedItem: null,
  catnipUses: 0,
  ritualApproved: false,
  walletAddress: null,
  stats: Object.fromEntries(STATS.map((stat) => [stat.key, stat.initial])),
  log: [],
};

let state = loadState();

function loadState() {
  try {
    return { ...INITIAL_STATE, ...JSON.parse(localStorage.getItem("siggy-maker-state") || "{}") };
  } catch {
    return structuredClone(INITIAL_STATE);
  }
}

function saveState() {
  localStorage.setItem("siggy-maker-state", JSON.stringify(state));
}

function t(key) {
  return COPY[state.lang][key];
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function labelFor(source) {
  return source.label[state.lang];
}

function selectedAction() {
  return ACTIONS.find((action) => action.id === state.selectedAction);
}

function selectedItem() {
  return ITEMS.find((item) => item.id === state.selectedItem);
}

function sumDeltas(action = selectedAction(), item = selectedItem()) {
  const next = {};
  [action?.delta, item?.delta].filter(Boolean).forEach((delta) => {
    Object.entries(delta).forEach(([key, value]) => {
      next[key] = (next[key] || 0) + value;
    });
  });
  return next;
}

function applyDeltas(stats, delta) {
  const next = { ...stats };
  Object.entries(delta).forEach(([key, value]) => {
    next[key] = clamp((next[key] || 0) + value);
  });
  return next;
}

function currentBodyType(stats = state.stats) {
  if (state.turn < 6) return "kitten";
  if (stats.weight >= 64) return "chubby";
  if (stats.weight <= 36) return "sleek";
  return "normal";
}

function avatarSrc(type = currentBodyType()) {
  return AVATARS[type];
}

function bodyTypeLabel(type = currentBodyType()) {
  const labels = {
    ko: { kitten: "아깽이", sleek: "날렵형", normal: "기본형", chubby: "통통형" },
    en: { kitten: "Kitten", sleek: "Sleek", normal: "Balanced", chubby: "Chubby" },
  };
  return labels[state.lang][type];
}

function resolveEnding(stats = state.stats) {
  if (state.ritualApproved && stats.wildness >= 78) return ENDINGS[0];
  if (stats.social >= 78 && stats.stress <= 35) return ENDINGS[1];
  if (stats.weight >= 78) return ENDINGS[2];
  if (stats.social >= 72 && stats.hygiene >= 65) return ENDINGS[3];
  if (stats.wildness >= 76 && stats.social <= 38) return ENDINGS[4];
  if (stats.wildness >= 70 && stats.weight <= 42) return ENDINGS[5];
  if (stats.stress >= 76 && stats.wildness >= 55) return ENDINGS[6];
  if (stats.social <= 30 && stats.stress <= 48) return ENDINGS[7];
  if (stats.social >= 58 && stats.wildness >= 58) return ENDINGS[8];
  if (stats.hygiene <= 32) return ENDINGS[9];
  if (stats.stress >= 74) return ENDINGS[10];
  return ENDINGS[11];
}

function projectedEnding() {
  return resolveEnding(applyDeltas(state.stats, sumDeltas()));
}

function renderStaticText() {
  document.documentElement.lang = state.lang;
  document.getElementById("langToggle").textContent = t("langButton");
  document.getElementById("startTitle").textContent = t("startTitle");
  document.getElementById("startCopy").textContent = t("startCopy");
  document.getElementById("startGame").textContent = t("startButton");
  document.getElementById("siggyName").textContent = t("siggyName");
  document.getElementById("actionTitle").textContent = t("actionTitle");
  document.getElementById("actionHint").textContent = t("actionHint");
  document.getElementById("itemTitle").textContent = t("itemTitle");
  document.getElementById("previewTitle").textContent = t("previewTitle");
  document.getElementById("confirmTurn").textContent = t("confirm");
  document.getElementById("logTitle").textContent = t("logTitle");
  document.getElementById("logHint").textContent = t("logHint");
  document.getElementById("ritualTitle").textContent = t("ritualTitle");
  document.getElementById("ritualCopy").textContent = t("ritualCopy");
  document.getElementById("approveRitual").textContent = t("approve");
  document.getElementById("rejectRitual").textContent = t("reject");
  document.getElementById("mintNft").textContent = isContractAddressSet() ? t("mint") : t("mintPending");
  document.getElementById("playAgain").textContent = t("again");
}

function renderScreens() {
  document.getElementById("startScreen").hidden = state.screen !== "start";
  document.getElementById("gameScreen").hidden = state.screen !== "game";
  document.getElementById("endingScreen").hidden = state.screen !== "ending";
}

function renderStats(target = document.getElementById("statsList"), stats = state.stats) {
  target.innerHTML = STATS.map((stat) => `
    <div class="stat-row">
      <span class="stat-label"><strong>${stat.label[state.lang]}</strong></span>
      <div class="bar" aria-label="${stat.label[state.lang]} ${stats[stat.key]}">
        <span style="--value: ${stats[stat.key]}%; --fill: ${stat.color}"></span>
      </div>
      <strong>${stats[stat.key]}</strong>
    </div>
  `).join("");
}

function choiceButton(choice, type) {
  const pressed = type === "action" ? state.selectedAction === choice.id : state.selectedItem === choice.id;
  return `
    <button class="choice-button ${choice.id === "leave" ? "full" : ""}" type="button" data-${type}="${choice.id}" aria-pressed="${pressed}">
      <span class="choice-icon"><img src="${choice.icon}" alt="" /></span>
      <span>${labelFor(choice)}</span>
    </button>
  `;
}

function renderChoices() {
  document.getElementById("actionGrid").innerHTML = ACTIONS.map((action) => choiceButton(action, "action")).join("");
  document.getElementById("itemGrid").innerHTML = ITEMS.map((item) => choiceButton(item, "item")).join("");

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAction = button.dataset.action;
      render();
    });
  });

  document.querySelectorAll("[data-item]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedItem = button.dataset.item;
      render();
    });
  });
}

function renderDeltaPreview() {
  const delta = sumDeltas();
  const preview = document.getElementById("deltaPreview");
  const hasSelection = state.selectedAction && state.selectedItem;
  document.getElementById("confirmTurn").disabled = !hasSelection;

  if (!hasSelection) {
    preview.innerHTML = `<p>${t("previewWaiting")}</p>`;
    document.getElementById("aiText").textContent = t("aiIdle");
    return;
  }

  preview.innerHTML = Object.entries(delta).map(([key, value]) => {
    const stat = STATS.find((item) => item.key === key);
    const sign = value > 0 ? "+" : "";
    return `<span class="${value >= 0 ? "plus" : "minus"}">${stat.label[state.lang]} ${sign}${value}</span>`;
  }).join("");

  const weight = Math.min(3, Math.floor(Object.values(delta).reduce((total, value) => total + Math.abs(value), 0) / 10));
  document.getElementById("aiText").textContent = AI_COMMENTS[state.lang][weight];
}

function renderLog() {
  const list = document.getElementById("logList");
  if (!state.log.length) {
    list.innerHTML = `<li>${t("noLog")}</li>`;
    return;
  }

  list.innerHTML = state.log.slice(-6).reverse().map((entry) => `
    <li>${t("turn")} ${entry.turn}: ${entry.action} + ${entry.item}</li>
  `).join("");
}

function renderEnding() {
  const ending = resolveEnding();
  const mintButton = document.getElementById("mintNft");
  document.getElementById("endingBadge").textContent = t("ending");
  document.getElementById("endingImage").src = ending.image;
  document.getElementById("endingTitle").textContent = ending.title[state.lang];
  document.getElementById("endingDesc").textContent = t("endingDesc")(ending.title[state.lang]);
  mintButton.disabled = !isContractAddressSet();
  renderStats(document.getElementById("endingStats"), state.stats);
}

function utf8ToHex(value) {
  const bytes = new TextEncoder().encode(value);
  return `0x${[...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

async function ensureRitualChain() {
  if (!window.ethereum) throw new Error(t("walletMissing"));

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: RITUAL_CHAIN.chainId }],
    });
  } catch (error) {
    throw new Error(t("networkGuide"));
  }
}

async function recordEndingOnRitual() {
  const toast = document.getElementById("mintToast");
  const button = document.getElementById("mintNft");
  const ending = resolveEnding();

  try {
    if (!isContractAddressSet()) throw new Error(t("contractMissing"));

    toast.hidden = false;
    toast.textContent = t("chainSwitching");
    button.disabled = true;

    await ensureRitualChain();
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const from = accounts[0];
    if (!from) throw new Error(t("walletMissing"));

    toast.textContent = t("txPreparing");
    const payload = {
      wallet: from,
      ending: ending.id,
      stats: {
        wildness: state.stats.wildness,
        social: state.stats.social,
        hygiene: state.stats.hygiene,
        stress: state.stats.stress,
        weight: state.stats.weight,
      },
      turn: state.turn,
      timestamp: new Date().toISOString(),
    };

    const hash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from,
        to: CONTRACT_ADDRESS,
        value: "0x0",
        data: utf8ToHex(JSON.stringify(payload)),
      }],
    });

    toast.textContent = t("txSent")(hash);
  } catch (error) {
    toast.hidden = false;
    toast.textContent = t("txFailed")(error?.message || "Unknown error");
  } finally {
    button.disabled = false;
  }
}

function updateLayoutMode() {
  document.body.dataset.layout = window.matchMedia("(min-width: 900px)").matches ? "desktop" : "mobile";
}

function render() {
  updateLayoutMode();
  renderStaticText();
  renderScreens();

  const type = currentBodyType();
  document.getElementById("startAvatar").src = avatarSrc("kitten");
  document.getElementById("siggyAvatar").src = avatarSrc(type);
  document.getElementById("turnText").textContent = `${state.turn} / 24`;
  document.getElementById("phaseText").textContent = `${bodyTypeLabel(type)} · ${state.stats.wildness > state.stats.social + 15 ? t("wildTone") : state.stats.social > state.stats.wildness + 15 ? t("houseTone") : t("balancedTone")}`;
  document.getElementById("catnipCount").textContent = `${t("catnip")} ${state.catnipUses} / 5`;
  document.getElementById("endingHint").textContent = `${t("expected")} ${projectedEnding().title[state.lang]}`;

  renderStats();
  renderChoices();
  renderDeltaPreview();
  renderLog();
  renderEnding();
  saveState();
}

function processTurn() {
  const action = selectedAction();
  const item = selectedItem();
  if (!action || !item) return;

  state.stats = applyDeltas(state.stats, sumDeltas(action, item));
  state.turn += 1;
  if (item.id === "catnip") state.catnipUses += 1;
  state.log.push({ turn: state.turn, action: labelFor(action), item: labelFor(item) });
  state.selectedAction = null;
  state.selectedItem = null;

  if (!state.ritualApproved && state.stats.wildness >= 72 && state.catnipUses >= 3) {
    document.getElementById("ritualModal").hidden = false;
  }

  if (state.turn >= 24) state.screen = "ending";
  render();
}

function processRitualChoice(approved) {
  state.ritualApproved = approved;
  if (approved) state.stats = applyDeltas(state.stats, { wildness: 12, stress: 10 });
  document.getElementById("ritualModal").hidden = true;
  render();
}

async function startGame() {
  try {
    if (window.ethereum) {
      await ensureRitualChain();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      state.walletAddress = accounts[0] || null;
    }
  } catch (error) {
    console.warn(error?.message || error);
  } finally {
    state.screen = "game";
    render();
  }
}

function resetGame(keepLang = true) {
  const lang = keepLang ? state.lang : "ko";
  state = structuredClone(INITIAL_STATE);
  state.lang = lang;
  document.getElementById("mintToast").hidden = true;
  render();
}

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("confirmTurn").addEventListener("click", processTurn);
document.getElementById("resetGame").addEventListener("click", () => resetGame());
document.getElementById("approveRitual").addEventListener("click", () => processRitualChoice(true));
document.getElementById("rejectRitual").addEventListener("click", () => processRitualChoice(false));
document.getElementById("playAgain").addEventListener("click", () => resetGame());
document.getElementById("mintNft").addEventListener("click", () => {
  recordEndingOnRitual();
});
document.getElementById("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "ko" ? "en" : "ko";
  render();
});
window.addEventListener("resize", render);

render();
