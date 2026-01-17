@echo off
REM ===========================================
REM Script de Deploiement - Rishom Group Website
REM Pour Windows (avant upload sur LWS)
REM ===========================================

echo ==========================================
echo   Deploiement Rishom Group Website
echo ==========================================

REM Etape 1: Installation des dependances
echo.
echo [1/4] Installation des dependances...
call npm install
if %errorlevel% neq 0 (
    echo ERREUR: Installation des dependances echouee
    pause
    exit /b 1
)
echo [OK] Dependances installees

REM Etape 2: Build du frontend
echo.
echo [2/4] Build du frontend React...
call npm run build
if %errorlevel% neq 0 (
    echo ERREUR: Build echoue
    pause
    exit /b 1
)
echo [OK] Frontend compile

REM Etape 3: Verifier le fichier .env
echo.
echo [3/4] Verification de la configuration...
if not exist .env (
    echo Attention: Fichier .env non trouve
    if exist .env.example (
        copy .env.example .env
        echo Fichier .env cree - MODIFIEZ-LE avec vos parametres
    ) else (
        echo ERREUR: .env.example non trouve
        pause
        exit /b 1
    )
) else (
    echo [OK] Fichier .env trouve
)

REM Etape 4: Creer le dossier uploads
echo.
echo [4/4] Configuration des dossiers...
if not exist "dist\public\uploads" mkdir "dist\public\uploads"
echo [OK] Dossier uploads configure

REM Resume
echo.
echo ==========================================
echo   Deploiement termine avec succes !
echo ==========================================
echo.
echo Fichiers prets pour upload sur LWS :
echo - dist/           (frontend compile)
echo - server/         (backend Node.js)
echo - shared/         (schema DB)
echo - package.json
echo - .env            (a modifier sur le serveur)
echo - .htaccess
echo.
echo N'oubliez pas sur le serveur :
echo 1. npm install --production
echo 2. npx drizzle-kit push
echo 3. Configurer Node.js dans cPanel
echo.
pause
