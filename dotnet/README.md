# 資二丙班級資訊站 - C# + Java 版

使用 ASP.NET Core (C#) + Java 重構的班級資訊站。

## 架構

```
class-website/
├── dotnet/              # C# ASP.NET Core 後端
│   ├── Program.cs       # 伺服器配置（安全性標頭、快取、SPA 路由）
│   ├── wwwroot/         # 前端靜態檔案（HTML/CSS/JS）
│   └── build-and-run.bat
├── java/                # Java Admin API 服務
│   ├── src/main/java/classwebsite/
│   │   ├── AdminServer.java      # HTTP 伺服器入口
│   │   ├── handler/              # 請求處理器
│   │   ├── model/                # 資料模型
│   │   └── service/              # 資料儲存服務
│   └── out/                      # 編譯輸出
├── index.html           # 原始 HTML 版本
├── css/style.css        # 原始 CSS
├── js/                  # 原始 JavaScript
└── server.js            # Node.js 版本
```

## 啟動方式

### 方法一：使用批次檔
```batch
dotnet\build-and-run.bat
```

### 方法二：手動啟動
```batch
# 啟動 C# 後端 (port 8888)
cd dotnet
dotnet run -c Release --urls http://0.0.0.0:8888

# 啟動 Java Admin API (port 8889)
cd java
javac -d out -sourcepath src\main\java src\main\java\classwebsite\AdminServer.java
java -cp out classwebsite.AdminServer
```

## 技術棧

- **C# 後端**: ASP.NET Core 10.0 (Razor Pages 模板，SPA 模式)
- **Java 後端**: JDK 25 + com.sun.net.httpserver (輕量級 HTTP 伺服器)
- **前端**: Vanilla JS + Anime.js v4 + Motion v11 (完全保留)
- **資料格式**: JSON

## C# 後端功能

- 靜態檔案服務（SPA 模式）
- 安全性標頭 (X-Content-Type-Options, X-Frame-Options, XSS Protection)
- 長效快取 (CSS/JS/圖片: 1年, HTML: no-cache)
- SPA 路由回退 (404 → index.html)

## Java Admin API 功能

- 管理員登入驗證
- 資料匯出/匯入 (JSON)
- RESTful API 端點
- CORS 支援

## API 端點

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/data/` | 取得所有公開資料 |
| POST | `/api/admin/login` | 管理員登入 |
| GET | `/api/admin/data` | 取得所有資料（需認證） |
| POST | `/api/admin/data` | 匯入資料（需認證） |

## 資料完整性

所有原始資料完整保留：
- 3 則公告
- 6+2 則宣導事項
- 4 則重要規定
- 1 則線上辦理
- 20 則重要日程
- 10 則 FAQ
- 完整課表（7節 × 5天）
- 12 個動畫效果
- 所有 CSS 變數與響應式設計
