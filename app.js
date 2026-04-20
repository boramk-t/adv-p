/* ===== Navigation ===== */
const viewTitles = {
  home: '실시간 운영 현황',
  stats: '서비스 이용 통계',
  accuracy: '서비스 정확도',
  consult: '상담 이력 조회',
  'consult-detail': '상담 이력 조회 > 상세',
  'ai-manage': 'AI 정확도 관리',
  'ai-eval': 'AI 정확도 평가',
  codes: '상담 코드 조회',
  keywords: '키워드 사전 관리',
  notice: '공지사항',
  'notice-detail': '공지사항 > 게시글',
  'notice-write': '공지사항 > 글 작성'
};

function switchView(view, btn) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + view);
  if (target) target.classList.add('active');

  // Update sidebar active state
  if (btn) {
    document.querySelectorAll('.sidebar-menu-btn').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');
  }

  // Init charts if needed — use rAF to ensure the view is visible before Chart.js measures canvas
  if (view === 'stats') requestAnimationFrame(function(){ requestAnimationFrame(initStatsCharts); });
  if (view === 'accuracy') requestAnimationFrame(function(){ requestAnimationFrame(initAccuracyChart); });
}

/* ===== Tab Toggle ===== */
function toggleTab(el) {
  el.parentElement.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/* ===== Eval Tab Toggle ===== */
function toggleEvalTab(el, tabId) {
  // Toggle tab triggers
  el.parentElement.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  // Toggle tab content
  el.closest('.card').querySelectorAll('.eval-tab-content').forEach(c => c.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}

/* ===== Keyword Tab Toggle ===== */
function toggleKwTab(el, tabId) {
  el.parentElement.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.kw-tab-content').forEach(c => c.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}

/* ===== Dropdown Filters ===== */
function toggleDropdown(trigger) {
  const panel = trigger.nextElementSibling;
  const isOpen = panel.classList.contains('show');
  document.querySelectorAll('.filter-panel').forEach(p => p.classList.remove('show'));
  document.querySelectorAll('.filter-trigger').forEach(t => t.classList.remove('open'));
  if (!isOpen) { panel.classList.add('show'); trigger.classList.add('open'); }
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.filter-dropdown')) {
    document.querySelectorAll('.filter-panel').forEach(p => p.classList.remove('show'));
    document.querySelectorAll('.filter-trigger').forEach(t => t.classList.remove('open'));
  }
});

/* ===== Slider value update ===== */
document.addEventListener('input', function(e) {
  if (e.target.classList.contains('slider')) {
    const valueEl = e.target.parentElement.querySelector('.slider-value');
    if (valueEl) valueEl.textContent = e.target.value + '%';
  }
});

/* ===== Charts ===== */
const dates = ['04/09','04/10','04/11','04/12','04/13','04/14','04/15'];
const gridColor = 'rgba(226,232,240,0.8)';
const tickFont = { size: 12, family: 'Pretendard' };
const tickColor = '#64748B';

let statsChartInstances = [];
function initStatsCharts() {
  // Destroy existing chart instances so they re-render at correct size
  statsChartInstances.forEach(function(c) { c.destroy(); });
  statsChartInstances = [];

  var labels14 = ['04/02','04/03','04/04','04/05','04/06','04/07','04/08','04/09','04/10','04/11','04/12','04/13','04/14','04/15'];
  var commonOpts = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#020617', titleColor: '#F8FAFC', bodyColor: '#F8FAFC',
        titleFont: { family: 'Pretendard', size: 13, weight: '600' },
        bodyFont: { family: 'Pretendard', size: 12 },
        padding: 10, cornerRadius: 8, displayColors: true, boxPadding: 4
      }
    }
  };

  /* 운영 효율 추이 — Dual Y-Axis */
  var ctxEff = document.getElementById('chart-efficiency');
  if (ctxEff) {
    statsChartInstances.push(new Chart(ctxEff, {
      type: 'line',
      data: {
        labels: labels14,
        datasets: [
          {
            label: '일 총 상담 콜 수',
            data: [2450,2680,2780,2320,2150,2590,2720,2650,2780,2920,2510,2340,2700,2847],
            borderColor: '#DDD6FE', backgroundColor: 'rgba(221,214,254,.08)',
            borderWidth: 2, tension: .4, fill: true,
            pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#DDD6FE', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2,
            yAxisID: 'y'
          },
          {
            label: '일 평균 상담시간',
            data: [340,335,342,355,348,330,325,335,342,328,350,345,310,342],
            borderColor: '#C4B5FD', backgroundColor: 'rgba(196,181,253,.08)',
            borderWidth: 2, tension: .4, fill: true, borderDash: [6,3],
            pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#C4B5FD', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        ...commonOpts,
        plugins: { ...commonOpts.plugins, tooltip: { ...commonOpts.plugins.tooltip, callbacks: {
          label: function(ctx) { return ctx.datasetIndex === 0 ? ' 일 총 상담 콜 수  ' + ctx.parsed.y.toLocaleString() + '건' : ' 일 평균 상담시간  ' + ctx.parsed.y + '초'; }
        }}},
        scales: {
          x: { ticks: { font: tickFont, color: tickColor }, grid: { color: 'rgba(226,232,240,0.5)', drawBorder: false } },
          y: { position: 'left', title: { display: true, text: '콜 수 (건)', font: { size: 11, family: 'Pretendard' }, color: tickColor }, ticks: { font: tickFont, color: tickColor }, grid: { color: 'rgba(226,232,240,0.5)', drawBorder: false }, border: { display: false } },
          y1: { position: 'right', title: { display: true, text: '상담시간 (초)', font: { size: 11, family: 'Pretendard' }, color: tickColor }, ticks: { font: tickFont, color: tickColor }, grid: { drawOnChartArea: false }, border: { display: false } }
        }
      }
    }));
  }

  /* 시스템 활용도 추이 — Single Y-Axis (%) */
  var ctxUtil = document.getElementById('chart-utilization');
  if (ctxUtil) {
    statsChartInstances.push(new Chart(ctxUtil, {
      type: 'line',
      data: {
        labels: labels14,
        datasets: [
          {
            label: '어드바이저 이용률',
            data: [62.1,64.5,65.2,63.8,66.0,67.2,68.5,65.2,68.1,70.3,67.5,69.8,66.0,72.5],
            borderColor: '#A78BFA', backgroundColor: 'rgba(167,139,250,.08)',
            borderWidth: 2, tension: .4, fill: true,
            pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#A78BFA', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2
          },
          {
            label: '지식검색률',
            data: [52.3,54.0,55.1,53.5,56.2,57.0,58.5,55.1,58.3,60.0,57.2,59.5,54.0,60.2],
            borderColor: '#DDD6FE', backgroundColor: 'rgba(221,214,254,.08)',
            borderWidth: 2, tension: .4, fill: true, borderDash: [6,3],
            pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#DDD6FE', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        ...commonOpts,
        plugins: { ...commonOpts.plugins, tooltip: { ...commonOpts.plugins.tooltip, callbacks: {
          label: function(ctx) { return ' ' + ctx.dataset.label + '  ' + ctx.parsed.y.toFixed(1) + '%'; }
        }}},
        scales: {
          x: { ticks: { font: tickFont, color: tickColor }, grid: { color: 'rgba(226,232,240,0.5)', drawBorder: false } },
          y: { min: 40, max: 80, title: { display: true, text: '%', font: { size: 11, family: 'Pretendard' }, color: tickColor }, ticks: { font: tickFont, color: tickColor, callback: function(v) { return v + '%'; } }, grid: { color: 'rgba(226,232,240,0.5)', drawBorder: false }, border: { display: false } }
        }
      }
    }));
  }
}

let accuracyChartInstance = null;
function initAccuracyChart() {
  // Destroy existing chart instance so it re-renders at correct size
  if (accuracyChartInstance) { accuracyChartInstance.destroy(); accuracyChartInstance = null; }

  var labels14 = ['04/02','04/03','04/04','04/05','04/06','04/07','04/08','04/09','04/10','04/11','04/12','04/13','04/14','04/15'];
  var commonOpts = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#020617', titleColor: '#F8FAFC', bodyColor: '#F8FAFC',
        titleFont: { family: 'Pretendard', size: 13, weight: '600' },
        bodyFont: { family: 'Pretendard', size: 12 },
        padding: 10, cornerRadius: 8, displayColors: true, boxPadding: 4
      }
    }
  };

  var ctx = document.getElementById('chart-accuracy');
  if (ctx) {
    accuracyChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels14,
        datasets: [
          {
            label: 'STT 정확도',
            data: [92.8,93.2,93.5,93.1,93.8,94.0,94.2,93.5,94.0,93.8,94.5,94.2,94.1,94.2],
            borderColor: '#DDD6FE', backgroundColor: 'rgba(221,214,254,.08)',
            borderWidth: 2, tension: .4, fill: true,
            pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#DDD6FE', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2
          },
          {
            label: '상담코드 추천 정확도',
            data: [84.5,85.0,85.8,86.0,86.2,86.5,86.8,86.0,86.5,87.0,87.2,87.8,87.5,87.6],
            borderColor: '#C4B5FD', backgroundColor: 'rgba(196,181,253,.08)',
            borderWidth: 2, tension: .4, fill: true, borderDash: [6,3],
            pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#C4B5FD', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2
          },
          {
            label: '내용 요약 정확도',
            data: [89.2,89.8,90.0,90.5,90.2,90.8,91.0,90.5,91.0,91.5,92.0,91.8,91.5,91.8],
            borderColor: '#A78BFA', backgroundColor: 'rgba(167,139,250,.08)',
            borderWidth: 2, tension: .4, fill: true, borderDash: [3,3],
            pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#A78BFA', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        ...commonOpts,
        plugins: { ...commonOpts.plugins, tooltip: { ...commonOpts.plugins.tooltip, callbacks: {
          label: function(ctx) { return ' ' + ctx.dataset.label + '  ' + ctx.parsed.y.toFixed(1) + '%'; }
        }}},
        scales: {
          x: { ticks: { font: tickFont, color: tickColor }, grid: { color: 'rgba(226,232,240,0.5)', drawBorder: false } },
          y: { min: 80, max: 100, title: { display: true, text: '%', font: { size: 11, family: 'Pretendard' }, color: tickColor }, ticks: { font: tickFont, color: tickColor, callback: function(v) { return v + '%'; }, stepSize: 5 }, grid: { color: 'rgba(226,232,240,0.5)', drawBorder: false }, border: { display: false } }
        }
      }
    });
  }
}

/* ===== Keyword Add Row ===== */
function showKwAddRow() {
  document.getElementById('kw-add-row').style.display = '';
}
function cancelKwRow() {
  document.getElementById('kw-add-row').style.display = 'none';
}
function saveKwRow() {
  alert('저장되었습니다.');
  cancelKwRow();
}

/* ===== Keyword Tab with description ===== */
const kwDescriptions = {
  'kw-hot': '등록된 단어를 더 잘 인식합니다',
  'kw-ner': 'NER 태그를 통해 포맷에 맞춰 내용이 변환됩니다'
};
const origToggleKwTab = toggleKwTab;
toggleKwTab = function(el, tabId) {
  origToggleKwTab(el, tabId);
  const desc = document.getElementById('kw-desc');
  if (desc && kwDescriptions[tabId]) desc.textContent = kwDescriptions[tabId];
};

/* ===== Header update time + call btn + breadcrumb ===== */
const origSwitchView = switchView;
switchView = function(view, btn) {
  origSwitchView(view, btn);
  var updateTime = document.getElementById('header-update-time');
  if (updateTime) updateTime.style.display = (view === 'home' || view === 'keywords' || view === 'codes') ? '' : 'none';

  var callBtn = document.getElementById('header-call-btn');
  if (callBtn) callBtn.className = (view === 'consult-detail' || view === 'ai-eval') ? 'header-call-btn show' : 'header-call-btn';

  var evalBtn = document.getElementById('header-eval-btn');
  if (evalBtn) evalBtn.style.display = (view === 'ai-eval') ? '' : 'none';

  var area = document.getElementById('breadcrumb-area');
  if (area) {
    if (view === 'consult-detail') {
      area.innerHTML = '<span class="breadcrumb-parent" onclick="switchView(\'consult\',document.querySelector(\'[data-view=consult]\'))">상담 이력 조회</span><span class="breadcrumb-sep">&rsaquo;</span><span class="breadcrumb-title" id="breadcrumb">상담 이력 상세</span>';
    } else if (view === 'ai-eval') {
      area.innerHTML = '<span class="breadcrumb-parent" onclick="switchView(\'ai-manage\',document.querySelector(\'[data-view=ai-manage]\'))">AI 정확도 관리</span><span class="breadcrumb-sep">&rsaquo;</span><span class="breadcrumb-title" id="breadcrumb">AI 정확도 평가</span>';
    } else if (view === 'notice-detail' || view === 'notice-write') {
      var label = view === 'notice-detail' ? '게시글' : '글 작성';
      area.innerHTML = '<span class="breadcrumb-parent" onclick="switchView(\'notice\',document.querySelector(\'[data-view=notice]\'))">공지사항</span><span class="breadcrumb-sep">&rsaquo;</span><span class="breadcrumb-title" id="breadcrumb">' + label + '</span>';
    } else {
      area.innerHTML = '<span class="breadcrumb-title" id="breadcrumb">' + (viewTitles[view] || '') + '</span>';
    }
  }
};

/* ===== Consult Search ===== */
function doConsultSearch() {
  document.getElementById('consult-empty').style.display = 'none';
  document.getElementById('consult-result').style.display = '';
}

function resetConsultSearch() {
  document.getElementById('consult-empty').style.display = '';
  document.getElementById('consult-result').style.display = 'none';
  // Reset all form fields in the search card
  var card = document.querySelector('#view-consult .search-card');
  if (card) {
    card.querySelectorAll('select').forEach(function(s) { s.selectedIndex = 0; });
    card.querySelectorAll('input[type="text"]').forEach(function(i) { i.value = ''; });
  }
}

/* ===== AI Manage Search ===== */
function doAiManageSearch() {
  document.getElementById('ai-manage-empty').style.display = 'none';
  document.getElementById('ai-manage-result').style.display = '';
}

function resetAiManageSearch() {
  document.getElementById('ai-manage-empty').style.display = '';
  document.getElementById('ai-manage-result').style.display = 'none';
  var card = document.querySelector('#view-ai-manage .search-card');
  if (card) {
    card.querySelectorAll('select').forEach(function(s) { s.selectedIndex = 0; });
    card.querySelectorAll('input[type="text"]').forEach(function(i) { i.value = ''; });
  }
}

/* ===== AI Eval Modal ===== */
function showEvalCompleteModal() {
  var modal = document.getElementById('eval-modal');
  if (modal) modal.style.display = 'flex';
}
function hideEvalCompleteModal() {
  var modal = document.getElementById('eval-modal');
  if (modal) modal.style.display = 'none';
}

/* ===== AI Eval: show STT cards on chat bubble click ===== */
document.addEventListener('click', function(e) {
  var bubble = e.target.closest('#view-ai-eval .detail-stt .chat-bubble');
  if (bubble) {
    var empty = document.getElementById('eval-stt-empty');
    var cards = document.getElementById('eval-stt-cards');
    if (empty) empty.style.display = 'none';
    if (cards) cards.style.display = '';
    // Update count
    var count = document.getElementById('eval-selected-count');
    if (count) {
      var n = parseInt(count.textContent) || 0;
      count.textContent = n + 1;
    }
  }
});

/* ===== Summary tab: toggle error fields ===== */
function toggleSummaryError(type, show) {
  var el = document.getElementById('summary-' + type + '-error');
  if (el) el.style.display = show ? '' : 'none';
}

/* ===== AI Eval Tab switching with badge ===== */
var evalTabStatus = { 'eval-stt': 'progress', 'eval-code': 'none', 'eval-summary': 'none' };

function switchEvalTab(el, tabId) {
  var card = el.closest('.card');
  // Toggle tab triggers
  card.querySelectorAll('.tab-trigger').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  // Toggle tab content
  card.querySelectorAll('.eval-tab-content').forEach(function(c) { c.classList.remove('active'); });
  var target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  // Set status to "평가중" if first time entering this tab (not yet completed)
  if (evalTabStatus[tabId] === 'none') {
    evalTabStatus[tabId] = 'progress';
  }

  // Update all badges
  card.querySelectorAll('.tab-trigger').forEach(function(t) {
    var tid = t.getAttribute('data-eval-tab');
    var badge = t.querySelector('.eval-tab-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'eval-tab-badge badge';
      badge.style.marginLeft = '4px';
      badge.style.fontSize = '11px';
      t.appendChild(badge);
    }
    var status = evalTabStatus[tid];
    if (status === 'done') {
      badge.textContent = '평가 완료';
      badge.className = 'eval-tab-badge badge badge-muted';
      badge.style.display = '';
    } else if (status === 'progress' && t.classList.contains('active')) {
      badge.textContent = '평가중';
      badge.className = 'eval-tab-badge badge badge-primary';
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  });
}

/* ===== Mark tab as complete ===== */
function completeEvalTab(tabId) {
  evalTabStatus[tabId] = 'done';
  // Re-render badges
  var activeTab = document.querySelector('.eval-tabs .tab-trigger.active');
  if (activeTab) switchEvalTab(activeTab, activeTab.getAttribute('data-eval-tab'));
}

/* ===== Notice Search ===== */
function doNoticeSearch() {
  var input = document.getElementById('notice-search-input');
  var keyword = (input && input.value || '').trim();
  var listArea = document.getElementById('notice-list-area');
  var emptyArea = document.getElementById('notice-empty');
  if (!keyword) {
    // Show all
    if (listArea) listArea.style.display = '';
    if (emptyArea) emptyArea.style.display = 'none';
    return;
  }
  // Simulate search — in real app this would filter
  // For demo, show empty state if keyword doesn't match
  var found = false;
  var rows = document.querySelectorAll('#notice-list-area tbody tr');
  rows.forEach(function(row) {
    var title = row.querySelector('.td-link');
    if (title && title.textContent.indexOf(keyword) !== -1) found = true;
  });
  if (found) {
    if (listArea) listArea.style.display = '';
    if (emptyArea) emptyArea.style.display = 'none';
  } else {
    if (listArea) listArea.style.display = 'none';
    if (emptyArea) emptyArea.style.display = 'flex';
  }
}

/* ===== Notice Write: Service checkbox logic ===== */
function handleNoticeServiceCheck(el, type) {
  var items = document.querySelectorAll('.notice-svc-item');
  if (type === 'all') {
    // "전체" selected — uncheck others
    if (el.checked) {
      items.forEach(function(cb) { cb.checked = false; cb.disabled = true; });
    } else {
      items.forEach(function(cb) { cb.disabled = false; });
    }
  } else {
    // Individual item — uncheck "전체"
    var allCb = el.closest('.form-field').querySelector('input[type="checkbox"]:first-of-type');
    if (allCb && allCb !== el) { /* handled by onchange on all */ }
  }
}

/* ===== Notice Write: Toggle pin/banner date fields ===== */
function toggleNoticePinDates() {
  var toggle = document.getElementById('notice-pin-toggle');
  var dates = document.getElementById('notice-pin-dates');
  if (dates) dates.style.display = toggle && toggle.checked ? 'flex' : 'none';
}
function toggleNoticeBannerDates() {
  var toggle = document.getElementById('notice-banner-toggle');
  var dates = document.getElementById('notice-banner-dates');
  if (dates) dates.style.display = toggle && toggle.checked ? 'flex' : 'none';
}

/* ===== Notice Write: Modals ===== */
function showNoticeLeaveModal() {
  var modal = document.getElementById('notice-leave-modal');
  if (modal) modal.style.display = 'flex';
}
function showNoticeTempSaveModal() {
  var modal = document.getElementById('notice-temp-save-modal');
  if (modal) modal.style.display = 'flex';
}
function showNoticePublishModal() {
  var modal = document.getElementById('notice-publish-modal');
  if (modal) modal.style.display = 'flex';
}
