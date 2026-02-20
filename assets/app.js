const qs = (id) => document.getElementById(id);

// ✅ رابط Google Apps Script Web App (/exec)
const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyoDBgujdYJZJR1FIqYosVzN74sLoW8YQvza-lE7yfkxArvxUnnOgIvRBgUzicuf5cn5g/exec";

// ====== Local Storage Keys ======
const NAME_KEY = "wd1010_full_name";
const DONE_KEY = "wd1010_done_levels"; // { "1": true, "2": true ... }

function getSavedName() {
  return (localStorage.getItem(NAME_KEY) || "").trim();
}
function setSavedName(name) {
  localStorage.setItem(NAME_KEY, (name || "").trim());
}
function isValidTripleName(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return parts.length >= 3 && parts.every((p) => p.length >= 2);
}
function getDoneMap() {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) || "{}");
  } catch {
    return {};
  }
}
function isDone(levelId) {
  const m = getDoneMap();
  return !!m[String(levelId)];
}
function setDone(levelId) {
  const m = getDoneMap();
  m[String(levelId)] = true;
  localStorage.setItem(DONE_KEY, JSON.stringify(m));
}

// ========== Google Sheet Logging (No-CORS safe) ==========
function logToSheet({ action, studentName, levelId, stepIndex }) {
  if (!SHEET_ENDPOINT) return Promise.resolve(false);

  return fetch(SHEET_ENDPOINT, {
    method: "POST",
    mode: "no-cors", // ✅ يعمل مع GitHub Pages + iPhone Safari
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action,
      studentName,
      levelId,
      stepIndex: stepIndex ?? "",
      page: location.pathname,
      ua: navigator.userAgent,
      ts: new Date().toISOString(),
    }),
    keepalive: true,
  })
    .then(() => true)
    .catch(() => false);
}

// ========== HOME NAME MODAL ==========
function openHomeNameModal() {
  const modal = qs("homeNameModal");
  const input = qs("homeNameInput");
  const err = qs("homeNameErr");
  if (!modal) return;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  if (err) err.textContent = "";
  setTimeout(() => input?.focus(), 60);
}
function closeHomeNameModal() {
  const modal = qs("homeNameModal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
function initHomeNameModal() {
  const btn = qs("homeNameSaveBtn");
  const input = qs("homeNameInput");
  const err = qs("homeNameErr");
  if (!btn || !input) return;

  const save = () => {
    const name = (input.value || "").trim().replace(/\s+/g, " ");
    if (!isValidTripleName(name)) {
      if (err) err.textContent = "اكتب الاسم الثلاثي بشكل صحيح (٣ كلمات على الأقل).";
      input.focus();
      return;
    }
    setSavedName(name);
    closeHomeNameModal();
  };

  btn.addEventListener("click", save);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") save();
  });
}

// ========== HOME (index.html) ==========
function initHome() {
  const grid = qs("levelsGrid");
  if (!grid || !window.LEVELS) return;

  grid.innerHTML = "";

  window.LEVELS.forEach((level) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "levelBtn";
    btn.textContent = String(level.id);
    btn.title = level.title;

    // ✅ للّون الأخضر
    btn.setAttribute("data-level", String(level.id));
    if (isDone(level.id)) btn.classList.add("isDone");

    btn.addEventListener("click", () => {
      if (!getSavedName()) {
        openHomeNameModal();
        return;
      }
      const u = new URL("./level.html", window.location.href);
      u.searchParams.set("level", String(level.id));
      window.location.href = u.toString();
    });

    grid.appendChild(btn);
  });

  // ✅ اطلب الاسم مرة واحدة فقط في الرئيسية
  if (!getSavedName()) openHomeNameModal();
}

/* ========== LEVEL ENGINE (level.html) ========== */
let editor = null;
let currentLevel = null;
let stepIndex = 0;
let hintIndex = 0;
let STUDENT_NAME = "";
let LAST_STEP_PASSED = false;
let START_LOGGED = false;

function escapeHtml(s) {
  return (s || "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

function parseDom(html) {
  return new DOMParser().parseFromString(html || "", "text/html");
}
function rawHas(html, needle) { return (html || "").includes(needle); }
function rawRegex(html, re) {
  try { return new RegExp(re, "s").test(html || ""); } catch { return false; }
}
function textEquals(el, expected) {
  return !!el && (el.textContent || "").trim() === expected;
}

function runTest(test, html) {
  const doc = parseDom(html);
  switch (test.type) {
    case "rawIncludes": return rawHas(html, test.needle);
    case "rawRegex": return rawRegex(html, test.pattern);
    case "hasSelector": return !!doc.querySelector(test.selector);
    case "selectorTextEquals": return textEquals(doc.querySelector(test.selector), test.expected);
    case "titleEquals": return textEquals(doc.querySelector("title"), test.expected);
    case "htmlAttrEquals": return (doc.documentElement.getAttribute(test.attr) || "") === test.expected;
    default: return false;
  }
}

function setStatus(type, msg) {
  const box = qs("statusBox");
  if (!box) return;
  box.className = "statusBox " + (type || "");
  box.textContent = msg;
}
function logConsole(text) {
  const c = qs("consoleBox");
  if (c) c.textContent = text;
}
function renderPreview(html) {
  const frame = qs("previewFrame");
  if (frame) frame.srcdoc = html || "";
}

function showTabLeft(which) {
  document.querySelectorAll(".tabs .tab").forEach((b) => b.classList.remove("active"));
  document.querySelector(`.tabs .tab[data-tab="${which}"]`)?.classList.add("active");
  qs("tab-instructions")?.classList.toggle("hidden", which !== "instructions");
  qs("tab-hints")?.classList.toggle("hidden", which !== "hints");
}

function showTabRight(which) {
  document.querySelectorAll(".smallTabs .tab").forEach((b) => b.classList.remove("active"));
  document.querySelector(`.smallTabs .tab[data-right="${which}"]`)?.classList.add("active");
  qs("right-preview")?.classList.toggle("hidden", which !== "preview");
  qs("right-console")?.classList.toggle("hidden", which !== "console");
}

function addHint(step) {
  const box = qs("hintsBox");
  if (!box) return;

  const hints = step.hints || [];
  if (hintIndex >= hints.length) {
    const div = document.createElement("div");
    div.className = "hintItem";
    div.textContent = "مافي تلميحات إضافية لهالخطوة ✅";
    box.appendChild(div);
    return;
  }

  const div = document.createElement("div");
  div.className = "hintItem";
  div.textContent = hints[hintIndex++];
  box.appendChild(div);
}

function loadStep(index) {
  stepIndex = index;
  hintIndex = 0;
  LAST_STEP_PASSED = false;
  qs("submitBtn")?.classList.add("hidden");

  const step = currentLevel.steps[stepIndex];

  qs("stepLabel").textContent = String(stepIndex + 1);
  qs("stepTotal").textContent = String(currentLevel.steps.length);

  qs("instructionText").innerHTML = escapeHtml(step.instruction).replace(/\n/g, "<br>");
  qs("hintsBox").innerHTML = "";

  editor.setValue(step.starterCode || "");
  renderPreview(editor.getValue());

  logConsole("/** Output */");
  setStatus("", "اكتب الكود ثم اضغط Check.");
}

function resetToPreviousStepStarter() {
  if (stepIndex === 0) {
    editor.setValue(currentLevel.steps[0].starterCode || "");
    renderPreview(editor.getValue());
    setStatus("", "تمت إعادة الضبط لبداية أول خطوة.");
    return;
  }
  const prevIndex = stepIndex - 1;
  loadStep(prevIndex);
  setStatus("", "تمت إعادة الضبط لبداية الخطوة السابقة.");
}

function checkStep() {
  const step = currentLevel.steps[stepIndex];
  const html = editor.getValue();
  renderPreview(html);

  const ok = runTest(step.test, html);
  if (!ok) {
    setStatus("bad", "❌ مو صحيح بعد. افتح Hints واطلب تلميح (بدون إجابات).");
    logConsole("FAILED");
    showTabLeft("hints");
    addHint(step);
    return;
  }

  setStatus("ok", "✅ أنجزت الخطوة بنجاح!");
  logConsole("PASSED");

  if (stepIndex === currentLevel.steps.length - 1) {
    LAST_STEP_PASSED = true;
    qs("submitBtn")?.classList.remove("hidden");
    setStatus("ok", "🏁 خلصت آخر خطوة! اضغط (إرسال الحل).");
    return;
  }

  loadStep(stepIndex + 1);
}

async function submitSolution() {
  if (!LAST_STEP_PASSED) {
    setStatus("bad", "لا يمكن إرسال الحل قبل نجاح آخر خطوة.");
    return;
  }

  // ✅ حاول الإرسال (حتى لو لا نستطيع قراءة الرد بسبب no-cors)
  const sent = await logToSheet({
    action: "submit",
    studentName: STUDENT_NAME,
    levelId: currentLevel.id,
    stepIndex,
  });

  // ✅ علّم المستوى مكتمل محليًا دائمًا بعد ضغط Submit
  setDone(currentLevel.id);

  if (sent) {
    setStatus("ok", "✅ تم إرسال الحل وتسجيله: Complete");
    logConsole("COMPLETE ✅");
  } else {
    setStatus("bad", "⚠️ تم حفظ الإكمال على جهازك، لكن تعذر الإرسال للشيت (تحقق من الإنترنت).");
    logConsole("SUBMIT FAILED (offline/CORS)");
  }
}

function initLevel() {
  if (!qs("editor")) return;

  const u = new URL(window.location.href);
  const levelId = Number(u.searchParams.get("level") || 0);
  currentLevel = window.LEVELS?.find((l) => l.id === levelId);

  if (!currentLevel) {
    window.location.href = "./index.html";
    return;
  }

  // ✅ الاسم من الرئيسية فقط
  STUDENT_NAME = getSavedName();
  if (!STUDENT_NAME) {
    window.location.href = "./index.html";
    return;
  }
  qs("studentNameLabel").textContent = STUDENT_NAME;

  qs("levelTitle").textContent = `Level ${currentLevel.id} — ${currentLevel.title}`;

  editor = CodeMirror.fromTextArea(qs("editor"), {
    mode: "htmlmixed",
    theme: "material-darker",
    lineNumbers: true,
    tabSize: 2,
  });
  editor.on("change", () => renderPreview(editor.getValue()));

  document.querySelectorAll(".tabs .tab").forEach((btn) => {
    btn.addEventListener("click", () => showTabLeft(btn.getAttribute("data-tab")));
  });
  document.querySelectorAll(".smallTabs .tab").forEach((btn) => {
    btn.addEventListener("click", () => showTabRight(btn.getAttribute("data-right")));
  });

  qs("runBtn")?.addEventListener("click", () => renderPreview(editor.getValue()));
  qs("checkBtn")?.addEventListener("click", checkStep);
  qs("hintBtn")?.addEventListener("click", () => addHint(currentLevel.steps[stepIndex]));
  qs("resetPrevBtn")?.addEventListener("click", resetToPreviousStepStarter);
  qs("submitBtn")?.addEventListener("click", submitSolution);

  // ✅ سجّل start للمستوى مرة وحدة (بدون كراش)
  if (!START_LOGGED) {
    START_LOGGED = true;
    logToSheet({
      action: "start",
      studentName: STUDENT_NAME,
      levelId: currentLevel.id,
      stepIndex: 0,
    });
  }

  showTabLeft("instructions");
  showTabRight("preview");

  loadStep(0);
}

/* Boot */
document.addEventListener("DOMContentLoaded", () => {
  initHomeNameModal();
  initHome();
  initLevel();
});