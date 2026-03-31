@echo off
rmdir /s /q "app\gallery"
if exist "app\gallery" (
    echo Failed to delete gallery folder
    exit /b 1
) else (
    echo Gallery folder deleted successfully
    exit /b 0
)
