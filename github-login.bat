@echo off
echo ========================================
echo GitHub 登入腳本
echo ========================================
echo.
echo 請依照以下步驟操作：
echo.
echo 1. 在終端機中執行以下指令：
echo    gh auth login
echo.
echo 2. 選擇以下選項：
echo    - What account? → GitHub.com
echo    - Preferred protocol? → HTTPS
echo    - Authenticate Git with your GitHub credentials? → Yes
echo    - How would you like to authenticate? → Login with a web browser
echo.
echo 3. 複製顯示的驗證碼
echo.
echo 4. 在瀏覽器中開啟：
echo    https://github.com/login/device
echo.
echo 5. 貼上驗證碼並完成登入
echo.
echo 6. 登入完成後，執行以下指令推送程式碼：
echo.
echo    cd "C:\Users\ggk\Documents\Default Project\class-website"
echo    git push -u origin main
echo.
echo ========================================
pause
