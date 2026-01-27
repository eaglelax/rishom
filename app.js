/**
 * Point d'entrée pour Phusion Passenger (LWS/cPanel)
 * Charge le serveur compilé depuis dist/index.cjs
 */

// Charger le serveur compilé
require('./dist/index.cjs');
