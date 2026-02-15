const qs = (id) => document.getElementById(id);

// ✅ ضع رابط Google Apps Script Web App (/exec) هنا
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbyoDBgujdYJZJR1FIqYosVzN74sLoW8YQvza-lE7yfkxArvxUnnOgIvRBgUzicuf5cn5g/exec";

function isValidTripleName(name){
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return parts.length >= 3 && parts.every(p => p.length >= 2);
}

/* ========== HOME (index.html) ========== */
function initHome(){
  const grid = qs("levelsGrid");
  if (!grid || !window.LEVELS) return;

  grid.innerHTML = "";
  window.LEVELS.forEach(level=>{
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "levelBtn";
    btn.textContent = String(level.id);
    btn.title = level.title;
    btn.addEventListener("click", ()=>{
      const u = new URL("./level.html", window.location.href);
      u.searchParams.set("level", String(level.id));
      window.location.href = u.toString();
    });
    grid.appendChild(btn);
  });
}

/* ========== LEVEL ENGINE (level.html) ========== */
let editor = null;
let currentLevel = null;
let stepIndex = 0;
let hintIndex = 0;
let STUDENT_NAME = "";
let LAST_STEP_PASSED = false;

function escapeHtml(s){
  return (s || "").replace(/[&<>"']/g, (m)=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}
function parseDom(html){
  return new DOMParser().parseFromString(html || "", "text/html");
}
function rawHas(html, needle){ return (html || "").includes(needle); }
function rawRegex(html, re){
  try{ return new RegExp(re, "s").test(html || ""); }catch{ return false; }
}
function textEquals(el, expected){
  return !!el && (el.textContent||"").trim() === expected;
}

function runTest(test, html){
  const doc = parseDom(html);
  switch(test.type){
    case "rawIncludes": return rawHas(html, test.needle);
    case "rawRegex": return rawRegex(html, test.pattern);
    case "hasSelector": return !!doc.querySelector(test.selector);
    case "selectorTextEquals": return textEquals(doc.querySelector(test.selector), test.expected);
    case "titleEquals": return textEquals(doc.querySelector("title"), test.expected);
    case "htmlAttrEquals": return (doc.documentElement.getAttribute(test.attr)||"") === test.expected;
    default: return false;
  }
}

function setStatus(type, msg){
  const box = qs("statusBox");
  if (!box) return;
  box.className = "statusBox " + (type || "");
  box.textContent = msg;
}
function logConsole(text){
  const c = qs("consoleBox");
  if (c) c.textContent = text;
}
function renderPreview(html){
  const frame = qs("previewFrame");
  if (frame) frame.srcdoc = html || "";
}

function showTabLeft(which){
  document.querySelectorAll(".tabs .tab").forEach(b=>b.classList.remove("active"));
  document.querySelector(`.tabs .tab[data-tab="${which}"]`)?.classList.add("active");
  qs("tab-instructions")?.classList.toggle("hidden", which !== "instructions");
  qs("tab-hints")?.classList.toggle("hidden", which !== "hints");
}

function showTabRight(which){
  document.querySelectorAll(".smallTabs .tab").forEach(b=>b.classList.remove("active"));
  document.querySelector(`.smallTabs .tab[data-right="${which}"]`)?.classList.add("active");
  qs("right-preview")?.classList.toggle("hidden", which !== "preview");
  qs("right-console")?.classList.toggle("hidden", which !== "console");
}

function addHint(step){
  const box = qs("hintsBox");
  if (!box) return;

  const hints = step.hints || [];
  if (hintIndex >= hints.length){
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

/* ================== SHEET LOGGING (Per Level Sheet) ================== */
function logToSheet({ action, studentName, levelId, step, status }) {
  if (!SHEET_ENDPOINT) return Promise.reject(new Error("SHEET_ENDPOINT not set"));

  return new Promise((resolve) => {
    // iframe مخفي لاستقبال الإرسال (بدون CORS)
    let iframe = document.getElementById("sheet_iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "sheet_iframe";
      iframe.name = "sheet_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    // form مخفي يرسل POST
    const form = document.createElement("form");
    form.method = "POST";
    form.action = SHEET_ENDPOINT;
    form.target = "sheet_iframe";

    const fields = { action, studentName, levelId, step, status };
    Object.keys(fields).forEach((k) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = String(fields[k] ?? "");
      form.appendChild(input);
    });

    document.body.appendChild(form);

    // ما نقدر نقرأ الرد بسبب cross-origin، بس الإرسال يتم ✅
    form.submit();

    // نظّف
    setTimeout(() => {
      form.remove();
      resolve(true);
    }, 400);
  });
}


/* ================== STEP CONTROL ================== */
function loadStep(index){
  stepIndex = index;
  hintIndex = 0;
  LAST_STEP_PASSED = false;
  qs("submitBtn")?.classList.add("hidden");

  const step = currentLevel.steps[stepIndex];

  qs("stepLabel").textContent = String(stepIndex + 1);
  qs("stepTotal").textContent = String(currentLevel.steps.length);

qs("instructionText").innerHTML = step.instruction.replace(/\n/g, "<br>");  qs("hintsBox").innerHTML = "";

  editor.setValue(step.starterCode || "");
  renderPreview(editor.getValue());

  logConsole("/** Output */");
  setStatus("", "اكتب الكود ثم اضغط Check.");
}

function resetToPreviousStepStarter(){
  // ✅ يرجع لبداية الخطوة السابقة (مو الحالية)
  if (stepIndex === 0){
    editor.setValue(currentLevel.steps[0].starterCode || "");
    renderPreview(editor.getValue());
    setStatus("", "تمت إعادة الضبط لبداية أول خطوة.");
    return;
  }

  const prevIndex = stepIndex - 1;
  loadStep(prevIndex);
  setStatus("", "تمت إعادة الضبط لبداية الخطوة السابقة.");
}

function checkStep(){
  const step = currentLevel.steps[stepIndex];
  const html = editor.getValue();
  renderPreview(html);

  const ok = runTest(step.test, html);
  if (!ok){
    setStatus("bad", "❌ مو صحيح بعد. افتح Hints واطلب تلميح (بدون إجابات).");
    logConsole("FAILED");
    showTabLeft("hints");
    addHint(step);
    return;
  }

  setStatus("ok", "✅ أنجزت الخطوة بنجاح!");
  logConsole("PASSED");

  // ✅ سجّل نجاح الخطوة داخل شيت المستوى الخاص فيه
  logToSheet({
    action: "progress",
    studentName: STUDENT_NAME,
    levelId: currentLevel.id,
    step: stepIndex + 1,
    status: "Passed"
  }).catch(()=>{});

  // إذا آخر خطوة: فعّل زر إرسال الحل
  if (stepIndex === currentLevel.steps.length - 1){
    LAST_STEP_PASSED = true;
    qs("submitBtn")?.classList.remove("hidden");
    setStatus("ok", "🏁 خلصت آخر خطوة! اضغط (إرسال الحل).");
    return;
  }

  loadStep(stepIndex + 1);
}

async function submitSolution(){
  if (!LAST_STEP_PASSED){
    setStatus("bad", "لا يمكن إرسال الحل قبل نجاح آخر خطوة.");
    return;
  }
  if (!SHEET_ENDPOINT){
    setStatus("bad", "SHEET_ENDPOINT غير مضبوط. ضع رابط Web App (/exec) في app.js.");
    return;
  }

  try{
    await logToSheet({
      action: "submit",
      studentName: STUDENT_NAME,
      levelId: currentLevel.id,
      step: currentLevel.steps.length,
      status: "Submitted"
    });

    setStatus("ok", "✅ تم إرسال الحل وتسجيله في شيت المستوى.");
    logConsole("SUBMITTED ✅");

  }catch(err){
    console.error(err);
    setStatus("bad", `تعذر إرسال الحل: ${String(err.message || err)}`);
    logConsole("SUBMIT FAILED");
  }
}

function initLevel(){
  if (!qs("editor")) return;

  const u = new URL(window.location.href);
  const levelId = Number(u.searchParams.get("level") || 0);
  currentLevel = window.LEVELS?.find(l=>l.id === levelId);

  if (!currentLevel){
    window.location.href = "./index.html";
    return;
  }

  qs("levelTitle").textContent = `Level ${currentLevel.id} — ${currentLevel.title}`;

  editor = CodeMirror.fromTextArea(qs("editor"), {
    mode: "htmlmixed",
    theme: "material-darker",
    lineNumbers: true,
    tabSize: 2
  });
  editor.on("change", ()=> renderPreview(editor.getValue()));

  document.querySelectorAll(".tabs .tab").forEach(btn=>{
    btn.addEventListener("click", ()=> showTabLeft(btn.getAttribute("data-tab")));
  });
  document.querySelectorAll(".smallTabs .tab").forEach(btn=>{
    btn.addEventListener("click", ()=> showTabRight(btn.getAttribute("data-right")));
  });

  qs("runBtn")?.addEventListener("click", ()=> renderPreview(editor.getValue()));
  qs("checkBtn")?.addEventListener("click", checkStep);
  qs("hintBtn")?.addEventListener("click", ()=> addHint(currentLevel.steps[stepIndex]));
  qs("resetPrevBtn")?.addEventListener("click", resetToPreviousStepStarter);
  qs("submitBtn")?.addEventListener("click", submitSolution);

  // ✅ مودال الاسم
  const modal = qs("nameModal");
  const startBtn = qs("startBtn");
  const nameInput = qs("nameInput");
  const nameErr = qs("nameErr");

  const start = ()=>{
    const name = (nameInput?.value || "").trim();
    if (!isValidTripleName(name)){
      if (nameErr) nameErr.textContent = "اكتب الاسم الثلاثي بشكل صحيح (٣ كلمات على الأقل).";
      return;
    }
    STUDENT_NAME = name;
    qs("studentNameLabel").textContent = STUDENT_NAME;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden","true");

    loadStep(0);
  };

  startBtn?.addEventListener("click", start);
  nameInput?.addEventListener("keydown", (e)=>{ if (e.key === "Enter") start(); });

  showTabLeft("instructions");
  showTabRight("preview");
}

/* Boot */
document.addEventListener("DOMContentLoaded", ()=>{
  initHome();
  initLevel();
});
