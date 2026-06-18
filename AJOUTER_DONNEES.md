# 📝 Guide : Ajouter vos données au site

Votre site est maintenant **vierge** - aucune donnée par défaut.

## 🎯 Comment ajouter des données ?

### Option 1 : Via l'interface Admin (Recommandé) 🌟

1. **Déployez d'abord sur Vercel**
2. Allez sur `https://votre-site.vercel.app/admin`
3. Connectez-vous (si l'authentification est configurée)
4. Utilisez l'interface pour :
   - ✅ Ajouter des types de cancers
   - ✅ Ajouter des témoignages
   - ✅ Ajouter des articles de blog

---

### Option 2 : Modifier les fichiers JSON localement

#### 1. Ajouter un type de cancer

Éditez `data/cancers.json` :

```json
[
  {
    "id": "cancer-du-sein",
    "name": "Cancer du Sein",
    "color": "#FF1493",
    "image": "/images/cancer-du-sein.jpg",
    "shortDescription": "Le cancer du sein est le plus fréquent chez les femmes.",
    "description": "Description complète du cancer du sein...",
    "epidemiology": "Statistiques et données épidémiologiques...",
    "riskPopulation": "Femmes de plus de 50 ans...",
    "riskFactors": {
      "modifiable": [
        "Consommation d'alcool",
        "Surpoids et obésité",
        "Sédentarité"
      ],
      "nonModifiable": [
        "Âge",
        "Antécédents familiaux",
        "Mutations génétiques (BRCA1, BRCA2)"
      ]
    },
    "symptoms": {
      "early": [
        "Boule ou masse dans le sein",
        "Changement de forme du sein",
        "Écoulement du mamelon"
      ],
      "advanced": [
        "Douleurs osseuses",
        "Fatigue intense",
        "Perte de poids"
      ],
      "warningSign": [
        "Masse palpable qui grossit rapidement",
        "Rétraction ou ulcération de la peau",
        "Ganglions axillaires"
      ]
    },
    "screening": {
      "primaryPrevention": [
        "Activité physique régulière",
        "Alimentation équilibrée",
        "Limiter la consommation d'alcool"
      ],
      "availableTests": [
        "Mammographie",
        "Échographie mammaire",
        "IRM mammaire"
      ],
      "recommendations": [
        {
          "ageGroup": "40-49 ans",
          "frequency": "Tous les 2 ans",
          "tests": ["Mammographie", "Examen clinique"]
        },
        {
          "ageGroup": "50-74 ans",
          "frequency": "Tous les 2 ans",
          "tests": ["Mammographie"]
        }
      ],
      "resultsInterpretation": "Un résultat anormal nécessite des examens complémentaires...",
      "screeningCenters": [
        "Hôpitaux publics",
        "Centres de radiologie agréés",
        "Programme national de dépistage"
      ]
    },
    "testimonials": [],
    "resources": [
      {
        "title": "Guide du cancer du sein",
        "description": "Guide complet sur le dépistage et la prévention",
        "url": "https://example.com/guide",
        "type": "pdf"
      }
    ]
  }
]
```

#### 2. Ajouter un témoignage

Éditez `data/testimonials.json` :

```json
[
  {
    "id": "temoignage-1",
    "name": "Marie D.",
    "photo": "/images/testimonials/marie.jpg",
    "story": "Mon histoire avec le cancer du sein...",
    "message": "Le dépistage précoce m'a sauvé la vie.",
    "rating": 5,
    "date": "2024-01-15",
    "anonymous": false
  }
]
```

#### 3. Ajouter un article de blog

Éditez `data/blog.json` :

```json
[
  {
    "id": "article-1",
    "title": "L'importance du dépistage précoce",
    "slug": "importance-depistage-precoce",
    "excerpt": "Le dépistage précoce augmente considérablement les chances de guérison...",
    "content": "## Introduction\n\nLe dépistage précoce est crucial...\n\n## Les chiffres\n\nSelon l'OMS...",
    "image": "/images/blog/depistage.jpg",
    "author": "Dr. Sophie Martin",
    "publishedDate": "2024-02-20",
    "readTime": 5,
    "category": "Prévention",
    "tags": ["dépistage", "prévention", "santé"]
  }
]
```

#### 4. Redéployer

```bash
git add .
git commit -m "Ajout de données initiales"
git push
```

Vercel redéploie automatiquement en 2-3 minutes.

---

### Option 3 : Via l'API

Utilisez les endpoints API pour ajouter des données programmatiquement :

```javascript
// Ajouter un cancer
fetch('https://votre-site.vercel.app/api/cancers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 'cancer-du-sein',
    name: 'Cancer du Sein',
    // ... autres champs
  })
});
```

---

## 🗄️ Si vous utilisez Supabase

Une fois Supabase configuré sur Vercel :

1. Les données JSON ne seront utilisées que pour le build initial
2. Toutes les modifications via l'admin iront directement dans Supabase
3. Pas besoin de redéployer pour ajouter/modifier des données

---

## 📋 Structure des données

### Cancer (Obligatoire)
- `id` (string) : Identifiant unique (ex: "cancer-du-sein")
- `name` (string) : Nom du cancer
- `color` (string) : Couleur d'identification (hex)
- `description` (string) : Description complète

### Témoignage (Obligatoire)
- `id` (string) : Identifiant unique
- `name` (string) : Nom du témoin
- `story` (string) : Histoire complète
- `date` (string) : Date du témoignage

### Article de Blog (Obligatoire)
- `id` (string) : Identifiant unique
- `title` (string) : Titre de l'article
- `slug` (string) : URL friendly (ex: "mon-article")
- `content` (string) : Contenu (Markdown supporté)

---

## ✨ État actuel du site

🟢 **Site vierge et prêt**
- ✅ Zéro cancer
- ✅ Zéro témoignage
- ✅ Zéro article de blog

📝 **Prochaines étapes**
1. Déployez sur Vercel
2. Ajoutez vos données via l'admin ou JSON
3. Votre contenu apparaît instantanément !

---

## 🆘 Besoin d'exemples ?

Consultez les anciens commits Git pour voir des exemples de données complètes.

```bash
git log --oneline
git show <commit-hash>:data/cancers.json
```

---

**Votre site est prêt à recevoir vos données !** 🎉
