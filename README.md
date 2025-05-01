# Markdown Renderer

Ce projet est un simple rendu de fichiers Markdown en HTML à l'aide de JavaScript. Il permet de transformer un fichier Markdown en contenu HTML structuré et stylisé directement dans une page web.

## Fonctionnalités

- Transformation des titres Markdown (`#`, `##`, `###`, etc.) en balises HTML (`<h1>`, `<h2>`, `<h3>`, etc.).
- Support des listes non ordonnées (`-`, `*`) et ordonnées (`1.`, `2.`, etc.).
- Support des blocs de citation (`>`).
- Support des styles en ligne :
  - Gras (`**texte**`)
  - Italique (`*texte*`)
  - Souligné (`_texte_`)
  - Barré (`~~texte~~`)

## Utilisation

### Méthode local
1. Clonnez ce projet dans votre site. 
2. Incluez le script dans votre page
```javascript
    <script type="text/javascript" src="SimpleMarkDownConvert/main.js"></script>  
```
3. Ajoutez une `div` avec md="chemin/vers/votre/fichier.md" là où vous voullez mettre votre markdown
```html
<div class="markdown" md="chemin/vers/votre/fichier.md"></div>
```
4. (Optionel) Personnalisez avec cotre css.
```css
.markdown h1 {
    font-size: 100px;
    color: purple;
}
```

### Méthode distante
1. Incluez le script dans votre page (a partir de github)
```javascript
    <script type="text/javascript" src="https://raw.githubusercontent.com/Lasertie/Simple-MarkDown-JS-Convert/refs/heads/master/main.js"></script>  
```
2. Ajoutez une `div` avec md="chemin/vers/votre/fichier.md" là où vous voullez mettre votre markdown
```html
<div class="markdown" md="chemin/vers/votre/fichier.md"></div>
```
3. (Optionel) Personnalisez avec cotre css.
```css
.markdown h1 {  
    font-size: 100px;
    color: purple;
}
```

## Contributions

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request pour améliorer ce projet.

## Licence

Ce projet est sous licence LOC. Voir le fichier [LICENSE](LICENSE) pour plus de détails. Ou [loc.zyglonk.fr](https://loc.zyglonk.fr)
