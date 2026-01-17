/**
 * Point d'entrée pour Phusion Passenger (LWS/cPanel)
 * Ce fichier charge et exécute le serveur TypeScript via tsx
 */

const { execSync } = require('child_process');
const path = require('path');

// Définir le répertoire de travail
process.chdir(__dirname);

// Charger tsx pour exécuter TypeScript
require('tsx/cjs');

// Charger le serveur
require('./server/index.ts');
