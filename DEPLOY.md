# Guide de Déploiement sur Vercel

## ✅ Préparation (Déjà fait)

- [x] Code TypeScript corrigé
- [x] Variables d'environnement configurées
- [x] Build test réussi
- [x] .gitignore configuré

## 📋 Étapes pour Déployer

### 1. Créer un compte Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Inscrivez-vous avec GitHub, GitLab ou Email

### 2. Créer un Repository Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Site ONG VISA DAM"
```

Puis créez un repository sur GitHub et poussez votre code :
```bash
git remote add origin https://github.com/votre-username/visa-dam-website.git
git branch -M main
git push -u origin main
```

### 3. Importer le Projet sur Vercel

1. Connectez-vous à [vercel.com](https://vercel.com/dashboard)
2. Cliquez sur **"Add New Project"**
3. Importez votre repository GitHub
4. Vercel détectera automatiquement Next.js

### 4. Configurer les Variables d'Environnement sur Vercel

Dans les paramètres du projet sur Vercel, ajoutez ces variables :

#### Variables Obligatoires :

```
NEXT_PUBLIC_SITE_URL=https://votre-site.vercel.app
NEXT_PUBLIC_SITE_NAME=ONG VISA DAM
```

#### Base de Données :

**Option A : Utiliser Vercel Postgres (Recommandé)**
1. Dans votre projet Vercel, allez dans l'onglet **"Storage"**
2. Créez une base de données **Postgres**
3. Vercel ajoutera automatiquement la variable `POSTGRES_URL`

**Option B : Utiliser votre propre base de données**
```
POSTGRES_URL=postgresql://user:password@host:5432/database
```

#### Stockage d'Images (Optionnel) :

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_wyY8Pjs3Mzxp6VeF_ZHjz4RwWGUo1DaRP57CL1JjlifCVBv
```

### 5. Déployer

Cliquez sur **"Deploy"** - Vercel va :
- Installer les dépendances
- Compiler le projet
- Déployer automatiquement

### 6. Après le Déploiement

#### Initialiser la Base de Données
La base de données sera automatiquement initialisée au premier accès grâce au code dans `lib/db.ts`.

#### Ajouter des Données
Vous pouvez :
1. Utiliser l'interface admin : `https://votre-site.vercel.app/admin`
2. Importer des données via des requêtes API

### 7. Domaine Personnalisé (Optionnel)

1. Allez dans **Settings** > **Domains**
2. Ajoutez votre domaine (ex: `visadam.org`)
3. Suivez les instructions pour configurer les DNS

## 🔄 Déploiements Automatiques

Après la configuration initiale, chaque fois que vous faites un `git push` :
- Vercel déploie automatiquement
- Les changements sont en ligne en 1-2 minutes

## 🛠️ Commandes Utiles

```bash
# Développement local
npm run dev

# Build de test
npm run build

# Démarrer en production locale
npm run start

# Push vers Git (déclenche un déploiement)
git add .
git commit -m "Description des changements"
git push
```

## ⚠️ Points Importants

1. **Ne jamais commit les fichiers .env.local** - Ils contiennent des secrets
2. **Toujours tester le build localement** avant de déployer
3. **Vérifier que la base de données est accessible** depuis Vercel
4. **Sauvegarder régulièrement** votre base de données

## 🆘 Résolution de Problèmes

### Erreur de connexion à la base de données
- Vérifiez que `POSTGRES_URL` est définie sur Vercel
- Vérifiez que votre base de données accepte les connexions externes
- Vérifiez que SSL est activé si nécessaire

### Erreur de build
- Regardez les logs sur Vercel
- Testez `npm run build` localement
- Vérifiez les erreurs TypeScript

### Images ne s'affichent pas
- Vérifiez que les chemins d'images sont corrects
- Utilisez Vercel Blob Storage pour les images uploadées

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- Documentation Next.js : https://nextjs.org/docs
- GitHub Issues : [Votre repository]

---

**Prêt à déployer !** 🚀
