@echo off
title Yogesh Portfolio — IBM Granite Agentic AI
color 0B
cls

echo.
echo  ================================================================
echo    Yogesh Kumar's Portfolio Website
echo    IBM Granite Agentic AI Assistant (Powered by watsonx.ai)
echo  ================================================================
echo    Trainer  : Eluri Narendra (Technical Master Trainer)
echo    Expertise: Agentic AI  ^|  Machine Learning  ^|  Quantum Computing
echo  ================================================================
echo.

:: ── Directory setup ───────────────────────────────────────────
set "PORTFOLIO_DIR=%~dp0"
set "INDEX_FILE=%PORTFOLIO_DIR%index.html"
set "SERVER_FILE=%PORTFOLIO_DIR%server.js"
set "ENV_FILE=%PORTFOLIO_DIR%.env"

:: ── Check required files ──────────────────────────────────────
if not exist "%INDEX_FILE%" (
    echo  [ERROR] index.html not found in:
    echo          %PORTFOLIO_DIR%
    echo.
    pause
    exit /b 1
)

echo  [INFO] Portfolio files found.
echo.
echo  ================================================================
echo    LAUNCH OPTIONS:
echo  ================================================================
echo.
echo    [1]  Open directly in browser    (no Node.js needed)
echo    [2]  Start Node.js server        (enables live IBM Granite API)
echo    [3]  Check IBM Granite status    (requires server running)
echo    [4]  Exit
echo.
set /p CHOICE="  Enter your choice (1/2/3/4): "

if "%CHOICE%"=="1" goto DIRECT
if "%CHOICE%"=="2" goto SERVER
if "%CHOICE%"=="3" goto STATUS
if "%CHOICE%"=="4" goto END
goto DIRECT

:: ── OPTION 1: Direct browser launch ──────────────────────────
:DIRECT
echo.
echo  [INFO] Opening portfolio in your default browser...
start "" "%INDEX_FILE%"
echo.
echo  ================================================================
echo    Portfolio opened!
echo.
echo    HOW TO USE THE IBM GRANITE AI ASSISTANT:
echo    >> Click the floating robot button (bottom-right corner)
echo    >> Ask anything about Yogesh in natural language:
echo         "What are his skills?"
echo         "Tell me about his projects"
echo         "How can I contact Yogesh?"
echo         "Is he available for hire?"
echo         "Tell me about Eluri Narendra"
echo.
echo    NOTE: In direct mode, the AI uses the built-in client-side
echo    reasoning engine. For live IBM Granite inference, use
echo    Option [2] to start the Node.js server first.
echo  ================================================================
goto END

:: ── OPTION 2: Node.js server mode ────────────────────────────
:SERVER
echo.
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js is not installed or not in PATH.
    echo          Download from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo  [INFO] Checking for dotenv package...
if not exist "%PORTFOLIO_DIR%node_modules\dotenv" (
    echo  [INFO] Installing dotenv...
    cd /d "%PORTFOLIO_DIR%"
    npm install dotenv --save >nul 2>&1
    echo  [INFO] dotenv installed.
)

echo  [INFO] Starting IBM Granite proxy server on PORT 3000...
echo  [INFO] Reading credentials from .env...
echo.
start "IBM Granite Server" cmd /k "cd /d "%PORTFOLIO_DIR%" && node server.js"

:: Wait for server to boot
timeout /t 2 /nobreak >nul

echo  [INFO] Opening portfolio in browser...
start "" "http://localhost:3000"
echo.
echo  ================================================================
echo    Server running at: http://localhost:3000
echo    Health check:      http://localhost:3000/api/status
echo    Granite endpoint:  POST http://localhost:3000/api/granite
echo.
echo    IBM Granite Config (from .env):
echo      Project ID : 70838522-da0e-48f1-b5aa-c930dcbd57c0
echo      Region     : https://us-south.ml.cloud.ibm.com
echo      Model      : ibm/granite-13b-chat-v2
echo      Port       : 3000
echo  ================================================================
goto END

:: ── OPTION 3: Status check ────────────────────────────────────
:STATUS
echo.
echo  [INFO] Checking IBM Granite server status...
echo.
curl -s http://localhost:3000/api/status 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Server not running. Choose option [2] first.
)
echo.
goto END

:: ── EXIT ──────────────────────────────────────────────────────
:END
echo.
echo  ================================================================
echo    IBM Granite Agentic AI Loop:
echo    Perceive  -^>  Plan  -^>  Act  -^>  Reflect
echo  ================================================================
echo.
echo  Press any key to close this launcher...
pause >nul
exit /b 0
