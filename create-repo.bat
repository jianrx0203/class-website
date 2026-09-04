@echo off
echo ========================================
echo 建立新的 GitHub Repository
echo ========================================
echo.
echo 步驟 1: 前往 GitHub 建立新 Repository
echo.
echo    https://github.com/new
echo.
echo 步驟 2: 填寫以下資訊：
echo    - Repository name: class-website
echo    - Description: 資二丙班級資訊站
echo    - 選擇 Public
echo    - 不要勾選任何選項
echo.
echo 步驟 3: 點擊 Create repository
echo.
echo 步驟 4: 執行以下指令推送程式碼：
echo.
echo    cd "C:\Users\ggk\Documents\Default Project\class-website"
echo    git remote set-url origin https://github.com/ggk7015/class-website.git
echo    git push -u origin main
echo.
echo ========================================
pause
