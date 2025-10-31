@echo off
REM F.O.R.G.E. Pitch Deck Demo Script
echo ========================================
echo   F.O.R.G.E. PITCH DECK DEMO
echo ========================================
echo.
echo Opening pitch deck in your default browser...
echo.

REM Change to the correct directory
cd /d "%~dp0"

REM Open the pitch deck HTML file
start pitch.html

echo Pitch deck opened!
echo.
echo Navigate slides using arrow keys or the buttons on screen.
echo Press any key to exit this window (the browser will stay open)
pause >nul

