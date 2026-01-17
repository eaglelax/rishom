#!/bin/bash

# ===========================================
# Script de Déploiement - Rishom Group Website
# Pour LWS cPanel avec Node.js
# ===========================================

echo "=========================================="
echo "  Déploiement Rishom Group Website"
echo "=========================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Erreur: npm n'est pas installé${NC}"
    exit 1
fi

# Étape 1: Installation des dépendances
echo -e "\n${YELLOW}[1/5] Installation des dépendances...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de l'installation des dépendances${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dépendances installées${NC}"

# Étape 2: Build du frontend
echo -e "\n${YELLOW}[2/5] Build du frontend React...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors du build${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Frontend compilé${NC}"

# Étape 3: Vérifier le fichier .env
echo -e "\n${YELLOW}[3/5] Vérification de la configuration...${NC}"
if [ ! -f .env ]; then
    echo -e "${YELLOW}Attention: Fichier .env non trouvé${NC}"
    echo "Création à partir de .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}⚠ Modifiez le fichier .env avec vos paramètres${NC}"
    else
        echo -e "${RED}Erreur: .env.example non trouvé${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Fichier .env trouvé${NC}"
fi

# Étape 4: Initialiser/Mettre à jour la base de données
echo -e "\n${YELLOW}[4/5] Mise à jour de la base de données...${NC}"
npx drizzle-kit push
if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de la mise à jour de la base de données${NC}"
    echo "Vérifiez votre configuration DATABASE_URL dans .env"
    exit 1
fi
echo -e "${GREEN}✓ Base de données mise à jour${NC}"

# Étape 5: Créer le dossier uploads si nécessaire
echo -e "\n${YELLOW}[5/5] Configuration des dossiers...${NC}"
mkdir -p dist/public/uploads
chmod 755 dist/public/uploads
echo -e "${GREEN}✓ Dossier uploads configuré${NC}"

# Résumé
echo -e "\n=========================================="
echo -e "${GREEN}  Déploiement terminé avec succès !${NC}"
echo "=========================================="
echo ""
echo "Prochaines étapes :"
echo "1. Vérifiez/modifiez le fichier .env"
echo "2. Démarrez l'application : npm run start"
echo "3. Ou configurez PM2 : pm2 start server/index.ts --name rishom"
echo ""
echo "URL Admin : /admin/login"
echo "Identifiants par défaut : admin / admin123"
echo -e "${RED}⚠ Changez le mot de passe admin immédiatement !${NC}"
echo ""
