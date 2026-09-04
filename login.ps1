# GitHub 登入腳本
# 執行此腳本完成 GitHub CLI 登入

Write-Output "=== GitHub CLI 登入 ==="
Write-Output ""
Write-Output "步驟 1: 複製以下驗證碼"
Write-Output ""

# Start auth login
$env:Path = "$env:USERPROFILE\scoop\shims;$env:Path"
gh auth login --hostname github.com --git-protocol https --web

Write-Output ""
Write-Output "步驟 2: 在瀏覽器中完成登入"
Write-Output "步驟 3: 登入完成後，執行以下指令推送程式碼："
Write-Output ""
Write-Output "git push -u origin main"
Write-Output ""
