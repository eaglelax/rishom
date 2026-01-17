# Guide de Déploiement - Rishom Group Website

## Prérequis sur LWS cPanel

- Hébergement LWS avec cPanel
- Node.js (version 18+) activé via cPanel
- MySQL (inclus avec XAMPP/cPanel)
- Accès SSH (recommandé) ou File Manager

---

## Étape 1 : Préparation de la Base de Données

### 1.1 Créer la base de données MySQL

1. Connectez-vous à **cPanel**
2. Allez dans **Bases de données MySQL**
3. Créez une nouvelle base de données : `rishom` (ou `votrecompte_rishom`)
4. Créez un utilisateur MySQL avec un mot de passe fort
5. Associez l'utilisateur à la base de données avec **TOUS LES PRIVILÈGES**

### 1.2 Noter les informations de connexion

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=votrecompte_rishom
DB_USER=votrecompte_user
DB_PASSWORD=votre_mot_de_passe
```

---

## Étape 2 : Préparation des Fichiers

### 2.1 Build du projet en local

Exécutez ces commandes dans le dossier du projet :

```bash
# Installer les dépendances
npm install

# Build du frontend (React)
npm run build

# Le dossier dist/ contient les fichiers compilés
```

### 2.2 Fichiers à uploader

Uploadez ces fichiers/dossiers sur votre hébergement :

```
/public_html/rishom/
├── dist/                    # Frontend compilé (depuis client/)
│   └── public/
│       └── uploads/         # Images uploadées
├── server/                  # Backend Node.js
│   ├── routes.ts
│   ├── storage.ts
│   └── index.ts
├── shared/                  # Schéma partagé
│   └── schema.ts
├── package.json
├── package-lock.json
├── drizzle.config.ts
├── tsconfig.json
├── vite.config.ts
└── .env                     # Variables d'environnement (à créer)
```

---

## Étape 3 : Configuration sur le Serveur

### 3.1 Créer le fichier .env

Créez un fichier `.env` à la racine du projet sur le serveur :

```env
# Base de données MySQL
DATABASE_URL=mysql://votrecompte_user:votre_mot_de_passe@localhost:3306/votrecompte_rishom

# Port du serveur (vérifier avec LWS)
PORT=5000

# Environnement
NODE_ENV=production

# Session secret (générer une chaîne aléatoire)
SESSION_SECRET=votre_secret_aleatoire_très_long_et_complexe

# URL du site
SITE_URL=https://votredomaine.com
```

### 3.2 Installer les dépendances sur le serveur

Via SSH ou Terminal Node.js dans cPanel :

```bash
cd /home/votrecompte/public_html/rishom
npm install --production
```

### 3.3 Initialiser la base de données

```bash
# Pousser le schéma vers MySQL
npx drizzle-kit push
```

---

## Étape 4 : Configuration Node.js sur cPanel

### 4.1 Créer l'application Node.js

1. Dans cPanel, allez dans **Setup Node.js App**
2. Cliquez sur **Create Application**
3. Configurez :
   - **Node.js version** : 18.x ou supérieur
   - **Application mode** : Production
   - **Application root** : `/home/votrecompte/public_html/rishom`
   - **Application URL** : `votredomaine.com` ou `rishom.votredomaine.com`
   - **Application startup file** : `server/index.ts` (ou le fichier compilé)

### 4.2 Variables d'environnement

Dans la configuration Node.js de cPanel, ajoutez les variables d'environnement :

```
DATABASE_URL = mysql://votrecompte_user:password@localhost:3306/votrecompte_rishom
NODE_ENV = production
SESSION_SECRET = votre_secret
```

---

## Étape 5 : Configuration .htaccess

Créez un fichier `.htaccess` dans `/public_html/rishom/` :

```apache
# Redirection vers Node.js
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Ne pas rediriger les fichiers statiques
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d

    # Rediriger les requêtes API vers Node.js
    RewriteRule ^api/(.*)$ http://127.0.0.1:5000/api/$1 [P,L]

    # Rediriger tout le reste vers index.html (SPA)
    RewriteRule ^(?!api).*$ /dist/index.html [L]
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript text/xml application/xml
</IfModule>

# Cache des fichiers statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## Étape 6 : Démarrage de l'Application

### 6.1 Via cPanel Node.js

1. Allez dans **Setup Node.js App**
2. Trouvez votre application
3. Cliquez sur **Start App** ou **Restart**

### 6.2 Via SSH (si disponible)

```bash
cd /home/votrecompte/public_html/rishom

# Démarrer en production
npm run start

# Ou avec PM2 (recommandé)
pm2 start server/index.ts --name rishom
pm2 save
```

---

## Étape 7 : Vérification

1. Visitez `https://votredomaine.com`
2. Vérifiez que la page d'accueil s'affiche
3. Testez l'admin : `https://votredomaine.com/admin/login`
4. Connexion : `admin` / `admin123` (changez immédiatement après)

---

## Structure des Dossiers sur le Serveur

```
/home/votrecompte/
└── public_html/
    └── rishom/
        ├── .env                 # Variables d'environnement
        ├── .htaccess            # Configuration Apache
        ├── package.json
        ├── node_modules/        # Dépendances (après npm install)
        ├── dist/                # Frontend compilé
        │   ├── index.html
        │   ├── assets/
        │   └── public/
        │       └── uploads/     # Images uploadées
        ├── server/              # Backend
        └── shared/              # Schéma DB
```

---

## Dépannage

### Erreur 503 ou Application ne démarre pas

```bash
# Vérifier les logs
tail -f /home/votrecompte/logs/nodejs.log
```

### Erreur de connexion MySQL

- Vérifiez que l'utilisateur MySQL a les bons privilèges
- Vérifiez que `localhost` est utilisé (pas `127.0.0.1` sur certains hébergeurs)

### Erreur 404 sur les routes

- Vérifiez que le `.htaccess` est bien configuré
- Vérifiez que `mod_rewrite` est activé

### Images non affichées

- Vérifiez les permissions du dossier `uploads/` (755)
- Vérifiez que les chemins sont corrects

---

## Sauvegarde

### Base de données

```bash
# Export via cPanel > phpMyAdmin > Export
# Ou via SSH :
mysqldump -u votrecompte_user -p votrecompte_rishom > backup.sql
```

### Fichiers

```bash
# Sauvegarder le dossier uploads
tar -czf uploads_backup.tar.gz dist/public/uploads/
```

---

## Mise à Jour

1. Build en local : `npm run build`
2. Upload des nouveaux fichiers `dist/`
3. Si changement de schéma : `npx drizzle-kit push`
4. Redémarrer l'application Node.js dans cPanel

---

## Contacts Support

- **LWS Support** : https://www.lws.fr/contact.php
- **Documentation cPanel** : https://docs.cpanel.net/
