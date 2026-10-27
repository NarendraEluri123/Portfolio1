# ============================================================
#  Export-VideoFromPPT.ps1
#  Exports YogeshPortfolio_Presentation.pptx -> MP4 (150 sec)
#  Uses PowerPoint COM automation (requires MS Office installed)
#
#  Trainer : Eluri Narendra | Agentic AI SDLC
#  Project : Yogesh Kumar Personal Portfolio — IBM Granite AI
#
#  Usage   : Right-click -> Run with PowerShell
#         OR: powershell -ExecutionPolicy Bypass -File Export-VideoFromPPT.ps1
# ============================================================

$Host.UI.RawUI.WindowTitle = "Yogesh Portfolio — Exporting 150-sec Video"

Write-Host ""
Write-Host "  ================================================" -ForegroundColor Cyan
Write-Host "   Yogesh Portfolio — PowerPoint to MP4 Export" -ForegroundColor Cyan
Write-Host "   IBM Granite Agentic AI | Trainer: Eluri Narendra" -ForegroundColor Cyan
Write-Host "  ================================================" -ForegroundColor Cyan
Write-Host ""

# ── Paths ────────────────────────────────────────────────────
$ScriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Definition
$PptxFile    = Join-Path $ScriptDir "YogeshPortfolio_Presentation.pptx"
$OutputVideo = Join-Path $ScriptDir "YogeshPortfolio_150sec.mp4"

# ── Check PPTX exists ────────────────────────────────────────
if (-not (Test-Path $PptxFile)) {
    Write-Host "  [ERROR] PPTX not found: $PptxFile" -ForegroundColor Red
    Write-Host "  Make sure YogeshPortfolio_Presentation.pptx is in the same folder." -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "  [INFO] Source : $PptxFile" -ForegroundColor Green
Write-Host "  [INFO] Output : $OutputVideo" -ForegroundColor Green
Write-Host "  [INFO] Duration: 150 seconds (20 slides x 7.5 sec each)" -ForegroundColor Green
Write-Host ""

# ── Check PowerPoint is installed ────────────────────────────
try {
    $ppt = New-Object -ComObject PowerPoint.Application
    Write-Host "  [INFO] Microsoft PowerPoint detected." -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] Microsoft PowerPoint is not installed or not accessible." -ForegroundColor Red
    Write-Host "  Please install Microsoft Office and retry." -ForegroundColor Yellow
    pause
    exit 1
}

# ── Export to MP4 ─────────────────────────────────────────────
try {
    Write-Host "  [INFO] Opening presentation..." -ForegroundColor Yellow
    $ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue

    $presentation = $ppt.Presentations.Open($PptxFile, $false, $false, $true)

    Write-Host "  [INFO] Exporting to MP4 at 1920x1080 (Full HD)..." -ForegroundColor Yellow
    Write-Host "  [INFO] This may take 60-120 seconds. Please wait..." -ForegroundColor Yellow
    Write-Host ""

    # ppMediaFormatMP4 = 3, Quality 85, 1920x1080, 30fps, UseTimingsAndNarrations = true
    # CreateVideoStatus: ppMediaTaskStatusInProgress = 1, ppMediaTaskStatusDone = 3, ppMediaTaskStatusFailed = 4
    $presentation.CreateVideo(
        $OutputVideo,    # Filename
        $true,           # UseTimingsAndNarrations
        7,               # DefaultSlideDuration (fallback 7 sec if no timing set)
        1920,            # VertResolution (width)
        30,              # FramesPerSecond
        85               # Quality (0-100)
    )

    # Poll until export is done (max 180 seconds wait)
    $maxWait  = 180
    $elapsed  = 0
    $interval = 3
    $dots     = ""

    while ($elapsed -lt $maxWait) {
        Start-Sleep -Seconds $interval
        $elapsed += $interval
        $dots += "."
        $status = $presentation.CreateVideoStatus
        Write-Host "  [WAIT] Exporting$dots  ($elapsed sec elapsed)  Status: $status" -ForegroundColor DarkYellow

        # ppMediaTaskStatusDone = 3
        if ($status -eq 3) {
            Write-Host ""
            Write-Host "  [DONE] Export complete!" -ForegroundColor Green
            break
        }
        # ppMediaTaskStatusFailed = 4
        if ($status -eq 4) {
            Write-Host ""
            Write-Host "  [FAIL] PowerPoint reported export failure." -ForegroundColor Red
            break
        }
    }

    $presentation.Close()
    $ppt.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null

    # Verify output file
    if (Test-Path $OutputVideo) {
        $size = [math]::Round((Get-Item $OutputVideo).Length / 1MB, 1)
        Write-Host ""
        Write-Host "  ================================================" -ForegroundColor Green
        Write-Host "   VIDEO EXPORTED SUCCESSFULLY!" -ForegroundColor Green
        Write-Host "  ================================================" -ForegroundColor Green
        Write-Host "   File    : YogeshPortfolio_150sec.mp4" -ForegroundColor White
        Write-Host "   Size    : $size MB" -ForegroundColor White
        Write-Host "   Duration: ~150 seconds" -ForegroundColor White
        Write-Host "   Slides  : 20 slides x 7.5 sec each" -ForegroundColor White
        Write-Host "   Format  : MP4 (H.264, 1080p, 30fps)" -ForegroundColor White
        Write-Host "  ================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Opening video..." -ForegroundColor Cyan
        Start-Process $OutputVideo
    } else {
        Write-Host "  [WARN] Output file not found. Export may have failed." -ForegroundColor Yellow
        Write-Host "  Try Option 2 below (manual export via PowerPoint UI)." -ForegroundColor Yellow
    }

} catch {
    Write-Host "  [ERROR] $_" -ForegroundColor Red
    try { if ($presentation) { $presentation.Close() } } catch {}
    try { if ($ppt) { $ppt.Quit() } } catch {}
}

Write-Host ""
Write-Host "  ================================================" -ForegroundColor DarkGray
Write-Host "   MANUAL EXPORT (if script fails):" -ForegroundColor DarkGray
Write-Host "   1. Open YogeshPortfolio_Presentation.pptx" -ForegroundColor DarkGray
Write-Host "   2. File -> Export -> Create a Video" -ForegroundColor DarkGray
Write-Host "   3. Quality: Full HD (1080p)" -ForegroundColor DarkGray
Write-Host "   4. Timing: Use Recorded Timings and Narrations" -ForegroundColor DarkGray
Write-Host "   5. Seconds each slide: 7 (total ~150 sec)" -ForegroundColor DarkGray
Write-Host "   6. Create Video -> Save as YogeshPortfolio_150sec.mp4" -ForegroundColor DarkGray
Write-Host "  ================================================" -ForegroundColor DarkGray
Write-Host ""
pause
