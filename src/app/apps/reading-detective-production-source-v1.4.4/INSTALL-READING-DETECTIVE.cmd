@echo off
setlocal
cd /d "%~dp0"
echo.
echo Reading Detective v1.4.4 Production Build + Install
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0BUILD-AND-INSTALL-READING-DETECTIVE.ps1"
if errorlevel 1 (
  echo.
  echo INSTALL DID NOT COMPLETE. Read the error above.
  pause
  exit /b 1
)
echo.
echo Finished successfully.
pause
