/* ── THEME ── */
(function () {
  const saved = localStorage.getItem('ti_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ti_theme', next);
  document.getElementById('themeBtn').textContent = next === 'dark' ? '☀️' : '🌙';
}

/* ── LANGUAGE ── */
let LANG = localStorage.getItem('ti_lang') || 'ko';
let QUESTIONS = LANG === 'ko' ? QUESTIONS_KO : QUESTIONS_EN;

const I18N = {
  ko: {
    title: '기술 면접 훈련 100',
    subtitle: '암기가 아닌 이해를 위한\n기술 면접 훈련 100',
    desc: '답을 먼저 써보고, 꼬리 질문에 답하고, 오개념을 찾아야만 넘어갈 수 있어요.\n진짜 이해했는지 직접 확인하는 5단계 훈련입니다.',
    progress: (m) => `${m} / 100 이해 완료`,
    totalQ: (n) => `총 ${n}개 질문`,
    results: (n) => `${n}개 결과`,
    searchPlaceholder: '🔍 질문 검색...',
    filterAll: '전체',
    filterMastered: '💡 이해',
    filterUnknown: '😵 모름',
    cats: ['알고리즘','자료구조','데이터베이스','네트워크','운영체제','OOP/패턴','웹/프론트','시스템설계'],
    catLabels: ['알고리즘','자료구조','DB','네트워크','OS','OOP/패턴','웹/프론트','시스템설계'],
    statLabels: { mastered:'이해', partial:'부분', unknown:'모름' },
    stage1: '01 · 백지 소환',
    stage1prompt: '모범답안을 보기 전에 지금 알고 있는 것을 직접 써보세요. 빈칸이어도 괜찮아요.',
    stage1placeholder: '여기에 설명을 작성하세요...',
    revealBtn: '모범답안 보기 →',
    stage2: '02 · 모범답안',
    stage3: '03 · 자가 판정 — 모범답안과 비교해서 얼마나 알고 있었나요?',
    assessBtns: { unknown:'😵 몰랐다', partial:'🤔 어렴풋이 알았다', mastered:'💡 명확하게 설명할 수 있다' },
    stage4: '04 · 꼬리 질문',
    stage5: '05 · 오개념 찾기',
    trapPrompt: '아래 설명에서 틀린 부분을 찾아보세요 👀',
    trapBtn: '틀린 이유 보기',
    toastMsgs: { mastered:'💡 이해 완료로 표시했어요!', partial:'🤔 부분 이해로 표시했어요.', unknown:'😵 다시 공부할 목록에 추가했어요.' },
    empty: '검색 결과가 없어요 🔍',
    heroSteps: ['백지 소환','모범답안 확인','자가 판정','꼬리 질문','오개념 찾기'],
    logoText: '// TECH INTERVIEW × 100',
  },
  en: {
    title: 'Tech Interview 100',
    subtitle: 'Tech Interview Training 100\nfor Real Understanding',
    desc: 'Write first, answer follow-ups, spot misconceptions — only then move on.\nA 5-stage training system to verify genuine understanding.',
    progress: (m) => `${m} / 100 mastered`,
    totalQ: (n) => `${n} questions total`,
    results: (n) => `${n} results`,
    searchPlaceholder: '🔍 Search questions...',
    filterAll: 'All',
    filterMastered: '💡 Mastered',
    filterUnknown: '😵 Unknown',
    cats: ['Algorithm','Data Structures','Database','Network','Operating Systems','OOP/Patterns','Web/Frontend','System Design'],
    catLabels: ['Algorithm','Data Structures','DB','Network','OS','OOP/Patterns','Web/Frontend','Sys Design'],
    statLabels: { mastered:'Known', partial:'Partial', unknown:'Unknown' },
    stage1: '01 · Blank Recall',
    stage1prompt: 'Write down what you know before seeing the answer. It\'s okay to leave it blank.',
    stage1placeholder: 'Type your explanation here...',
    revealBtn: 'Show Answer →',
    stage2: '02 · Model Answer',
    stage3: '03 · Self Assessment — How well did you know it?',
    assessBtns: { unknown:"😵 Didn't know", partial:'🤔 Had a vague idea', mastered:'💡 Can explain clearly' },
    stage4: '04 · Follow-up Questions',
    stage5: '05 · Spot the Misconception',
    trapPrompt: 'Find the mistake in the statement below 👀',
    trapBtn: 'Show why it\'s wrong',
    toastMsgs: { mastered:'💡 Marked as mastered!', partial:'🤔 Marked as partial.', unknown:'😵 Added to review list.' },
    empty: 'No results found 🔍',
    heroSteps: ['Blank Recall','Model Answer','Self Assessment','Follow-ups','Spot Mistake'],
    logoText: '// TECH INTERVIEW × 100',
  }
};

function t() { return I18N[LANG]; }

function toggleLang() {
  LANG = LANG === 'ko' ? 'en' : 'ko';
  QUESTIONS = LANG === 'ko' ? QUESTIONS_KO : QUESTIONS_EN;
  localStorage.setItem('ti_lang', LANG);
  currentFilter = 'all';
  currentSearch = '';
  applyI18n();
  renderList();
  updateStats();
}

function applyI18n() {
  const i = t();
  document.title = i.title + ' | ' + (LANG === 'ko' ? '암기가 아닌 이해를' : 'Real Understanding');
  document.querySelector('.logo').textContent = i.logoText;
  document.getElementById('searchInput').placeholder = i.searchPlaceholder;

  // Filter buttons (data-filter stays stable; only update text)
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    const f = btn.dataset.filter;
    if (f === 'all') btn.textContent = i.filterAll;
    else if (f === 'status-mastered') btn.textContent = i.filterMastered;
    else if (f === 'status-unknown') btn.textContent = i.filterUnknown;
    else if (f.startsWith('cat-')) {
      const idx = parseInt(f.slice(4));
      btn.textContent = i.catLabels[idx];
    }
  });

  // Stat labels
  document.querySelectorAll('.hstat').forEach(el => {
    const label = el.querySelector('.hstat-label');
    if (!label) return;
    if (el.classList.contains('mastered')) label.textContent = i.statLabels.mastered;
    else if (el.classList.contains('partial')) label.textContent = i.statLabels.partial;
    else if (el.classList.contains('unknown')) label.textContent = i.statLabels.unknown;
  });

  // Hero
  const heroSteps = document.querySelectorAll('.flow-step');
  heroSteps.forEach((step, idx) => {
    const num = step.querySelector('.num');
    if (num && i.heroSteps[idx]) {
      step.textContent = '';
      step.appendChild(num);
      step.append(' ' + i.heroSteps[idx]);
    }
  });

  // Reset filter active state
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
}

/* ── STATE ── */
const STATE_KEY = 'ti_status_v1';
let statusMap = {};
try { statusMap = JSON.parse(localStorage.getItem(STATE_KEY) || '{}'); } catch (e) {}

function saveStatus() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(statusMap)); } catch (e) {}
}
function getStatus(id) { return statusMap[id] || ''; }

/* ── BUILD CARD ── */
function buildCard(q) {
  const st = getStatus(q.id);
  const cardCls = st ? ` status-${st}` : '';
  const dotCls  = st ? ` ${st}` : '';
  const i = t();

  return `<div class="q-card${cardCls}" id="card-${q.id}">
  <div class="q-header" onclick="toggleCard(${q.id})">
    <span class="q-num">${String(q.id).padStart(2,'0')}</span>
    <span class="q-text">${q.q}</span>
    <div class="q-meta">
      <span class="tag">${q.cat}</span>
      <span class="status-dot${dotCls}" id="dot-${q.id}"></span>
      <span class="chevron">▼</span>
    </div>
  </div>
  <div class="q-body">
    <div class="stage-section recall-section" id="recall-section-${q.id}">
      <div class="stage-label">${i.stage1}</div>
      <div class="recall-prompt">${i.stage1prompt}</div>
      <textarea class="recall-textarea" id="recall-${q.id}" placeholder="${i.stage1placeholder}" rows="4"></textarea>
      <button class="reveal-btn" onclick="revealAnswer(${q.id})">${i.revealBtn}</button>
    </div>
    <div class="stage-section hidden" id="answer-${q.id}">
      <div class="stage-label">${i.stage2}</div>
      <div class="answer-text">${q.a}</div>
      <div class="study-links">${q.links.map(l => `<a href="${l.u}" target="_blank" rel="noopener" class="link-chip">↗ ${l.t}</a>`).join('')}</div>
    </div>
    <div class="stage-section hidden" id="assess-${q.id}">
      <div class="self-label">${i.stage3}</div>
      <div class="assess-btns">
        <button class="assess-btn unknown"  onclick="assess(${q.id},'unknown')">${i.assessBtns.unknown}</button>
        <button class="assess-btn partial"  onclick="assess(${q.id},'partial')">${i.assessBtns.partial}</button>
        <button class="assess-btn mastered" onclick="assess(${q.id},'mastered')">${i.assessBtns.mastered}</button>
      </div>
    </div>
    <div class="stage-section hidden" id="followups-${q.id}">
      <div class="stage-label">${i.stage4}</div>
      ${q.fqs.map((fq, idx) => `
      <div class="followup-item" id="fq-${q.id}-${idx}">
        <div class="followup-q" onclick="toggleFQ(${q.id},${idx})">
          <span class="fq-icon">▶</span>${fq.q}
        </div>
        <div class="followup-a">${fq.a}</div>
      </div>`).join('')}
    </div>
    <div class="stage-section hidden" id="trap-${q.id}">
      <div class="stage-label">${i.stage5}</div>
      <div class="trap-prompt">${i.trapPrompt}</div>
      <div class="trap-text">${q.trap.wrong}</div>
      <button class="trap-answer-btn" onclick="showTrap(${q.id})">${i.trapBtn}</button>
      <div class="trap-reveal" id="trap-reveal-${q.id}">${q.trap.explain}</div>
    </div>
  </div>
</div>`;
}

/* ── ACTIONS ── */
function toggleCard(id) {
  const card = document.getElementById(`card-${id}`);
  const opening = !card.classList.contains('open');
  card.classList.toggle('open');
  if (opening) {
    const st = getStatus(id);
    if (st) {
      document.getElementById(`recall-section-${id}`)?.classList.add('recall-done');
      ['answer', 'assess', 'followups', 'trap'].forEach(s =>
        document.getElementById(`${s}-${id}`)?.classList.remove('hidden'));
      document.querySelector(`#assess-${id} .assess-btn.${st}`)?.classList.add('selected');
    }
  }
}

function revealAnswer(id) {
  const recallSection = document.getElementById(`recall-section-${id}`);
  if (recallSection) recallSection.classList.add('recall-done');
  ['answer', 'assess', 'followups', 'trap'].forEach(s =>
    document.getElementById(`${s}-${id}`)?.classList.remove('hidden'));
  setTimeout(() => {
    document.getElementById(`answer-${id}`)?.scrollIntoView({behavior:'smooth', block:'nearest'});
  }, 50);
}

function assess(id, status) {
  statusMap[id] = status;
  saveStatus();
  const card = document.getElementById(`card-${id}`);
  card.className = card.className.replace(/\bstatus-\w+/g, '').trim();
  if (status) card.classList.add(`status-${status}`);
  const dot = document.getElementById(`dot-${id}`);
  dot.className = `status-dot${status ? ' ' + status : ''}`;
  document.querySelectorAll(`#assess-${id} .assess-btn`).forEach(b => b.classList.remove('selected'));
  document.querySelector(`#assess-${id} .assess-btn.${status}`)?.classList.add('selected');
  updateStats();
  showToast(t().toastMsgs[status]);
}

function toggleFQ(qId, idx) {
  document.getElementById(`fq-${qId}-${idx}`)?.classList.toggle('open');
}

function showTrap(id) {
  const el = document.getElementById(`trap-reveal-${id}`);
  if (el) el.style.display = 'block';
}

/* ── FILTER & SEARCH ── */
let currentFilter = 'all';
let currentSearch = '';

function renderList() {
  const i = t();
  const filtered = QUESTIONS.filter(q => {
    const s = getStatus(q.id);
    let matchFilter = currentFilter === 'all';
    if (!matchFilter && currentFilter.startsWith('cat-')) {
      const idx = parseInt(currentFilter.slice(4));
      matchFilter = t().cats[idx] === q.cat;
    } else if (currentFilter === 'status-mastered') matchFilter = s === 'mastered';
    else if (currentFilter === 'status-unknown')  matchFilter = s === 'unknown';
    const matchSearch = !currentSearch || q.q.toLowerCase().includes(currentSearch);
    return matchFilter && matchSearch;
  });

  document.getElementById('questionsList').innerHTML = filtered.map(buildCard).join('');
  document.getElementById('emptyState').style.display = filtered.length === 0 ? 'block' : 'none';
  document.getElementById('emptyState').textContent = i.empty;
  document.getElementById('resultsInfo').textContent =
    currentFilter === 'all' && !currentSearch
      ? i.totalQ(QUESTIONS.length)
      : i.results(filtered.length);
}

/* ── STATS ── */
function updateStats() {
  let m = 0, p = 0, u = 0;
  QUESTIONS.forEach(q => {
    const s = getStatus(q.id);
    if (s === 'mastered') m++;
    else if (s === 'partial') p++;
    else if (s === 'unknown') u++;
  });
  document.getElementById('statMastered').textContent  = m;
  document.getElementById('statPartial').textContent   = p;
  document.getElementById('statUnknown').textContent   = u;
  document.getElementById('progressFill').style.width  = (m / QUESTIONS.length * 100) + '%';
  document.getElementById('progressText').textContent  = t().progress(m);
}

/* ── TOAST ── */
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  document.getElementById('themeBtn').textContent = theme === 'dark' ? '☀️' : '🌙';

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderList();
    });
  });

  let timer;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderList();
    }, 220);
  });

  applyI18n();
  renderList();
  updateStats();
});
