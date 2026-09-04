/**
 * ==========================================
 * 資二丙班級資訊站 - 主要邏輯與 DOM 操作 (app.js)
 * ==========================================
 */

import {
  siteConfig,
  announcementsData,
  guidelinesData,
  rulesData,
  registrationsData,
  timetableData,
  eventsData,
  faqData
} from './config.js';

// Global state for timetable mode ('class' | 'teacher')
let currentTimetableMode = 'class';

// 使用瀏覽器本地日期，避免 UTC 在台灣凌晨造成跨日誤差
function getLocalDateStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function hasRegistrationDeadlinePassed(deadline, todayStr) {
  if (!deadline) return false;
  const deadlineStr = String(deadline).trim().replaceAll('/', '-');
  return Boolean(deadlineStr) && todayStr > deadlineStr;
}

function hasRegistrationEventEnded(deadline, eventEndDate, todayStr) {
  if (String(deadline || '').trim() || !eventEndDate) return false;
  const eventEndDateStr = String(eventEndDate).trim().replaceAll('/', '-');
  return Boolean(eventEndDateStr) && todayStr > eventEndDateStr;
}

function hasAnnouncementExpired(expireDate, todayStr) {
  if (!expireDate) return false;
  const expireDateStr = String(expireDate).trim().replaceAll('/', '-');
  return Boolean(expireDateStr) && todayStr > expireDateStr;
}

function addLocalCalendarDays(dateStr, days) {
  const normalizedDate = String(dateStr || '').trim().replaceAll('/', '-');
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalizedDate);
  if (!match) return '';

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year
    || date.getMonth() !== month - 1
    || date.getDate() !== day
  ) return '';

  date.setDate(date.getDate() + days);
  const resultYear = date.getFullYear();
  const resultMonth = String(date.getMonth() + 1).padStart(2, '0');
  const resultDay = String(date.getDate()).padStart(2, '0');
  return `${resultYear}-${resultMonth}-${resultDay}`;
}

function hasAnnouncementLifecycleExpired(announcement, todayStr) {
  if (String(announcement.expireDate || '').trim()) {
    return hasAnnouncementExpired(announcement.expireDate, todayStr);
  }
  if (String(announcement.eventEndDate || '').trim()) {
    return hasAnnouncementExpired(announcement.eventEndDate, todayStr);
  }

  const publishDate = announcement.publishDate || announcement.date;
  const lastVisibleDate = addLocalCalendarDays(publishDate, 6);
  return hasAnnouncementExpired(lastVisibleDate, todayStr);
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteInfo();
  initNavigation();
  initSearch();
  renderAnnouncements();
  renderGuidelines();
  renderRules();
  renderRegistrations();
  initTimetable();
  renderEvents();
  initExternalLinks();
  renderFAQ();
});

/**
 * 1. 初始化網站標題與通用的導師叮嚀
 */
function initSiteInfo() {
  document.getElementById('site-logo-icon').textContent = siteConfig.logoIcon || "🏫";
  document.getElementById('site-class-badge').textContent = siteConfig.classBadge || "資二丙班";
  document.getElementById('site-title-text').textContent = siteConfig.siteName;
  document.getElementById('site-subtitle-text').textContent = siteConfig.siteSubtitle;
  document.getElementById('home-teacher-notice').textContent = siteConfig.lineOfficialNotice;
  document.getElementById('footer-site-name').textContent = siteConfig.siteName;
}

/**
 * 2. 視圖切換與導覽路由 (SPA Navigation)
 */
function initNavigation() {
  const headerHomeContent = document.getElementById('header-home-content');
  const headerSubpageContent = document.getElementById('header-subpage-content');
  const subpageTitleText = document.getElementById('subpage-title-text');
  const btnBack = document.getElementById('btn-back');
  const clickableElements = document.querySelectorAll('.feature-card, .quick-btn');
  const allViews = document.querySelectorAll('.page-view');

  // Title map for subpages
  const viewTitles = {
    'view-announcements': '最新公告',
    'view-guidelines': '宣導事項',
    'view-rules': '重要規定',
    'view-registrations': '線上辦理',
    'view-timetable': '課表查詢',
    'view-events': '重要日程',
    'view-leave': '請假說明',
    'view-faq': '常見問題 FAQ'
  };

  // Switch to target view
  function switchView(targetViewId, pushState = true) {
    allViews.forEach(view => {
      if (view.id === targetViewId) {
        view.classList.remove('hidden');
        view.classList.add('view-active');
      } else {
        view.classList.add('hidden');
        view.classList.remove('view-active');
      }
    });

    if (targetViewId === 'view-home') {
      headerHomeContent.classList.remove('hidden');
      headerSubpageContent.classList.add('hidden');
      if (pushState) history.pushState({ view: 'view-home' }, '', '#');
    } else {
      headerHomeContent.classList.add('hidden');
      headerSubpageContent.classList.remove('hidden');
      subpageTitleText.textContent = viewTitles[targetViewId] || '詳細資訊';
      if (pushState) history.pushState({ view: targetViewId }, '', `#${targetViewId}`);
    }

    // Scroll main panel and window to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const appContainer = document.querySelector('.app-container');
    if (appContainer) appContainer.scrollTop = 0;
  }

  // Bind click handlers to feature cards & quick buttons
  clickableElements.forEach(elem => {
    elem.addEventListener('click', () => {
      const targetView = elem.getAttribute('data-target-view');
      if (targetView) switchView(targetView);
    });
  });

  // Back to Home Button Click
  btnBack.addEventListener('click', () => {
    switchView('view-home');
  });

  // Handle Browser Back / Forward Button
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view) {
      switchView(e.state.view, false);
    } else {
      const hash = window.location.hash.replace('#', '');
      if (hash && viewTitles[hash]) {
        switchView(hash, false);
      } else {
        switchView('view-home', false);
      }
    }
  });

  // Check initial URL hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && viewTitles[initialHash]) {
    switchView(initialHash, false);
  }
}

/**
 * 3. 渲染最新公告 (Accordion 手風琴式公告)
 */
function renderAnnouncements() {
  const container = document.getElementById('announcements-list');
  const historyContainer = document.getElementById('announcements-history-list');
  const historyToggle = document.getElementById('ann-history-toggle');
  if (!container || !historyContainer) return;

  container.innerHTML = '';
  historyContainer.innerHTML = '';

  const todayStr = getLocalDateStr();
  const currentAnnouncements = announcementsData.filter(
    ann => !hasAnnouncementLifecycleExpired(ann, todayStr)
  );

  // Determine default expanded announcement index:
  // 優先預設展開「最新的一則重要公告 (isImportant)」，若無則預設展開最新一則 (index 0)
  let defaultExpandedIndex = currentAnnouncements.findIndex(ann => ann.isImportant);
  if (defaultExpandedIndex === -1) defaultExpandedIndex = 0;

  currentAnnouncements.forEach((ann, index) => {
    const isDefaultExpanded = (index === defaultExpandedIndex);

    // 精簡 Tag 顯示邏輯：只保留具有行動意義的 Tag，避免同義資訊重複
    let tagsHtml = '';
    let hasActionTag = false;

    if (ann.isImportant) {
      tagsHtml += '<span class="tag-badge tag-important">🔴 重要</span>';
      hasActionTag = true;
    }
    if (ann.customTag) {
      tagsHtml += `<span class="tag-badge tag-category">${escapeHtml(ann.customTag)}</span>`;
      hasActionTag = true;
    }
    if (ann.requireSignature) {
      tagsHtml += '<span class="tag-badge tag-signature">✍️ 家長簽名</span>';
      hasActionTag = true;
    }
    if (ann.requirePayment) {
      tagsHtml += '<span class="tag-badge tag-payment">💳 繳費</span>';
      hasActionTag = true;
    }
    if (ann.requireRegistration) {
      tagsHtml += '<span class="tag-badge tag-payment" style="background-color: #0284c7;">📝 開放報名</span>';
      hasActionTag = true;
    }
    if (ann.deadlineDate) {
      tagsHtml += `<span class="tag-badge tag-deadline">📅 ${escapeHtml(ann.deadlineDate)} 前</span>`;
      hasActionTag = true;
    }
    if (!hasActionTag && ann.category) {
      tagsHtml += `<span class="tag-badge tag-category">${escapeHtml(ann.category)}</span>`;
    }

    // Format short date (e.g. 2026/09/01 -> 09/01)
    const displayDate = ann.date.length > 5 ? ann.date.substring(5) : ann.date;

    const card = document.createElement('article');
    card.className = `announcement-card ${ann.isImportant ? 'is-important' : ''} ${isDefaultExpanded ? 'is-expanded' : ''}`;

    const btnText = ann.btnLabel || "查看相關資料 / 連結 →";

    card.innerHTML = `
      <!-- 收合摘要列 (整張卡片皆可點擊) -->
      <div class="ann-summary-header" aria-expanded="${isDefaultExpanded}">
        <div class="ann-meta-row">
          <span class="ann-date">${escapeHtml(displayDate)}</span>
          <div class="ann-action-tags">${tagsHtml}</div>
        </div>
        <div class="ann-title-row">
          <h3 class="ann-title">${escapeHtml(ann.title)}</h3>
          <span class="ann-toggle-chevron">⌄</span>
        </div>
      </div>

      <!-- 展開詳細內容內頁 -->
      <div class="ann-expanded-body">
        <div class="ann-full-content">${escapeHtml(ann.content)}</div>

        ${ann.deadlineDate ? `
          <div class="ann-deadline-info">
            📅 截止日期：${escapeHtml(ann.deadlineDate)}
          </div>
        ` : ''}

        ${ann.externalUrl ? `
          <div class="ann-external-link">
            <a href="${ann.externalUrl}" target="_blank" rel="noopener noreferrer" class="btn-inline-link">
              <span>${escapeHtml(btnText)}</span>
            </a>
          </div>
        ` : ''}

        <div class="ann-collapse-footer">
          <button class="btn-collapse-ann" aria-label="收起公告">
            <span>⌃ 收起</span>
          </button>
        </div>
      </div>
    `;

    // 點擊摘要列：同一時間只展開一則公告
    const summaryHeader = card.querySelector('.ann-summary-header');
    summaryHeader.addEventListener('click', () => {
      const isCurrentlyExpanded = card.classList.contains('is-expanded');

      // 收起所有其他公告
      document.querySelectorAll('.announcement-card').forEach(c => {
        c.classList.remove('is-expanded');
        const header = c.querySelector('.ann-summary-header');
        if (header) header.setAttribute('aria-expanded', 'false');
      });

      // 切換當前公告狀態
      if (!isCurrentlyExpanded) {
        card.classList.add('is-expanded');
        summaryHeader.setAttribute('aria-expanded', 'true');
      }
    });

    // 點擊底部「⌃ 收起」按鈕
    const btnCollapse = card.querySelector('.btn-collapse-ann');
    if (btnCollapse) {
      btnCollapse.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('is-expanded');
        summaryHeader.setAttribute('aria-expanded', 'false');
      });
    }

    // 阻止外部連結點擊冒泡（避免誤觸 Accordion）
    const extLink = card.querySelector('.btn-inline-link');
    if (extLink) {
      extLink.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    container.appendChild(card);
  });

  announcementsData
    .filter(ann => hasAnnouncementLifecycleExpired(ann, todayStr))
    .forEach(ann => {
      const historyRow = document.createElement('div');
      historyRow.className = 'ann-history-row';
      const displayDate = ann.date.length > 5 ? ann.date.substring(5) : ann.date;

      historyRow.innerHTML = `
        <span class="ann-history-date">${escapeHtml(displayDate)}</span>
        <span class="ann-history-title">${escapeHtml(ann.title)}</span>
      `;
      historyContainer.appendChild(historyRow);
    });

  if (historyToggle && !historyToggle.dataset.bound) {
    historyToggle.addEventListener('click', () => {
      const isExpanded = historyToggle.getAttribute('aria-expanded') === 'true';
      historyToggle.setAttribute('aria-expanded', String(!isExpanded));
      historyContainer.hidden = isExpanded;

      const chevron = historyToggle.querySelector('.ann-history-chevron');
      if (chevron) chevron.textContent = isExpanded ? '⌄' : '⌃';
    });
    historyToggle.dataset.bound = 'true';
  }

}

/**
 * 4. 渲染宣導事項 (Guidelines)
 */
function renderGuidelines() {
  const container = document.getElementById('guidelines-container');
  if (!container) return;

  container.innerHTML = '';

  guidelinesData.forEach((guide, index) => {
    const card = document.createElement('div');
    card.className = 'guide-card';
    if (index === 0) card.classList.add('expanded'); // Default expand first

    const detailsList = guide.details.map(item => `<li>${escapeHtml(item)}</li>`).join('');

    card.innerHTML = `
      <div class="guide-card-header">
        <div class="guide-header-left">
          <span class="guide-icon">${guide.icon}</span>
          <div class="guide-title-box">
            <h3 class="guide-title">${escapeHtml(guide.title)}</h3>
            <span class="guide-summary">${escapeHtml(guide.summary)}</span>
          </div>
        </div>
        <div class="guide-toggle-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
      <div class="guide-card-body">
        <ul class="guide-detail-list">${detailsList}</ul>
      </div>
    `;

    card.querySelector('.guide-card-header').addEventListener('click', () => {
      card.classList.toggle('expanded');
    });

    container.appendChild(card);
  });
}

/**
 * 5. 渲染重要規定 (Rules)
 */
function renderRules() {
  const container = document.getElementById('rules-container');
  if (!container) return;

  container.innerHTML = '';

  rulesData.forEach(rule => {
    const card = document.createElement('a');
    card.className = 'rule-link-card';
    card.href = rule.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    card.innerHTML = `
      <span class="rule-link-icon" aria-hidden="true">${rule.icon}</span>
      <div class="rule-link-content">
        <h3 class="rule-link-title">${escapeHtml(rule.title)}</h3>
        ${rule.items ? `
          <ul class="rule-link-items">
            ${rule.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        ` : `<p class="rule-link-summary">${escapeHtml(rule.summary)}</p>`}
      </div>
      <span class="rule-link-action">
        查看正式規定 <span aria-hidden="true">→</span>
      </span>
    `;

    container.appendChild(card);
  });
}

/**
 * 6. 渲染報名專區 (Registrations)
 */
function renderRegistrations() {
  const containerUrgent = document.getElementById('reg-list-urgent');
  const containerOpen = document.getElementById('reg-list-open');
  const containerClosed = document.getElementById('reg-list-closed');
  const historyToggle = document.getElementById('reg-history-toggle');

  if (!containerUrgent || !containerOpen || !containerClosed) return;

  containerUrgent.innerHTML = '';
  containerOpen.innerHTML = '';
  containerClosed.innerHTML = '';

  const todayStr = getLocalDateStr();

  registrationsData.forEach(reg => {
    const isHistory = reg.status === 'closed'
      || hasRegistrationDeadlinePassed(reg.deadline, todayStr)
      || hasRegistrationEventEnded(reg.deadline, reg.eventEndDate, todayStr);

    if (isHistory) {
      const historyRow = document.createElement('div');
      historyRow.className = 'reg-history-row';
      const compactPeriod = reg.period
        .replace(/\d{4}\//g, '')
        .replace(/\s*～\s*/g, '–');

      historyRow.innerHTML = `
        <span class="reg-history-date">${escapeHtml(compactPeriod)}</span>
        <span class="reg-history-title">${escapeHtml(reg.title)}</span>
      `;
      containerClosed.appendChild(historyRow);
      return;
    }

    const card = document.createElement('div');
    card.className = `reg-card status-${reg.status}`;

    let statusText = '開放報名中';
    if (reg.status === 'urgent') statusText = '🔥 即將截止';
    if (reg.status === 'closed') statusText = '已截止';

    const btnText = reg.btnLabel || "前往報名 →";

    card.innerHTML = `
      <div class="reg-card-header">
        <span class="reg-category-pill">${escapeHtml(reg.category)}</span>
        <span class="reg-status-badge">${statusText}</span>
      </div>
      <h4 class="reg-card-title">${escapeHtml(reg.title)}</h4>
      <div class="reg-meta-row">
        <span>🗓️ 報名/活動期間：${escapeHtml(reg.period)}</span>
        <span>🎯 對象：${escapeHtml(reg.target)}</span>
      </div>
      <p class="reg-summary">${escapeHtml(reg.summary)}</p>
      ${reg.url && reg.status !== 'closed' ? `
        <div class="reg-action-link">
          <a href="${reg.url}" target="_blank" rel="noopener noreferrer" class="btn-reg-apply">
            <span>${escapeHtml(btnText)}</span>
          </a>
        </div>
      ` : ''}
    `;

    if (reg.status === 'urgent') {
      containerUrgent.appendChild(card);
    } else if (reg.status === 'open') {
      containerOpen.appendChild(card);
    } else {
      containerClosed.appendChild(card);
    }
  });

  // Empty state handling
  if (containerUrgent.children.length === 0) {
    containerUrgent.innerHTML = '<p class="action-hint">目前無即將截止項目</p>';
  }

  if (historyToggle && !historyToggle.dataset.bound) {
    historyToggle.addEventListener('click', () => {
      const isExpanded = historyToggle.getAttribute('aria-expanded') === 'true';
      historyToggle.setAttribute('aria-expanded', String(!isExpanded));
      containerClosed.hidden = isExpanded;

      const chevron = historyToggle.querySelector('.reg-history-chevron');
      if (chevron) chevron.textContent = isExpanded ? '⌄' : '⌃';
    });
    historyToggle.dataset.bound = 'true';
  }
}

/**
 * 7. 渲染雙模式課表 (Timetable: Class vs Teacher Schedule)
 */
function initTimetable() {
  const btnModeClass = document.getElementById('btn-mode-class');
  const btnModeTeacher = document.getElementById('btn-mode-teacher');
  const modeDescBox = document.getElementById('mode-desc-box');
  const tabsBar = document.getElementById('day-tabs-bar');
  const dayTitle = document.getElementById('current-day-title');
  const todayIndicator = document.getElementById('today-indicator');
  const lessonsList = document.getElementById('timetable-lessons-list');

  if (!tabsBar || !lessonsList) return;

  const realDay = new Date().getDay();
  let currentDay = (realDay >= 1 && realDay <= 5) ? realDay : 1;

  function renderSchedule(day, mode) {
    currentTimetableMode = mode;

    // Mode button toggles
    if (mode === 'class') {
      btnModeClass.classList.add('active');
      btnModeTeacher.classList.remove('active');
      modeDescBox.innerHTML = '<span>資二丙每週課表（點選星期切換）</span>';
    } else {
      btnModeClass.classList.remove('active');
      btnModeTeacher.classList.add('active');
      modeDescBox.innerHTML = '<span>導師每週授課課表（點選星期切換）</span>';
    }

    // Active day tab toggle
    document.querySelectorAll('.day-tab').forEach(tab => {
      const tabDay = parseInt(tab.getAttribute('data-day'), 10);
      tab.classList.toggle('active', tabDay === day);
    });

    // Header info
    const dayNames = { 1: "星期一", 2: "星期二", 3: "星期三", 4: "星期四", 5: "星期五" };
    dayTitle.textContent = `${dayNames[day]} ${mode === 'class' ? '資二丙課表' : '導師課表'}`;
    todayIndicator.style.display = (day === realDay) ? 'inline-block' : 'none';

    lessonsList.innerHTML = '';
    const periodsInfo = timetableData.periodsInfo;

    if (mode === 'class') {
      // 1. 資二丙班級課表
      const dayData = timetableData.classSchedule[day];
      if (!dayData) return;

      periodsInfo.forEach(periodObj => {
        if (periodObj.period === 'lunch') {
          const breakCard = document.createElement('div');
          breakCard.className = 'lesson-card break-card';
          breakCard.innerHTML = `<span class="break-text">${periodObj.label}</span>`;
          lessonsList.appendChild(breakCard);
        } else {
          const lesson = dayData.lessons.find(l => l.period === periodObj.period);
          if (lesson && lesson.subject) {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            const teacherHtml = lesson.teacher ? `<span class="teacher-name">${escapeHtml(lesson.teacher)}</span>` : '';
            const roomHtml = lesson.room ? `<span class="room-name">${escapeHtml(lesson.room)}</span>` : '';
            card.innerHTML = `
              <div class="lesson-left">
                <div class="period-badge">${lesson.period}</div>
                <div class="lesson-info">
                  <span class="subject-name">${escapeHtml(lesson.subject)}</span>
                </div>
              </div>
              <div class="lesson-right">
                ${teacherHtml}
                ${roomHtml}
              </div>
            `;
            lessonsList.appendChild(card);
          }
        }
      });
    } else {
      // 2. 導師課表（固定顯示第 1～7 節；未授課節次保留空白）
      const dayData = timetableData.teacherSchedule[day];
      if (!dayData) return;

      periodsInfo
        .filter(periodObj => typeof periodObj.period === 'number' && periodObj.period <= 7)
        .forEach(periodObj => {
          const lesson = dayData.lessons.find(l => l.period === periodObj.period);
          const card = document.createElement('div');
          card.className = lesson ? 'lesson-card teacher-lesson-card' : 'lesson-card teacher-lesson-card teacher-empty';

          if (lesson) {
            const targetClassHtml = lesson.targetClass
              ? `<span class="teacher-target-class">${escapeHtml(lesson.targetClass)}</span>`
              : '';
            const timeHtml = `<span class="teacher-time-range">${periodObj.time}</span>`;
            card.innerHTML = `
              <div class="lesson-left">
                <div class="period-badge teacher-badge">${lesson.period}</div>
                <div class="lesson-info">
                  <span class="subject-name">${escapeHtml(lesson.subject)}</span>
                  ${targetClassHtml}
                </div>
              </div>
              <div class="lesson-right">
                ${timeHtml}
              </div>
            `;
          } else {
            card.innerHTML = `
              <div class="lesson-left">
                <div class="period-badge teacher-badge">${periodObj.period}</div>
                <div class="lesson-info">
                  <span class="teacher-empty-text">空堂</span>
                </div>
              </div>
              <div class="lesson-right">
                <span class="teacher-time-range">${periodObj.time}</span>
              </div>
            `;
          }

          lessonsList.appendChild(card);
        });
    }
  }

  // Mode Switch Event Listeners
  btnModeClass.addEventListener('click', () => {
    const activeTab = document.querySelector('.day-tab.active');
    const day = activeTab ? parseInt(activeTab.getAttribute('data-day'), 10) : currentDay;
    renderSchedule(day, 'class');
  });

  btnModeTeacher.addEventListener('click', () => {
    const activeTab = document.querySelector('.day-tab.active');
    const day = activeTab ? parseInt(activeTab.getAttribute('data-day'), 10) : currentDay;
    renderSchedule(day, 'teacher');
  });

  // Day Tab Click Handlers
  tabsBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.day-tab');
    if (btn) {
      const selectedDay = parseInt(btn.getAttribute('data-day'), 10);
      renderSchedule(selectedDay, currentTimetableMode);
    }
  });

  // Initial render
  renderSchedule(currentDay, 'class');
}

/**
 * 8. 渲染重要日程 (Events - Monthly Accordion / Filtered Flat List)
 *    - 全部：保留 Compact Event UI，依 YYYY-MM 分組
 *    - 分類 Filter：依日期直接顯示 Compact Event UI
 *    - 使用本地日期 (local date) 避免 UTC 跨日誤差
 *    - 支援 4 大分類篩選：exam / homework / club / assessment
 */
function renderEvents() {
  const nextTitle = document.getElementById('next-event-title');
  const nextDate  = document.getElementById('next-event-date');
  const nextNote  = document.getElementById('next-event-note');
  const monthGroupsContainer = document.getElementById('events-month-groups');
  const filterBar  = document.getElementById('events-filter-bar');
  const btnCalendar = document.getElementById('btn-school-calendar');

  if (btnCalendar && siteConfig.schoolCalendarUrl) {
    btnCalendar.setAttribute('href', siteConfig.schoolCalendarUrl);
  }

  const timeline = eventsData.timeline || [];
  const assessmentSubtypeTags = {
    registration: { icon: '📋', label: '報名' },
    test: { icon: '🏅', label: '測驗' },
    certification: { icon: '🏅', label: '檢定' },
    recognition: { icon: '🏅', label: '認證' }
  };

  // 1. 使用瀏覽器本地日期（local date），避免 UTC 跨日誤差
  //    格式：YYYY-MM-DD，與 startDate 欄位格式一致
  const todayStr = getLocalDateStr();

  // 2. 動態計算「🎯 下一個重要日程」
  //    優先：isImportant + 未到期的段考/作業抽查
  //    次要：任何未到期的日程
  //    Fallback：時間軸最後一筆
  let nextEventObj = timeline.find(e => e.startDate >= todayStr && e.isImportant);
  if (!nextEventObj) nextEventObj = timeline.find(e => e.startDate >= todayStr);
  if (!nextEventObj && timeline.length > 0) nextEventObj = timeline[timeline.length - 1];

  if (nextEventObj) {
    const catInfo = eventsData.categories[nextEventObj.category] || { label: '日程', icon: '🗓️' };
    if (nextTitle) nextTitle.textContent = nextEventObj.title;
    if (nextDate)  nextDate.textContent  = `📅 ${nextEventObj.dateDisplay || nextEventObj.startDate}`;
    if (nextNote)  nextNote.textContent  = nextEventObj.description || `類別：${catInfo.label}`;
  }

  if (!monthGroupsContainer) return;

  // 3. 輔助函式：依 category 產生對應 Level 的 Compact HTML
  function createEventItemHtml(evt) {
    const catInfo = eventsData.categories[evt.category] || { label: '日程', icon: '🗓️' };
    const tagInfo = evt.category === 'assessment' && assessmentSubtypeTags[evt.subtype]
      ? assessmentSubtypeTags[evt.subtype]
      : catInfo;

    if (evt.category === 'exam' || evt.category === 'homework' || evt.category === 'assessment') {
      // Level A｜重大日程：段考 / 作業抽查 / 測驗與檢定 → Compact Card
      const catClass = `cat-${evt.category}`;
      return `
        <div class="event-item-level-a ${catClass}">
          <div class="item-level-a-top">
            <span class="item-level-a-date">📅 ${escapeHtml(evt.dateDisplay)}</span>
            <span class="tag-badge-sm tag-cat-${evt.category}">${tagInfo.icon} ${escapeHtml(tagInfo.label)}</span>
          </div>
          <h4 class="item-level-a-title">${escapeHtml(evt.title)}</h4>
        </div>
      `;
    } else {
      // Level C｜例行日程：社團活動 → 單行精簡 Row
      return `
        <div class="event-item-level-c">
          <span class="item-level-c-text">
            <span>📅 ${escapeHtml(evt.dateDisplay)}</span>
            <span class="tag-badge-sm tag-cat-club">👥 社團</span>
            <span>${escapeHtml(evt.description || evt.title)}</span>
          </span>
        </div>
      `;
    }
  }

  // 4. 渲染函式：同日事件合併 (UI 層合併，不修改底層資料)
  function renderTimelineHtml(eventsList) {
    if (eventsList.length === 0) {
      return '<p class="action-hint" style="text-align:center; padding: 1rem;">此分類目前尚無日程資料</p>';
    }

    // 依 startDate 分組（同日多事件 → 合一個 day-group-box）
    const dayGroups = {};
    const dayOrder = [];
    eventsList.forEach(evt => {
      if (!dayGroups[evt.startDate]) {
        dayGroups[evt.startDate] = [];
        dayOrder.push(evt.startDate);
      }
      dayGroups[evt.startDate].push(evt);
    });

    let html = '';
    dayOrder.forEach(dateKey => {
      const group = dayGroups[dateKey];
      if (group.length === 1) {
        html += createEventItemHtml(group[0]);
      } else {
        const dateHeader = group[0].dateDisplay;
        const itemsHtml  = group.map(e => createEventItemHtml(e)).join('');
        html += `
          <div class="day-group-box">
            <div class="day-group-date-header">📅 ${escapeHtml(dateHeader)}</div>
            <div class="day-group-items">${itemsHtml}</div>
          </div>
        `;
      }
    });

    return html;
  }

  // 5. 找出目前清單預設展開的月份：第一筆尚未結束的事件，否則最後一個月份
  function getDefaultExpandedMonth(eventsList) {
    if (eventsList.length === 0) return '';

    const currentOrFutureEvent = eventsList.find(evt =>
      (evt.endDate || evt.startDate) >= todayStr
    );
    const fallbackEvent = eventsList[eventsList.length - 1];
    return (currentOrFutureEvent || fallbackEvent).startDate.slice(0, 7);
  }

  // 6. 核心渲染函式（全部依 YYYY-MM 分組；分類 Filter 使用 Flat List）
  function renderEventsView(categoryFilter) {
    // 更新 Filter Chips Active 狀態
    if (filterBar) {
      filterBar.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.getAttribute('data-category') === categoryFilter);
      });
    }

    const filteredTimeline = timeline
      .filter(evt => categoryFilter === 'all' ? true : evt.category === categoryFilter)
      .slice()
      .sort((a, b) => a.startDate.localeCompare(b.startDate));

    if (filteredTimeline.length === 0) {
      monthGroupsContainer.innerHTML = '<p class="action-hint events-empty-state">此分類目前尚無日程資料</p>';
      return;
    }

    if (categoryFilter !== 'all') {
      monthGroupsContainer.innerHTML = renderTimelineHtml(filteredTimeline);
      return;
    }

    const monthGroups = {};
    filteredTimeline.forEach(evt => {
      const monthKey = evt.startDate.slice(0, 7);
      if (!monthGroups[monthKey]) monthGroups[monthKey] = [];
      monthGroups[monthKey].push(evt);
    });

    const sortedMonthKeys = Object.keys(monthGroups).sort((a, b) => a.localeCompare(b));
    const defaultExpandedMonth = getDefaultExpandedMonth(filteredTimeline);

    monthGroupsContainer.innerHTML = sortedMonthKeys.map(monthKey => {
      const monthEvents = monthGroups[monthKey];
      const monthNumber = Number(monthKey.slice(5, 7));
      const isExpanded = monthKey === defaultExpandedMonth;
      const panelId = `events-month-panel-${monthKey}`;

      return `
        <section class="event-month-group" data-month-key="${monthKey}">
          <button
            type="button"
            class="event-month-header"
            aria-expanded="${isExpanded}"
            aria-controls="${panelId}"
          >
            <span class="event-month-heading">
              <span>📅 ${monthNumber} 月</span>
              <span class="event-month-count">${monthEvents.length} 項日程</span>
            </span>
            <span class="event-month-chevron" aria-hidden="true">${isExpanded ? '⌃' : '⌄'}</span>
          </button>
          <div id="${panelId}" class="event-month-panel" ${isExpanded ? '' : 'hidden'}>
            ${renderTimelineHtml(monthEvents)}
          </div>
        </section>
      `;
    }).join('');
  }

  // 7. 綁定 Filter Chips（防止重複綁定）
  if (filterBar && !filterBar.dataset.bound) {
    filterBar.addEventListener('click', e => {
      const chip = e.target.closest('.filter-chip');
      if (chip) renderEventsView(chip.getAttribute('data-category'));
    });
    filterBar.dataset.bound = 'true';
  }

  // 8. 綁定月份 Accordion（整個 Header 可點擊）
  if (!monthGroupsContainer.dataset.bound) {
    monthGroupsContainer.addEventListener('click', e => {
      const header = e.target.closest('.event-month-header');
      if (!header) return;

      const panelId = header.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (!panel) return;

      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;

      const chevron = header.querySelector('.event-month-chevron');
      if (chevron) chevron.textContent = isExpanded ? '⌄' : '⌃';
    });
    monthGroupsContainer.dataset.bound = 'true';
  }

  // 初始渲染「全部」
  renderEventsView('all');
}

/**
 * 9. 設定外部連結 (請假網址)
 */
function initExternalLinks() {
  const btnLeave = document.getElementById('btn-go-leave');
  if (btnLeave) btnLeave.setAttribute('href', siteConfig.leaveUrl);
}

/**
 * 10. 渲染 FAQ 手風琴 (Accordion)
 */
function renderFAQ() {
  const container = document.getElementById('faq-accordion-container');
  if (!container) return;

  container.innerHTML = '';

  faqData.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    if (index === 0) item.classList.add('active');

    item.innerHTML = `
      <button class="faq-question-btn" aria-expanded="${index === 0}">
        <span>${escapeHtml(faq.question)}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="faq-answer-panel">
        <p>${escapeHtml(faq.answer)}</p>
      </div>
    `;

    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    container.appendChild(item);
  });
}

/**
 * Utility: HTML Escape for XSS protection
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Utility: Highlight search term in text
 */
function highlightText(text, term) {
  if (!term || !text) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(regex, '<span class="search-highlight">$1</span>');
}

/**
 * 11. 全站搜尋功能
 */
function initSearch() {
  const searchInput = document.getElementById('global-search');
  const clearBtn = document.getElementById('btn-search-clear');
  const clearSearchBtn = document.getElementById('btn-clear-search');
  const searchResults = document.getElementById('search-results');
  const searchResultsList = document.getElementById('search-results-list');
  const searchResultsCount = document.getElementById('search-results-count');

  if (!searchInput) return;

  let searchTimeout;

  function performSearch(query) {
    if (!query || query.length < 2) {
      searchResults.classList.add('hidden');
      return;
    }

    const results = [];
    const q = query.toLowerCase();

    // Search announcements
    announcementsData.forEach(ann => {
      const text = `${ann.title} ${ann.content} ${ann.category}`.toLowerCase();
      if (text.includes(q)) {
        results.push({
          type: '公告',
          title: ann.title,
          excerpt: ann.content.substring(0, 80) + '...',
          viewId: 'view-announcements',
          data: ann
        });
      }
    });

    // Search guidelines
    guidelinesData.forEach(g => {
      const text = `${g.title} ${g.summary} ${g.details.join(' ')}`.toLowerCase();
      if (text.includes(q)) {
        results.push({
          type: '宣導',
          title: g.title,
          excerpt: g.summary,
          viewId: 'view-guidelines',
          data: g
        });
      }
    });

    // Search rules
    rulesData.forEach(r => {
      const text = `${r.title} ${r.summary || ''}`.toLowerCase();
      if (text.includes(q)) {
        results.push({
          type: '規定',
          title: r.title,
          excerpt: r.summary,
          viewId: 'view-rules',
          data: r
        });
      }
    });

    // Search events
    eventsData.timeline.forEach(e => {
      const text = `${e.title} ${e.description}`.toLowerCase();
      if (text.includes(q)) {
        results.push({
          type: '日程',
          title: e.title,
          excerpt: `${e.dateDisplay} - ${e.description}`,
          viewId: 'view-events',
          data: e
        });
      }
    });

    // Search FAQ
    faqData.forEach(f => {
      const text = `${f.question} ${f.answer}`.toLowerCase();
      if (text.includes(q)) {
        results.push({
          type: 'FAQ',
          title: f.question,
          excerpt: f.answer,
          viewId: 'view-faq',
          data: f
        });
      }
    });

    // Search registrations
    registrationsData.forEach(r => {
      const text = `${r.title} ${r.category} ${r.summary}`.toLowerCase();
      if (text.includes(q)) {
        results.push({
          type: '報名',
          title: r.title,
          excerpt: r.summary.substring(0, 80) + '...',
          viewId: 'view-registrations',
          data: r
        });
      }
    });

    // Render results
    searchResultsCount.textContent = `找到 ${results.length} 筆結果`;

    if (results.length === 0) {
      searchResultsList.innerHTML = '<p class="action-hint" style="text-align:center;padding:1rem;">找不到符合的內容</p>';
    } else {
      searchResultsList.innerHTML = results.slice(0, 20).map(r => `
        <div class="search-result-item" data-view="${r.viewId}">
          <div class="search-result-category">${r.type}</div>
          <div class="search-result-title">${highlightText(r.title, query)}</div>
          <div class="search-result-excerpt">${highlightText(r.excerpt, query)}</div>
        </div>
      `).join('');

      // Bind click handlers
      searchResultsList.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const viewId = item.getAttribute('data-view');
          // Switch to home first, then to target view
          const headerHomeContent = document.getElementById('header-home-content');
          const headerSubpageContent = document.getElementById('header-subpage-content');
          const subpageTitleText = document.getElementById('subpage-title-text');
          const allViews = document.querySelectorAll('.page-view');
          const viewTitles = {
            'view-announcements': '最新公告',
            'view-guidelines': '宣導事項',
            'view-rules': '重要規定',
            'view-registrations': '線上辦理',
            'view-timetable': '課表查詢',
            'view-events': '重要日程',
            'view-leave': '請假說明',
            'view-faq': '常見問題 FAQ'
          };

          allViews.forEach(view => {
            if (view.id === viewId) {
              view.classList.remove('hidden');
              view.classList.add('view-active');
            } else {
              view.classList.add('hidden');
              view.classList.remove('view-active');
            }
          });

          headerHomeContent.classList.add('hidden');
          headerSubpageContent.classList.remove('hidden');
          subpageTitleText.textContent = viewTitles[viewId] || '詳細資訊';
          history.pushState({ view: viewId }, '', `#${viewId}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }

    searchResults.classList.remove('hidden');
  }

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const val = e.target.value.trim();
    clearBtn.classList.toggle('hidden', !val);
    searchTimeout = setTimeout(() => performSearch(val), 300);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    searchResults.classList.add('hidden');
    searchInput.focus();
  });

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.add('hidden');
      searchResults.classList.add('hidden');
    });
  }
}

/**
 * 12. MICRO-INTERACTIONS & TRANSITION EFFECTS
 * (Ripple, Scroll Reveal, Stagger, Back to Top, Toast, Icon Bounce,
 *  Card Hover, Badge Pulse, FAQ Accordion, Tab Switcher, Title Shimmer
 *  → moved to animations.js using Anime.js v4 + Motion)
 */

// --- View Transition Enhancement ---
function initViewTransitions() {
  const views = document.querySelectorAll('.page-view');
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.classList.contains('view-active')) {
          target.style.animation = 'none';
          target.offsetHeight;
          target.style.animation = 'page-fade-in 0.35s ease-out';
        }
      }
    });
  });

  views.forEach(view => {
    observer.observe(view, { attributes: true, attributeFilter: ['class'] });
  });
}

// --- Accordion Smooth Height for Guide Cards ---
function initGuideAccordionSmooth() {
  document.querySelectorAll('.guide-card').forEach(card => {
    const body = card.querySelector('.guide-card-body');
    if (!body) return;
    body.style.transition = 'max-height 0.35s ease, opacity 0.3s ease, padding 0.3s ease';
    body.style.overflow = 'hidden';

    const updateHeight = () => {
      if (card.classList.contains('expanded')) {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.opacity = '1';
      } else {
        body.style.maxHeight = '0';
        body.style.opacity = '0';
      }
    };

    updateHeight();
    const header = card.querySelector('.guide-card-header');
    if (header) {
      header.addEventListener('click', () => {
        requestAnimationFrame(updateHeight);
      });
    }
  });
}

// --- Month Panel Smooth Transition ---
function initMonthPanelTransition() {
  const container = document.getElementById('events-month-groups');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const header = e.target.closest('.event-month-header');
    if (!header) return;
    const panelId = header.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (!panel) return;

    if (!panel.hidden) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      requestAnimationFrame(() => {
        panel.style.transition = 'max-height 0.35s ease, opacity 0.3s ease';
        panel.style.maxHeight = '0';
        panel.style.opacity = '0';
        setTimeout(() => {
          panel.hidden = true;
          panel.style.maxHeight = '';
          panel.style.opacity = '';
          panel.style.transition = '';
        }, 350);
      });
    } else {
      panel.hidden = false;
      panel.style.maxHeight = '0';
      panel.style.opacity = '0';
      requestAnimationFrame(() => {
        panel.style.transition = 'max-height 0.35s ease, opacity 0.3s ease';
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.style.opacity = '1';
        setTimeout(() => {
          panel.style.maxHeight = '';
          panel.style.opacity = '';
          panel.style.transition = '';
        }, 350);
      });
    }
  });
}

// --- Initialize App-Specific Transitions ---
document.addEventListener('DOMContentLoaded', () => {
  initViewTransitions();
  initGuideAccordionSmooth();
  initMonthPanelTransition();
});
