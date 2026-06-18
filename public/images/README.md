# Guide des Images

## Structure des dossiers

```
public/
  ├── logo.png                    # Logo principal VISA DAM (à remplacer)
  └── images/
      └── cancers/                # Images des différents types de cancer
```

## Comment ajouter des images pour les cancers

### 1. Nommer vos fichiers d'image

Les noms de fichiers doivent correspondre aux chemins définis dans `data/cancers.json`.

Exemple dans `cancers.json` :
```json
{
  "id": "breast-cancer",
  "image": "/images/cancers/breast-cancer.jpg",
  ...
}
```

Le fichier doit être placé à : `public/images/cancers/breast-cancer.jpg`

### 2. Formats supportés

- JPG/JPEG (recommandé pour les photos)
- PNG (recommandé pour les illustrations)
- WebP (meilleure compression)

### 3. Taille recommandée

- **Largeur minimale** : 800px
- **Ratio** : 16:9 (par exemple 1280x720 ou 1920x1080)
- **Poids** : Optimisez vos images pour qu'elles ne dépassent pas 500KB

### 4. Liste des images à ajouter

Basé sur `data/cancers.json`, vous devez ajouter ces images :

- ✅ `/images/cancers/breast-cancer.jpg` - Cancer du Sein
- ✅ `/images/cancers/lung-cancer.jpg` - Cancer du Poumon
- ✅ `/images/cancers/cervical-cancer.jpg` - Cancer du Col de l'Utérus
- ✅ `/images/cancers/prostate-cancer.jpg` - Cancer de la Prostate
- ✅ `/images/cancers/colorectal-cancer.jpg` - Cancer Colorectal
- ✅ `/images/cancers/liver-cancer.jpg` - Cancer du Foie
- ... (selon vos données)

### 5. Si une image n'est pas disponible

Si vous n'avez pas d'image pour un cancer, le site affichera automatiquement :
- Un fond coloré avec le nom du cancer
- Pas d'erreur ne sera générée

### 6. Optimisation des images

Avant d'ajouter vos images, utilisez un outil d'optimisation comme :
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (pour Mac)

## Logo principal

Le logo VISA DAM doit être placé à : `public/logo.png`

**Attention** : Le fichier actuel est vide (0 bytes). Remplacez-le par votre vrai logo !
