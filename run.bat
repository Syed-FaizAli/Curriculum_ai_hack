@echo off
echo Starting Curriculum.ai...

:: Start Backend
echo Starting Django Backend...
start "Curriculum.ai Backend" cmd /k "cd backend && python manage.py runserver"

:: Wait a moment for backend to initialize
timeout /t 3 /nobreak >nul

:: Start Frontend
echo Starting React Frontend...
start "Curriculum.ai Frontend" cmd /k "npm run dev"

echo.
echo ===================================================
echo   Curriculum.ai is running! 🚀
echo.
echo   Frontend UI:  http://localhost:5173
echo   Backend API:  http://127.0.0.1:8000
echo.
echo   (Close the new terminal windows to stop servers)
echo ===================================================
echo.
pause
