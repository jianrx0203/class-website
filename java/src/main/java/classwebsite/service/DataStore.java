package classwebsite.service;

import classwebsite.model.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;

public class DataStore {
    private static DataStore instance;
    private final String dataFile = "admin_data.json";

    public List<Announcement> announcements = new ArrayList<>();
    public List<Object> faq = new ArrayList<>();
    public List<Object> events = new ArrayList<>();
    public List<Object> guidelines = new ArrayList<>();
    public List<Object> rules = new ArrayList<>();
    public List<Object> registrations = new ArrayList<>();

    private String rawJson = "{}";

    public static DataStore getInstance() {
        if (instance == null) instance = new DataStore();
        return instance;
    }

    public void load() {
        try {
            Path path = Path.of(dataFile);
            if (Files.exists(path)) {
                rawJson = Files.readString(path);
                System.out.println("Data loaded from " + dataFile);
            } else {
                rawJson = getDefaultData();
                Files.writeString(path, rawJson);
                System.out.println("Default data created");
            }
        } catch (Exception e) {
            rawJson = getDefaultData();
            System.out.println("Using default data: " + e.getMessage());
        }
    }

    public void save() {
        try {
            Files.writeString(Path.of(dataFile), rawJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String toJson() {
        return rawJson;
    }

    public void updateJson(String newJson) {
        this.rawJson = newJson;
        save();
    }

    private String getDefaultData() {
        return """
{
  "announcements": [
    {
      "id": "ann-008",
      "date": "2026/08/31",
      "category": "學校活動",
      "title": "8/31 開學日重要時程提醒",
      "content": "一、返校日：8/31（一）\\n1. 時間：08:00 ~ 15:00\\n2. 地點：各班教室\\n3. 注意事項：穿著校服、攜帶假期作業、班代需繳交班費\\n\\n二、開學典禮：9/1（二）08:00\\n\\n三、第一次導師時間：9/1（二）15:10~15:50",
      "isImportant": true,
      "customTag": "重要",
      "requireSignature": true,
      "requirePayment": false,
      "deadlineDate": "",
      "externalUrl": "",
      "requireRegistration": false,
      "eventEndDate": "",
      "btnLabel": ""
    },
    {
      "id": "ann-007",
      "date": "2026/08/25",
      "category": "志工服務",
      "title": "2026 新竹縣科普博覽會青年志工招募",
      "content": "新竹縣科普博覽會將於10/17-18在新竹縣體育館舉辦，現招募青年志工。\\n\\n報名資格：全校同學（對志工服務有興趣者）\\n報名方式：掃描 QR Code 填寫表單",
      "isImportant": false,
      "customTag": "",
      "requireSignature": false,
      "requirePayment": false,
      "deadlineDate": "",
      "externalUrl": "https://www.surveycake.com/s/VAP3M",
      "requireRegistration": true,
      "eventEndDate": "2026/10/18",
      "btnLabel": "前往報名"
    },
    {
      "id": "ann-003",
      "date": "2026/08/25",
      "category": "班級公告",
      "title": "新學期資二丙班級資訊站正式上線",
      "content": "資二丙班級資訊站已正式上線！\\n\\n網站功能包括：\\n- 最新公告\\n- 課表查詢\\n- 重要日程\\n- 宣導事項\\n- 線上辦理\\n- 重要規定\\n- 常見問題\\n\\n如有問題請聯繫導師。",
      "isImportant": false,
      "customTag": "",
      "requireSignature": false,
      "requirePayment": false,
      "deadlineDate": "",
      "externalUrl": "",
      "requireRegistration": false,
      "eventEndDate": "",
      "btnLabel": ""
    }
  ],
  "faq": [
    {"id":"faq-1","question":"Q1：如何聯絡導師？","answer":"可透過班級 LINE 官方帳號與導師聯繫，或在放學時間直接到導師辦公室找導師。如有緊急事項，請優先使用 LINE 聯繫。"},
    {"id":"faq-2","question":"Q2：如何進行學生請假？","answer":"請假流程：\\n1. 填寫學校請假系統\\n2. 由家長確認\\n3. 導師審核\\n\\n詳細步驟請參考「請假說明」頁面。"},
    {"id":"faq-3","question":"Q3：如何查看班級最新公告與重要通知？","answer":"在首頁點選「最新公告」即可查看所有公告。重要公告會以紅色標示。"},
    {"id":"faq-4","question":"Q4：LINE 裡面的連結打不開怎麼辦？","answer":"建議使用手機預設瀏覽器開啟連結。如仍有問題，可直接透過本網站查看相關資訊。"},
    {"id":"faq-5","question":"Q5：如何查詢班級課表或導師課表？","answer":"在首頁點選「課表查詢」，可切換「班級課表」與「導師課表」兩種模式。支援按星期切換檢視。"},
    {"id":"faq-6","question":"Q6：如何查看重要日程（段考、作業抽查等）？","answer":"在首頁點選「重要日程」，可依類別篩選（段考、作業抽查、社團、測驗與檢定）。系統會自動顯示下一個即將到來的活動。"},
    {"id":"faq-7","question":"Q7：如何報名校內外活動或檢定？","answer":"在首頁點選「線上辦理」，查看目前開放報名的活動。點擊「前往報名」即可跳轉至報名表單。"},
    {"id":"faq-8","question":"Q8：如何查看學校重要規定？","answer":"在首頁點選「重要規定」，可查看學生獎懲要點、服儀規定、請假辦法、考試規定等。"},
    {"id":"faq-9","question":"Q9：如何查看校園安全與生活宣導？","answer":"在首頁點選「宣導事項」，涵蓋校園安全、交通安全、網路安全、反詐騙、健康教育、環保等主題。"},
    {"id":"faq-10","question":"Q10：本網站支援哪些裝置？","answer":"本站在手機、平板、電腦上均可正常使用，採用響應式設計。建議使用 Chrome、Safari、Edge 等現代瀏覽器。"}
  ],
  "events": [
    {"id":"evt-ass-4","title":"校外教學報名截止","category":"assessment","startDate":"2026-09-04","endDate":"","dateDisplay":"9/4","description":"校外教學報名截止日","isImportant":false,"subtype":"registration"},
    {"id":"evt-club-1","title":"社團活動開始","category":"club","startDate":"2026-09-16","endDate":"","dateDisplay":"9/16","description":"社團活動正式開始","isImportant":false},
    {"id":"evt-club-2","title":"社團活動","category":"club","startDate":"2026-09-23","endDate":"","dateDisplay":"9/23","description":"社團活動日","isImportant":false},
    {"id":"evt-club-3","title":"社團活動","category":"club","startDate":"2026-10-07","endDate":"","dateDisplay":"10/7","description":"社團活動日","isImportant":false},
    {"id":"evt-exam-1","title":"第一次段考","category":"exam","startDate":"2026-10-13","endDate":"2026-10-15","dateDisplay":"10/13 ~ 10/15","description":"第一次段考","isImportant":true},
    {"id":"evt-ass-1","title":"基本學力測驗","category":"assessment","startDate":"2026-10-20","endDate":"","dateDisplay":"10/20","description":"基本學力測驗","isImportant":false,"subtype":"test"},
    {"id":"evt-club-4","title":"社團活動","category":"club","startDate":"2026-10-21","endDate":"","dateDisplay":"10/21","description":"社團活動日","isImportant":false},
    {"id":"evt-club-5","title":"社團活動","category":"club","startDate":"2026-10-28","endDate":"","dateDisplay":"10/28","description":"社團活動日","isImportant":false},
    {"id":"evt-hw-1","title":"作業抽查（第一次）","category":"homework","startDate":"2026-10-28","endDate":"","dateDisplay":"10/28","description":"作業抽查","isImportant":false},
    {"id":"evt-ass-5","title":"校外教學報名截止","category":"assessment","startDate":"2026-11-02","endDate":"","dateDisplay":"11/2","description":"校外教學報名截止","isImportant":false,"subtype":"registration"},
    {"id":"evt-club-6","title":"社團活動","category":"club","startDate":"2026-11-04","endDate":"","dateDisplay":"11/4","description":"社團活動日","isImportant":false},
    {"id":"evt-ass-6","title":"英文檢定報名截止","category":"assessment","startDate":"2026-11-08","endDate":"","dateDisplay":"11/8","description":"英文檢定報名截止","isImportant":false,"subtype":"certification"},
    {"id":"evt-club-7","title":"社團活動","category":"club","startDate":"2026-11-25","endDate":"","dateDisplay":"11/25","description":"社團活動日","isImportant":false},
    {"id":"evt-exam-2","title":"第二次段考","category":"exam","startDate":"2026-11-26","endDate":"2026-11-28","dateDisplay":"11/26 ~ 11/28","description":"第二次段考","isImportant":true},
    {"id":"evt-club-8","title":"社團活動","category":"club","startDate":"2026-12-09","endDate":"","dateDisplay":"12/9","description":"社團活動日","isImportant":false},
    {"id":"evt-ass-2","title":"成果發表會","category":"assessment","startDate":"2026-12-15","endDate":"","dateDisplay":"12/15","description":"成果發表會","isImportant":false,"subtype":"recognition"},
    {"id":"evt-ass-3","title":"證照檢定","category":"assessment","startDate":"2026-12-21","endDate":"","dateDisplay":"12/21","description":"證照檢定日","isImportant":false,"subtype":"certification"},
    {"id":"evt-hw-2","title":"作業抽查（第二次）","category":"homework","startDate":"2026-12-22","endDate":"","dateDisplay":"12/22","description":"作業抽查","isImportant":false},
    {"id":"evt-ass-7","title":"證照檢定","category":"assessment","startDate":"2027-01-04","endDate":"","dateDisplay":"1/4","description":"證照檢定日","isImportant":false,"subtype":"certification"},
    {"id":"evt-exam-3","title":"第三次段考","category":"exam","startDate":"2027-01-18","endDate":"2027-01-20","dateDisplay":"1/18 ~ 1/20","description":"第三次段考","isImportant":true}
  ],
  "guidelines": [
    {"id":"guide-1","title":"校園安全","icon":"🛡️","summary":"維護校園安全，人人有責","details":["校園內請勿奔跑、攀爬圍牆或欄杆","發現可疑人物或物品請立即通報導師或校安中心","放學後請盡速離校，非校內活動請勿逗留"]},
    {"id":"guide-2","title":"交通安全與校車規範","icon":"🚦","summary":"遵守交通規則，確保上下學安全","details":["騎乘機車請配戴安全帽，遵守交通號誌","搭乘校車請依序上下車，繫好安全帶","步行請走行人穿越道，勿滑手機過馬路"]},
    {"id":"guide-3","title":"網路安全與資安防護","icon":"🌐","summary":"保護個人資訊，防範網路詐騙","details":["請勿隨意點擊不明連結或掃描未知 QR Code","帳戶密碼請定期更換，勿使用簡單密碼","收到可疑訊息請先向導師或家長確認"]},
    {"id":"guide-4","title":"反詐騙專區","icon":"⚠️","summary":"提高警覺，防範各類詐騙","details":["接到自稱學校、政府機關的電話或訊息，請先查證","網路購物請使用安全付款方式，勿私下匯款","投資理財廣告多為詐騙，切勿輕信高報酬承诺"]},
    {"id":"guide-5","title":"健康教育與衛生防護","icon":"🩺","summary":"注重個人衛生，維護身心健康","details":["身體不適請盡速就醫，並通知導師","勤洗手、戴口罩，落實個人衛生習慣","保持教室整潔，定期通風換氣"]},
    {"id":"guide-6","title":"環保與校園清潔宣導","icon":"♻️","summary":"愛護環境，落實資源回收","details":["垃圾請分類投放，落實資源回收","節約用水用電，離開教室請隨手關燈關冷氣","維護校園整潔，勿亂丟垃圾"]},
    {"id":"guide-7","title":"身心健康與人際關係","icon":"💚","summary":"關注心理健康，建立良好人際關係","details":["遇到困擾可尋求輔導室協助","尊重他人，不歧視、不霸凌","保持正向態度，適時抒發壓力"]},
    {"id":"guide-8","title":"法治教育與公民素養","icon":"⚖️","summary":"知法守法，培養公民意識","details":["了解校規與相關法令規定","尊重他人權益，不侵害他人隱私","遇到法律問題可尋求導師或輔導室協助"]}
  ],
  "rules": [
    {"id":"rule-1","title":"學生獎懲要點","icon":"🏆","summary":"學校獎懲標準與實施辦法","items":[],"url":"https://www.ymsh.hcc.edu.tw"},
    {"id":"rule-2","title":"學生服儀規定","icon":"👔","summary":"學生穿著制服、運動服之相關規定","items":[],"url":"https://www.ymsh.hcc.edu.tw"},
    {"id":"rule-3","title":"學生請假辦法","icon":"📝","summary":"學生請假流程與規範","items":[],"url":"https://www.ymsh.hcc.edu.tw"},
    {"id":"rule-4","title":"考試相關規定","icon":"📝","summary":"考試纪律與注意事項","items":["考試期間嚴禁作弊，違者依校規處分","手機請關機或靜音，放置於指定位置","遲到逾30分鐘不得應考"],"url":"https://www.ymsh.hcc.edu.tw"}
  ],
  "registrations": [
    {
      "id":"reg-001",
      "title":"2026 新竹縣科普博覽會青年志工招募",
      "category":"志工服務",
      "period":"10/17 ~ 10/18",
      "deadline":"2026/10/18",
      "eventEndDate":"2026/10/18",
      "target":"全校同學（對志工服務有興趣者）",
      "summary":"新竹縣科普博覽會青年志工招募",
      "url":"https://www.surveycake.com/s/VAP3M",
      "status":"open",
      "btnLabel":"前往報名"
    }
  ]
}""";
    }
}
