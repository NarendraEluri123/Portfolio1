@echo off
title Yogesh Portfolio — Export 150-Second Video
color 0B
cls

echo.
echo  ================================================================
echo    Yogesh Portfolio — Export 150-Second Presentation Video
echo    IBM Granite Agentic AI | Trainer: Eluri Narendra
echo  ================================================================
echo.
echo  This will export YogeshPortfolio_Presentation.pptx
echo  to a 150-second MP4 video using PowerPoint.
echo.
echo  Requirements:
echo    - Microsoft PowerPoint must be installed
echo    - The PPTX file must be in this folder
echo.
echo  20 slides x 7.5 seconds = 150 seconds total
echo  Format: MP4, Full HD 1080p, 30fps
echo.
echo  ================================================================
echo.

set "SCRIPT_DIR=%~dp0"
set "PS_SCRIPT=%SCRIPT_DIR%Export-VideoFromPPT.ps1"

if not exist "%PS_SCRIPT%" (
    echo  [ERROR] Export-VideoFromPPT.ps1 not found.
    pause
    exit /b 1
)

echo  [INFO] Running PowerPoint export script...
echo.

powershell -ExecutionPolicy Bypass -File "%PS_SCRIPT%"

echo.
echo  ================================================================
echo    If export succeeded, open: YogeshPortfolio_150sec.mp4
echo.
echo    MANUAL FALLBACK (if auto-export fails):
echo    1. Open YogeshPortfolio_Presentation.pptx in PowerPoint
echo    2. Click: File - Export - Create a Video
echo    3. Select: Full HD (1080p)
echo    4. Use: Recorded Timings and Narrations
echo    5. Seconds per slide: 7  (= ~150 sec total)
echo    6. Click Create Video
echo    7. Save as: YogeshPortfolio_150sec.mp4
echo  ================================================================
echo.
pause
exit /b 0
