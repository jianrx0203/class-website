/**
 * ==========================================
 * 資二丙班級資訊站 - 中央設定與資料檔 (config.js)
 * ==========================================
 * 說明：
 * 所有頁面顯示文字、公告、規定、報名、課表、日程與外部連結皆在此統一管理。
 */

export const siteConfig = {
  // 網站基本標題與標籤
  siteName: "資二丙班級資訊站",
  siteSubtitle: "班級公告、學習與生活資訊",
  classBadge: "資二丙班",
  logoIcon: "🏫",

  // 外部系統連結設定（線上請假入口 V1 尚未開放）
  leaveUrl: "",
  schoolCalendarUrl: "https://www.ymsh.hcc.edu.tw/ischool/rfile/41a4a72b41dc498a3c74d5eb8d8784c6", // 學校官方行事曆 PDF/網頁網址

  // 班級聯絡資訊
  lineOfficialNotice: "如有緊急事項，請透過班級 LINE 官方帳號與導師聯繫。"
};

/**
 * ==========================================
 * 共用活動 / 報名核心資料庫 (Shared Activities)
 * ==========================================
 * 供「最新公告」與「報名專區」共用引用，避免重複維護
 */
export const sharedActivities = {
  scienceVolunteer2026: {
    id: "act-science-volunteer-2026",
    title: "2026 新竹縣科普博覽會青年志工招募",
    category: "志工服務",
    eventDate: "2026/10/17（六）～ 10/18（日）",
    location: "新竹縣體育館",
    target: "全校同學（對志工服務有興趣者）",
    url: "https://www.surveycake.com/s/VAP3M",
    status: "open", // ✅ 開放報名中（不自行設定即將截止）
    announcementContent: `有興趣參加志工服務的同學，可以參考以下活動：

🚀 活動：2026 新竹縣科普博覽會
📅 日期：10/17（六）～10/18（日）
📍 地點：新竹縣體育館

🙋 服務內容：
擔任闖關遊戲關主，協助遊戲解說、帶領民眾闖關及蓋章。

⏰ 服務時段：
• 10:00–12:00
• 12:00–14:00
• 14:00–17:00

🎁 志工服務時數：
全程參與可取得「志工服務時數證明」。

有興趣的同學請自行閱讀活動及報名相關規定，確認符合資格後再報名。`,
    registrationSummary: `📅 活動日期：2026/10/17（六）～ 10/18（日）
📍 地點：新竹縣體育館
🙋 服務內容：擔任闖關遊戲關主，協助遊戲解說、帶領民眾闖關及蓋章。
⏰ 服務時段：10:00–12:00 / 12:00–14:00 / 14:00–17:00
🎁 全程參與可取得「志工服務時數證明」。`
  }
};

/**
 * 1. 最新公告資料庫 (Announcements)
 * 依日期由新到舊排序 (Newest First)
 */
export const announcementsData = [
  {
    id: "ann-008",
    date: "2026/08/31",
    category: "重要提醒",
    title: "8/31 開學日重要時程提醒",
    content: `8/31 開學，當日重要時程如下：

• 08:10–08:30 ｜ 開學典禮
• 領取學期成績單
• 10:10 ｜ 正式上課
• 16:00 ｜ 放學

請同學留意當日各項時程，並依學校規定準時到校及上課。`,
    isImportant: true,
    customTag: "📅 8/31 開學",
    requireSignature: false,
    requirePayment: false,
    deadlineDate: "",
    externalUrl: ""
  },
  {
    id: "ann-007",
    date: "2026/08/25",
    category: "活動報名",
    title: sharedActivities.scienceVolunteer2026.title,
    content: sharedActivities.scienceVolunteer2026.announcementContent,
    eventEndDate: "2026-10-18",
    isImportant: false,
    customTag: "🙋 志工招募",
    requireRegistration: true,
    requireSignature: false,
    requirePayment: false,
    deadlineDate: "",
    externalUrl: sharedActivities.scienceVolunteer2026.url,
    btnLabel: "👉 前往報名"
  },
  {
    id: "ann-003",
    date: "2026/08/25",
    category: "網站公告",
    title: "新學期資二丙班級資訊站正式上線",
    content: `歡迎家長與同學使用資二丙班級資訊站！

本站提供簡單、快速的班級最新公告、宣導事項、重要規定、報名專區與課表日程查詢。

【LINE 使用小提醒】
若從 LINE 官方帳號點擊連結後無法正常開啟，請點選右下角「⋯」，再選擇「以預設瀏覽器開啟」。`,
    isImportant: false,
    requireSignature: false,
    requirePayment: false,
    deadlineDate: "",
    externalUrl: ""
  }
];

/**
 * 2. 宣導事項資料庫 (Guidelines)
 */
export const guidelinesData = [
  {
    id: "guide-1",
    title: "校園安全",
    icon: "🛡️",
    summary: "落實課間安全規範，遇緊急情況立即通知導師或校警室。",
    details: [
      "校園內請勿奔跑追逐，上下樓梯請靠右行走並握緊扶手。",
      "發現校園設施破損或異常人員進入，請立即回報總務處或導師。",
      "遵守各專科教室（實驗室、電腦教室）安全衛生管理守則。"
    ]
  },
  {
    id: "guide-2",
    title: "交通安全與校車規範",
    icon: "🚦",
    summary: "搭乘校車、公車、家長接送或步行通學之安全守則。",
    details: [
      "家長汽機車接送請於指定接送區停靠，騎乘機車學生與家長皆須佩戴安全帽。",
      "搭乘校車同學請依序排隊上車，車輛行駛中請全程繫妥安全帶並禁止嬉戲。",
      "步行過馬路請走斑馬線，遵循交通號誌，切勿邊走邊看手機。"
    ]
  },
  {
    id: "guide-3",
    title: "網路安全與資安防護",
    icon: "🌐",
    summary: "保護個人數位隱私，建立良好網路社交禮儀與帳號安全。",
    details: [
      "切勿在網路或社群平台公開個人身分證字號、地址及密碼等敏感資料。",
      "尊重他人智慧財產權與個人隱私，未經同意不得散布他人照片或影片。",
      "合理控制每日使用手機與 3C 產品時間，避免影響視力與日常作息。"
    ]
  },
  {
    id: "guide-4",
    title: "反詐騙專區",
    icon: "⚠️",
    summary: "提高警覺！不輕信不明訊息，謹記防詐騙三步驟：聽、掛、查證。",
    details: [
      "如接到自稱學校老師、檢警或網購客服電話要求匯款，100% 是詐騙。",
      "請勿點擊不明簡訊中的微縮網址或 LINE 私訊抽獎連結。",
      "遇疑似詐騙情形，請立即撥打 165 反詐騙專線或與導師聯繫。"
    ]
  },
  {
    id: "guide-5",
    title: "健康教育與衛生防護",
    icon: "🩺",
    summary: "預防傳染病、落實個人衛生習慣與規律作息。",
    details: [
      "勤洗手、注意個人呼吸道衛生，生病請佩戴口罩並落實在家休息。",
      "每日補充充足水分，少喝含糖飲料，養成規律作息與適度運動。",
      "落實資源回收與垃圾分類（環保愛地球）。"
    ]
  },
  {
    id: "guide-6",
    title: "環保與校園清潔宣導",
    icon: "♻️",
    summary: "落實資源回收、減塑生活與每日打掃工作。",
    details: [
      "一般垃圾與資源回收（鐵鋁罐、寶特瓶、紙類）請確實分類。",
      "鼓勵自行攜帶餐具與水壺，減少使用一次性餐具。",
      "打掃時間請認真落實負責區域衛生整潔。"
    ]
  }
];

/**
 * 3. 重要規定資料庫 (Rules)
 */
export const rulesData = [
  {
    id: "rule-1",
    title: "學生獎懲要點",
    icon: "🏆",
    summary: "學生獎勵、懲處及相關規定",
    url: "https://www.ymsh.hcc.edu.tw/ischool/rfile/ac31f21a2bfd50c7279377bcb589ce90"
  },
  {
    id: "rule-2",
    title: "學生服儀規定",
    icon: "👔",
    summary: "學生服裝與儀容相關規範",
    url: "https://www.ymsh.hcc.edu.tw/resource/openfid.php?id=60323"
  },
  {
    id: "rule-3",
    title: "學生請假辦法",
    icon: "📝",
    summary: "學生請假程序與相關規定",
    url: "https://www.ymsh.hcc.edu.tw/resource/openfid.php?id=60830"
  },
  {
    id: "rule-4",
    title: "考試相關規定",
    icon: "📝",
    items: [
      "考場與考試規則",
      "考試規定施行細則",
      "學生考試期間請假暨缺考補考辦法"
    ],
    url: "https://www.ymsh.hcc.edu.tw/ischool/resources/WID_57_1_dde47bdd9b4b33cb9b7213b8fd73d6edd8146eaa/CLS_57_1_2e445bdc715dcbe5d4f6cca5bc59d0b19db3eade/844ed10be236167c71945e25c361c07e.pdf"
  }
];

/**
 * 4. 報名專區資料庫 (Registrations)
 */
export const registrationsData = [
  {
    id: sharedActivities.scienceVolunteer2026.id,
    title: sharedActivities.scienceVolunteer2026.title,
    category: sharedActivities.scienceVolunteer2026.category,
    period: sharedActivities.scienceVolunteer2026.eventDate,
    deadline: "",
    eventEndDate: "2026-10-18",
    target: sharedActivities.scienceVolunteer2026.target,
    summary: sharedActivities.scienceVolunteer2026.registrationSummary,
    url: sharedActivities.scienceVolunteer2026.url,
    status: sharedActivities.scienceVolunteer2026.status,
    btnLabel: "👉 前往報名"
  }
];

/**
 * 5. 課表查詢資料庫 (Timetable)
 */
export const timetableData = {
  periodsInfo: [
    { period: 1, time: "08:15 - 09:00" },
    { period: 2, time: "09:10 - 09:55" },
    { period: 3, time: "10:10 - 10:55" },
    { period: 4, time: "11:05 - 11:50" },
    { period: "lunch", time: "11:50 - 13:10", label: "🍱 午餐與午休" },
    { period: 5, time: "13:15 - 14:00" },
    { period: 6, time: "14:10 - 14:55" },
    { period: 7, time: "15:05 - 15:50" }
  ],
  classSchedule: {
    1: { dayName: "星期一", lessons: [
      { period: 1, subject: "美術", teacher: "馮佩雯" },
      { period: 2, subject: "國語文", teacher: "王佳瑤" },
      { period: 3, subject: "經濟學", teacher: "陳昭君" },
      { period: 4, subject: "體育", teacher: "曾得全" },
      { period: 5, subject: "多媒體製作與應用", teacher: "劉佳欣", room: "5F電腦教室" },
      { period: 6, subject: "多媒體製作與應用", teacher: "劉佳欣", room: "5F電腦教室" },
      { period: 7, subject: "多媒體製作與應用", teacher: "劉佳欣", room: "5F電腦教室" }
    ]},
    2: { dayName: "星期二", lessons: [
      { period: 1, subject: "班會", teacher: "簡瑞賢" },
      { period: 2, subject: "彈性學習時間", teacher: "" },
      { period: 3, subject: "多元選修", teacher: "" },
      { period: 4, subject: "多元選修", teacher: "" },
      { period: 5, subject: "經濟學", teacher: "陳昭君" },
      { period: 6, subject: "數學", teacher: "簡瑞賢" },
      { period: 7, subject: "應用數學", teacher: "簡瑞賢" }
    ]},
    3: { dayName: "星期三", lessons: [
      { period: 1, subject: "英語文", teacher: "李佳玄" },
      { period: 2, subject: "數學", teacher: "簡瑞賢" },
      { period: 3, subject: "數位科技應用", teacher: "劉佳欣", room: "5F電腦教室" },
      { period: 4, subject: "數位科技應用", teacher: "劉佳欣", room: "5F電腦教室" },
      { period: 5, subject: "綜合活動", teacher: "" },
      { period: 6, subject: "綜合活動", teacher: "" },
      { period: 7, subject: "", teacher: "" }
    ]},
    4: { dayName: "星期四", lessons: [
      { period: 1, subject: "應用數學", teacher: "簡瑞賢" },
      { period: 2, subject: "化學", teacher: "吳正文" },
      { period: 3, subject: "國語文學概論", teacher: "王佳瑤" },
      { period: 4, subject: "經濟學", teacher: "陳昭君" },
      { period: 5, subject: "健康與護理", teacher: "簡瑞賢" },
      { period: 6, subject: "會計學", teacher: "鄭筱齡" },
      { period: 7, subject: "會計學", teacher: "鄭筱齡" }
    ]},
    5: { dayName: "星期五", lessons: [
      { period: 1, subject: "國語文", teacher: "王佳瑤" },
      { period: 2, subject: "國語文", teacher: "王佳瑤" },
      { period: 3, subject: "英語文", teacher: "李佳玄" },
      { period: 4, subject: "體育", teacher: "曾得全" },
      { period: 5, subject: "經濟學", teacher: "陳昭君" },
      { period: 6, subject: "生活英語會話", teacher: "李佳玄" },
      { period: 7, subject: "會計學", teacher: "鄭筱齡" }
    ]}
  },
  teacherSchedule: {
    1: { dayName: "星期一", lessons: [
      { period: 2, subject: "數學", targetClass: "九年六班" },
      { period: 3, subject: "數學", targetClass: "七年四班" },
      { period: 6, subject: "數學", targetClass: "資一乙" },
      { period: 7, subject: "數學", targetClass: "九年七班" }
    ]},
    2: { dayName: "星期二", lessons: [
      { period: 1, subject: "班會", targetClass: "資二丙" },
      { period: 2, subject: "數學", targetClass: "七年四班" },
      { period: 3, subject: "數學", targetClass: "九年六班" },
      { period: 5, subject: "數學", targetClass: "資一乙" },
      { period: 6, subject: "數學", targetClass: "資二丙" },
      { period: 7, subject: "應用數學", targetClass: "資二丙" }
    ]},
    3: { dayName: "星期三", lessons: [
      { period: 1, subject: "數學", targetClass: "九年六班" },
      { period: 2, subject: "數學", targetClass: "資二丙" },
      { period: 4, subject: "數學", targetClass: "九年七班" },
      { period: 7, subject: "數學", targetClass: "資一乙" }
    ]},
    4: { dayName: "星期四", lessons: [
      { period: 1, subject: "應用數學", targetClass: "資二丙" },
      { period: 2, subject: "數學", targetClass: "九年七班" },
      { period: 3, subject: "數學", targetClass: "七年四班" },
      { period: 4, subject: "數學", targetClass: "廣技一丙" },
      { period: 5, subject: "健康與護理", targetClass: "資二丙" },
      { period: 6, subject: "健康教育", targetClass: "九年六班" }
    ]},
    5: { dayName: "星期五", lessons: [
      { period: 1, subject: "數學", targetClass: "廣技一丙" },
      { period: 2, subject: "數學", targetClass: "資一乙" },
      { period: 3, subject: "數學", targetClass: "七年四班" },
      { period: 4, subject: "數學", targetClass: "九年七班" },
      { period: 5, subject: "社團" },
      { period: 6, subject: "社團" },
      { period: 7, subject: "數學", targetClass: "九年六班" }
    ]}
  }
};

/**
 * 6. 精選重要日程資料庫 (115-1 正式校曆資料)
 * 收錄 4 大類別：exam (段考 3 筆), homework (作業抽查 2 筆), club (社團 8 筆), assessment (測驗與檢定 7 筆)
 * 全部資料依日期由近到遠排序 (共 20 筆正式資料)
 */
export const eventsData = {
  // 分類字典定義
  categories: {
    all: { label: "全部", icon: "🗓️" },
    exam: { label: "段考", icon: "📝" },
    homework: { label: "作業抽查", icon: "📚" },
    club: { label: "社團", icon: "👥" },
    assessment: { label: "測驗與檢定", icon: "🏅" }
  },

  // 正式日程時間軸清單 (20 筆正式資料，依 startDate 由近到遠排序)
  timeline: [
    // 1. 2026/09/04 (五) - 115年度全國技術士技能檢定報名
    {
      id: "evt-ass-4",
      title: "115年度全國技術士技能檢定報名",
      category: "assessment",
      subtype: "registration",
      startDate: "2026-09-04",
      dateDisplay: "09/04 (五)",
      description: "115年度全國技術士技能檢定報名",
      isImportant: false
    },

    // 2. 2026/09/16 (三) - 社團活動 (第 1 次)
    {
      id: "evt-club-1",
      title: "社團活動",
      category: "club",
      startDate: "2026-09-16",
      dateDisplay: "09/16 (三)",
      description: "本學期第 1 次社團活動",
      isImportant: false
    },

    // 3. 2026/09/23 (三) - 社團活動 (第 2 次)
    {
      id: "evt-club-2",
      title: "社團活動",
      category: "club",
      startDate: "2026-09-23",
      dateDisplay: "09/23 (三)",
      description: "本學期第 2 次社團活動",
      isImportant: false
    },

    // 4. 2026/10/07 (三) - 社團活動 (第 3 次)
    {
      id: "evt-club-3",
      title: "社團活動",
      category: "club",
      startDate: "2026-10-07",
      dateDisplay: "10/07 (三)",
      description: "本學期第 3 次社團活動",
      isImportant: false
    },

    // 5. 2026/10/13 ~ 10/14 (二~三) - 第一次段考
    {
      id: "evt-exam-1",
      title: "第一次段考",
      category: "exam",
      startDate: "2026-10-13",
      endDate: "2026-10-14",
      dateDisplay: "10/13 (二) ～ 10/14 (三)",
      description: "第一學期第一次定期考查",
      isImportant: true
    },

    // 6. 2026/10/20 (二) - 數學競試
    {
      id: "evt-ass-1",
      title: "數學競試",
      category: "assessment",
      subtype: "test",
      startDate: "2026-10-20",
      dateDisplay: "10/20 (二)",
      description: "適用高中職一、二年級數學競試",
      isImportant: false
    },

    // 7. 2026/10/21 (三) - 社團活動 (第 4 次)
    {
      id: "evt-club-4",
      title: "社團活動",
      category: "club",
      startDate: "2026-10-21",
      dateDisplay: "10/21 (三)",
      description: "本學期第 4 次社團活動",
      isImportant: false
    },

    // 8. 2026/10/28 (三) - 社團活動 (第 5 次)
    {
      id: "evt-club-5",
      title: "社團活動",
      category: "club",
      startDate: "2026-10-28",
      dateDisplay: "10/28 (三)",
      description: "本學期第 5 次社團活動",
      isImportant: false
    },

    // 9. 2026/10/28 ~ 10/29 (三~四) - 期中作業抽查
    {
      id: "evt-hw-1",
      title: "期中作業抽查",
      category: "homework",
      startDate: "2026-10-28",
      endDate: "2026-10-29",
      dateDisplay: "10/28 (三) ～ 10/29 (四)",
      description: "期中各科習作與隨堂講義抽查",
      isImportant: false
    },

    // 10. 2026/11/02 ~ 11/06 (一~五) - TQC檢定報名
    {
      id: "evt-ass-5",
      title: "TQC檢定報名",
      category: "assessment",
      subtype: "registration",
      startDate: "2026-11-02",
      endDate: "2026-11-06",
      dateDisplay: "11/02 (一) ～ 11/06 (五)",
      description: "TQC檢定報名",
      isImportant: false
    },

    // 11. 2026/11/04 (三) - 社團活動 (第 6 次)
    {
      id: "evt-club-6",
      title: "社團活動",
      category: "club",
      startDate: "2026-11-04",
      dateDisplay: "11/04 (三)",
      description: "本學期第 6 次社團活動",
      isImportant: false
    },

    // 12. 2026/11/08 (日) - 全國第3梯次技術士技能檢定－學科測驗
    {
      id: "evt-ass-6",
      title: "全國第3梯次技術士技能檢定－學科測驗",
      category: "assessment",
      subtype: "certification",
      startDate: "2026-11-08",
      dateDisplay: "11/08 (日)",
      description: "全國第3梯次技術士技能檢定－學科測驗",
      isImportant: false
    },

    // 13. 2026/11/25 (三) - 社團活動 (第 7 次)
    {
      id: "evt-club-7",
      title: "社團活動",
      category: "club",
      startDate: "2026-11-25",
      dateDisplay: "11/25 (三)",
      description: "本學期第 7 次社團活動",
      isImportant: false
    },

    // 14. 2026/11/26 ~ 11/27 (四~五) - 第二次段考
    {
      id: "evt-exam-2",
      title: "第二次段考",
      category: "exam",
      startDate: "2026-11-26",
      endDate: "2026-11-27",
      dateDisplay: "11/26 (四) ～ 11/27 (五)",
      description: "第一學期第二次定期考查",
      isImportant: true
    },

    // 15. 2026/12/09 (三) - 社團活動 (第 8 次)
    {
      id: "evt-club-8",
      title: "社團活動",
      category: "club",
      startDate: "2026-12-09",
      dateDisplay: "12/09 (三)",
      description: "本學期第 8 次社團活動",
      isImportant: false
    },

    // 16. 2026/12/15 (二) - 高中職一、二年級英語單字認證比賽
    {
      id: "evt-ass-2",
      title: "高中職一、二年級英語單字認證比賽",
      category: "assessment",
      subtype: "recognition",
      startDate: "2026-12-15",
      dateDisplay: "12/15 (二)",
      description: "高中職一、二年級英語單字認證比賽",
      isImportant: false
    },

    // 17. 2026/12/21 ~ 12/28 (一~一) - TQC檢定
    {
      id: "evt-ass-3",
      title: "TQC檢定",
      category: "assessment",
      subtype: "certification",
      startDate: "2026-12-21",
      endDate: "2026-12-28",
      dateDisplay: "12/21 (一) ～ 12/28 (一)",
      description: "TQC 資訊技能認證正式檢定",
      isImportant: false
    },

    // 18. 2026/12/22 ~ 12/23 (二~三) - 期末作業抽查
    {
      id: "evt-hw-2",
      title: "期末作業抽查",
      category: "homework",
      startDate: "2026-12-22",
      endDate: "2026-12-23",
      dateDisplay: "12/22 (二) ～ 12/23 (三)",
      description: "期末各科作業學習單抽查",
      isImportant: false
    },

    // 19. 2027/01/04 ~ 01/15 (一~五) - 全國技術士術科測驗
    {
      id: "evt-ass-7",
      title: "全國技術士術科測驗",
      category: "assessment",
      subtype: "certification",
      startDate: "2027-01-04",
      endDate: "2027-01-15",
      dateDisplay: "01/04 (一) ～ 01/15 (五)",
      description: "電腦軟體應用乙級、印前製程圖文組版丙級",
      isImportant: false
    },

    // 20. 2027/01/18 ~ 01/20 (一~三) - 第三次段考
    {
      id: "evt-exam-3",
      title: "第三次段考",
      category: "exam",
      startDate: "2027-01-18",
      endDate: "2027-01-20",
      dateDisplay: "01/18 (一) ～ 01/20 (三)",
      description: "第一學期期末考查與成績結算",
      isImportant: true
    }
  ]
};

/**
 * 7. 常見問題資料庫 (FAQ)
 */
export const faqData = [
  {
    id: "faq-1",
    question: "Q1：如何聯絡導師？",
    answer: "請透過班級 LINE 官方帳號私訊聯絡。如有緊急事項，請優先透過 LINE 聯繫。"
  },
  {
    id: "faq-2",
    question: "Q2：如何進行學生請假？",
    answer: "請點擊首頁下方快速功能「請假說明」查看相關資料與重要提醒。線上請假入口尚未開放，請依學校現行規定辦理。"
  },
  {
    id: "faq-3",
    question: "Q3：如何查看班級最新公告與重要通知？",
    answer: "請進入首頁的「📢 最新公告」卡片。標示 🔴 重要、家長簽名或繳費標籤之通知請優先處理。"
  },
  {
    id: "faq-4",
    question: "Q4：LINE 裡面的連結打不開怎麼辦？",
    answer: "若從 LINE 點擊連結後無法正常顯示或輸入，請點擊 LINE 頁面右下角的「⋯」（更多選項），選擇「以預設瀏覽器開啟」（例如 Safari 或 Chrome）。"
  },
  {
    id: "faq-5",
    question: "Q5：如何查詢班級課表或導師課表？",
    answer: "點擊首頁「📅 課表查詢」卡片，可切換「資二丙課表」與「導師課表」兩種模式，並透過星期標籤切換不同天的課表。"
  },
  {
    id: "faq-6",
    question: "Q6：如何查看重要日程（段考、作業抽查等）？",
    answer: "點擊首頁「🗓️ 重要日程」卡片，可使用分類篩選（段考、作業抽查、社團、測驗與檢定），或直接展開月份查看完整日程。"
  },
  {
    id: "faq-7",
    question: "Q7：如何報名校內外活動或檢定？",
    answer: "點擊首頁「📝 線上辦理」卡片，可查看「即將截止」與「開放報名中」的項目，點擊「前往報名」即可連結至報名表單。"
  },
  {
    id: "faq-8",
    question: "Q8：如何查看學校重要規定？",
    answer: "點擊首頁「📖 重要規定」卡片，可查看學生獎懲要點、服儀規定、請假辦法與考試相關規定，點擊任一項目即可開啟學校官方文件。"
  },
  {
    id: "faq-9",
    question: "Q9：如何查看校園安全與生活宣導？",
    answer: "點擊首頁「📌 宣導事項」卡片，可查看校園安全、交通安全、網路安全、反詐騙、健康教育與環保等重要宣導內容。"
  },
  {
    id: "faq-10",
    question: "Q10：本網站支援哪些裝置？",
    answer: "本站採用響應式設計，支援手機、平板與電腦瀏覽器。建議使用 Chrome、Safari、Edge 等現代瀏覽器以獲得最佳體驗。"
  }
];
