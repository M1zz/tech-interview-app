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
  const tagCls  = `tag tag-${q.cat.replace(/\//g, '\\/')}`;

  return `<div class="q-card${cardCls}" id="card-${q.id}">
  <div class="q-header" onclick="toggleCard(${q.id})">
    <span class="q-num">${String(q.id).padStart(2,'0')}</span>
    <span class="q-text">${q.q}</span>
    <div class="q-meta">
      <span class="${tagCls}">${q.cat}</span>
      <span class="status-dot${dotCls}" id="dot-${q.id}"></span>
      <span class="chevron">▼</span>
    </div>
  </div>
  <div class="q-body">
    <div class="stage-section recall-section" id="recall-section-${q.id}">
      <div class="stage-label">01 · 백지 소환</div>
      <div class="recall-prompt">모범답안을 보기 전에 지금 알고 있는 것을 직접 써보세요. 빈칸이어도 괜찮아요.</div>
      <textarea class="recall-textarea" id="recall-${q.id}" placeholder="여기에 설명을 작성하세요..." rows="4"></textarea>
      <button class="reveal-btn" onclick="revealAnswer(${q.id})">모범답안 보기 →</button>
    </div>
    <div class="stage-section hidden" id="answer-${q.id}">
      <div class="stage-label">02 · 모범답안</div>
      <div class="answer-text">${q.a}</div>
      <div class="study-links">${q.links.map(l => `<a href="${l.u}" target="_blank" rel="noopener" class="link-chip">↗ ${l.t}</a>`).join('')}</div>
    </div>
    <div class="stage-section hidden" id="assess-${q.id}">
      <div class="self-label">03 · 자가 판정 — 모범답안과 비교해서 얼마나 알고 있었나요?</div>
      <div class="assess-btns">
        <button class="assess-btn unknown"  onclick="assess(${q.id},'unknown')">😵 몰랐다</button>
        <button class="assess-btn partial"  onclick="assess(${q.id},'partial')">🤔 어렴풋이 알았다</button>
        <button class="assess-btn mastered" onclick="assess(${q.id},'mastered')">💡 명확하게 설명할 수 있다</button>
      </div>
    </div>
    <div class="stage-section hidden" id="followups-${q.id}">
      <div class="stage-label">04 · 꼬리 질문</div>
      ${q.fqs.map((fq, i) => `
      <div class="followup-item" id="fq-${q.id}-${i}">
        <div class="followup-q" onclick="toggleFQ(${q.id},${i})">
          <span class="fq-icon">▶</span>${fq.q}
        </div>
        <div class="followup-a">${fq.a}</div>
      </div>`).join('')}
    </div>
    <div class="stage-section hidden" id="trap-${q.id}">
      <div class="stage-label">05 · 오개념 찾기</div>
      <div class="trap-prompt">아래 설명에서 틀린 부분을 찾아보세요 👀</div>
      <div class="trap-text">"${q.trap.wrong}"</div>
      <button class="trap-answer-btn" onclick="showTrap(${q.id})">틀린 이유 보기</button>
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
  // 백지 소환 섹션 접기
  const recallSection = document.getElementById(`recall-section-${id}`);
  if (recallSection) recallSection.classList.add('recall-done');
  ['answer', 'assess', 'followups', 'trap'].forEach(s =>
    document.getElementById(`${s}-${id}`)?.classList.remove('hidden'));
  // 모범답안 섹션으로 스크롤
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
  const msgs = { mastered: '💡 이해 완료로 표시했어요!', partial: '🤔 부분 이해로 표시했어요.', unknown: '😵 다시 공부할 목록에 추가했어요.' };
  showToast(msgs[status]);
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
  const filtered = QUESTIONS.filter(q => {
    const s = getStatus(q.id);
    const matchFilter =
      currentFilter === 'all' ||
      currentFilter === q.cat ||
      (currentFilter === 'status-mastered' && s === 'mastered') ||
      (currentFilter === 'status-unknown'  && s === 'unknown');
    const matchSearch = !currentSearch || q.q.toLowerCase().includes(currentSearch);
    return matchFilter && matchSearch;
  });

  document.getElementById('questionsList').innerHTML = filtered.map(buildCard).join('');
  document.getElementById('emptyState').style.display = filtered.length === 0 ? 'block' : 'none';
  document.getElementById('resultsInfo').textContent =
    currentFilter === 'all' && !currentSearch
      ? `총 ${QUESTIONS.length}개 질문`
      : `${filtered.length}개 결과`;
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
  document.getElementById('masteredCount').textContent = m;
  document.getElementById('statMastered').textContent  = m;
  document.getElementById('statPartial').textContent   = p;
  document.getElementById('statUnknown').textContent   = u;
  document.getElementById('progressFill').style.width  = (m / QUESTIONS.length * 100) + '%';
}

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Set theme icon
  const theme = document.documentElement.getAttribute('data-theme');
  document.getElementById('themeBtn').textContent = theme === 'dark' ? '☀️' : '🌙';

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderList();
    });
  });

  // Search
  let timer;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderList();
    }, 220);
  });

  renderList();
  updateStats();
});
