@echo off
echo ========================================
echo   Building Android APK
echo ========================================
echo.

REM Set environment
set JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.12.8-hotspot
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set PATH=%JAVA_HOME%\bin;%PATH%

echo JAVA_HOME: %JAVA_HOME%
echo ANDROID_HOME: %ANDROID_HOME%
echo.

REM Navigate to project
cd /d "%~dp0releases\android-project"

echo Current directory: %CD%
echo.

REM Check for gradlew
if exist gradlew.bat (
    echo Running Gradle build...
    call gradlew.bat assembleDebug --no-daemon
) else (
    echo gradlew.bat not found
    echo Please run: gradle wrapper --gradle-version 8.4
)

echo.
echo ========================================
echo   Build Complete
echo ========================================
pause
