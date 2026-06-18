# 🚀 Configuration Vercel avec Supabase

## ✅ Étape 1 : Déployer sur Vercel (Mode JSON - Sans DB temporairement)

### Variables d'environnement à ajouter sur Vercel :

```env
NEXT_PUBLIC_SITE_URL=https://votre-site.vercel.app
NEXT_PUBLIC_SITE_NAME=ONG VISA DAM
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_wyY8Pjs3Mzxp6VeF_ZHjz4RwWGUo1DaRP57CL1JjlifCVBv
```

**⚠️ NE PAS ajouter `POSTGRES_URL` pour le moment**

Le site fonctionnera avec les données JSON.

---

## 🗄️ Étape 2 : Activer Supabase (Après le premier déploiement)

### A. Vérifier que votre projet Supabase est actif

1. Connectez-vous à [supabase.com](https://supabase.com/dashboard)
2. Ouvrez votre projet : `huovifksqzerybkzhunm`
3. Vérifiez qu'il est bien actif (statut "Active")

### B. Obtenir les bonnes URL de connexion

Dans votre projet Supabase :
1. Allez dans **Settings** → **Database**
2. Copiez la **Connection string** section "URI"
3. Remplacez `[YOUR-PASSWORD]` par votre vrai mot de passe : `1ppAcqd55gIb1jPj`

L'URL devrait ressembler à :
```
postgresql://postgres:[YOUR-PASSWORD]@db.huovifksqzerybkzhunm.supabase.co:5432/postgres
```

### C. Ajouter les variables Supabase sur Vercel

Dans les Environment Variables de votre projet Vercel, ajoutez :

```env
POSTGRES_URL=postgresql://postgres:1ppAcqd55gIb1jPj@db.huovifksqzerybkzhunm.supabase.co:5432/postgres

NEXT_PUBLIC_SUPABASE_URL=https://huovifksqzerybkzhunm.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1b3ZpZmtzcXplcnlia3podW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NzgyNjQsImV4cCI6MjA5NjU1NDI2NH0.HI-irqvtYR0c4FpWsbwEoQhnFYuu2H_N198XqqGU55o
```

### D. Redéployer

1. Après avoir ajouté les variables, Vercel redéploie automatiquement
2. OU cliquez sur **"Redeploy"** dans l'onglet Deployments

### E. Les tables seront créées automatiquement

Au premier accès, le code dans `lib/db.ts` va :
- Se connecter à Supabase
- Créer les tables : `cancers`, `testimonials`, `blog_posts`
- Initialiser la structure

---

## 🎯 Architecture Finale

```
Vercel (Hébergement)
  ↓
Next.js (Application)
  ↓
├── Supabase (Base de données PostgreSQL)
└── Vercel Blob (Stockage d'images)
```

---

## ⚠️ Si le DNS de Supabase ne fonctionne pas

Si vous obtenez `ENOTFOUND db.huovifksqzerybkzhunm.supabase.co`, cela signifie :
1. Le projet Supabase n'est pas encore complètement déployé (attendez 5-10 minutes)
2. Ou le projet a été suspendu/supprimé

**Solution :** Créez un nouveau projet Supabase et utilisez les nouvelles credentials.

---

## 📝 Ordre des Opérations

1. ✅ **MAINTENANT** : Déployer sur Vercel SANS `POSTGRES_URL`  
   → Site fonctionne avec JSON
   
2. ⏳ **Attendre 5-10 min** : Que Supabase soit complètement actif

3. ✅ **Ensuite** : Ajouter `POSTGRES_URL` + variables Supabase sur Vercel  
   → Redéployer
   → Base de données activée

4. ✅ **Utiliser l'admin** : https://votre-site.vercel.app/admin  
   → Ajouter/modifier des données

---

## 🆘 Problèmes Courants

### "ENOTFOUND db.huovifksqzerybkzhunm"
- Attendez que Supabase soit actif
- Vérifiez l'URL de connexion
- Essayez de créer un nouveau projet Supabase

### "tenant/user not found"
- L'URL a un mauvais format
- Utilisez l'URL exacte depuis Supabase Dashboard

### Build échoue sur Vercel
- Vérifiez que `POSTGRES_URL` n'est PAS défini (pour le premier déploiement)
- Le mode fallback JSON sera utilisé

---

## ✨ Avantages de cette approche

✅ **Déploiement immédiat** : Site en ligne avec données JSON  
✅ **Migration progressive** : Activez la DB quand vous êtes prêt  
✅ **Pas de downtime** : Le site marche toujours  
✅ **Fallback automatique** : Si la DB est down, utilise les JSON  

---

**Prêt à déployer !** 🎉
