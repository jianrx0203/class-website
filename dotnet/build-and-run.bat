@echo off
title Class Website - C# + Java
echo ============================================
echo   Class Website - C# + Java Build
echo ============================================
echo.

echo [1/4] Building C# ASP.NET Core...
cd /d "C:\Users\ggk\Documents\Default Project\class-website-dotnet"
dotnet build -c Release --nologo -v q
if %errorlevel% neq 0 (
    echo C# build failed!
    pause
    exit /b 1
)
echo C# build OK

echo.
echo [2/4] Compiling Java Admin API...
cd /d "C:\Users\ggk\Documents\Default Project\class-website-java"
if not exist out mkdir out
"C:\Program Files\Microsoft\jdk-25.0.3.9-hotspot\bin\javac.exe" -d out -sourcepath src\main\java src\main\java\classwebsite\AdminServer.java
if %errorlevel% neq 0 (
    echo Java build failed!
    pause
    exit /b 1
)
echo Java build OK

echo.
echo [3/4] Starting C# Server (port 8888)...
start "C# Server" cmd /c "cd /d C:\Users\ggk\Documents\Default Project\class-website-dotnet && dotnet run -c Release --urls http://0.0.0.0:8888"
timeout /t 3 /nobreak >nul

echo.
echo [4/4] Starting Java Admin Server (port 8889)...
start "Java Admin" cmd /c "cd /d C:\Users\ggk\Documents\Default Project\class-website-java && java -cp out classwebsite.AdminServer"
timeout /t 2 /nobreak >nul

echo.
echo ============================================
echo   Both servers started!
echo ============================================
echo   C# Site:    http://localhost:8888
echo   Java Admin: http://localhost:8889
echo ============================================
echo.
pause
