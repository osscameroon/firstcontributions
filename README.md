<a id="english"></a>

# Your first open source contribution 🇨🇲

[English](#english) | [Français](#français)

Make your first open source contribution by adding yourself to the
**[OSS Cameroon contributors page](https://osscameroon.github.io/firstcontributions/)**.
After that, your profile there can list the issues and pull requests you work on, in any open source project.

You only need a [GitHub account](https://github.com/signup). Everything happens on the GitHub website,
so you don't need to install anything or use the command line.

## Add yourself (about 5 minutes)

1. **[Click here to create your file](https://github.com/osscameroon/firstcontributions/new/main/contributors?filename=YOUR-GITHUB-USERNAME.yml&value=github%3A+YOUR-GITHUB-USERNAME%0Aname%3A+Your+Name%0A%23+The+lines+below+are+optional.+Replace+the+example+values+or+delete+the+lines.%0Abio%3A+A+short+sentence+about+you.%0Alocation%3A+Your+city%2C+Country%0Awebsite%3A+https%3A%2F%2Fexample.com%0Acontributions%3A%0A++%23+Later%2C+list+issues+or+pull+requests+you+worked+on%2C+one+per+line%2C+like+this%3A%0A++%23+-+https%3A%2F%2Fgithub.com%2Fosscameroon%2Fjs-generator%2Fpull%2F1%0A).**
   GitHub opens an editor with a file that's already filled in with example values.
   You can also type your username on [the website](https://osscameroon.github.io/firstcontributions/) and
   click **Add me**, which fills in your username for you.
2. **Name the file after your GitHub username.** In the box at the top, replace `YOUR-GITHUB-USERNAME` with your username,
   for example `contributors/octocat.yml`. Keep the `.yml` at the end.
3. **Fill in your details.** Replace the example values with your own. Only `github` and `name` are required, so delete the
   lines you don't want:

   ```yaml
   github: octocat
   name: Mona Lisa Octocat
   bio: I build web apps and I'm learning Go.
   location: Yaoundé, Cameroon
   website: https://octocat.dev
   contributions:
   ```

4. **Click the green _Commit changes…_ button, then _Propose changes_.** GitHub makes your own copy of the project
   (a _fork_) and saves your file there.
5. **Click _Create pull request_** twice. That's your first contribution 🎉

A bot checks your file within a minute and leaves a comment on your pull request. If something needs fixing, the comment
tells you what to change and how. After your pull request is merged, your profile appears on the website
a few minutes later.

## List your open source contributions

Each time you open an issue or a pull request in an open source project, you can add it to your profile:

1. Open your file: `https://github.com/osscameroon/firstcontributions/blob/main/contributors/<your-username>.yml`
   (or click **Is this you? Add a contribution** on your profile page).
2. Click the ✏️ pencil icon to edit it.
3. Add the link under `contributions:`, on its own line, starting with two spaces and a dash:

   ```yaml
   contributions:
     - https://github.com/osscameroon/js-generator/pull/42
     - https://github.com/nodejs/node/issues/12345
   ```

4. Click **Commit changes…**, then **Propose changes**, then **Create pull request**.

The website shows each item's title and whether it is open, merged or closed, and updates every day.

## Fields

| Field           | Required | Description                                                       |
| --------------- | -------- | ----------------------------------------------------------------- |
| `github`        | yes      | Your GitHub username. It must match the file name.                |
| `name`          | yes      | Your name, up to 80 characters.                                   |
| `bio`           | no       | A short sentence about you, up to 280 characters.                 |
| `location`      | no       | Where you are, e.g. `Douala, Cameroon`.                           |
| `website`       | no       | A link starting with `https://`.                                  |
| `contributions` | no       | Links to GitHub issues or pull requests you worked on, one per line. |

## Common problems

- **"You can only add or edit your own file"**: the file name must be your GitHub username, e.g. `contributors/octocat.yml`.
- **"not valid YAML"**: each line must look like `field: value`. Each item in `contributions` must start with two spaces
  and a dash: `  - https://...`.
- **The file isn't in the `contributors` folder**: delete it and start again from the link in step 1.

To fix your pull request, open its **Files changed** tab, click **⋯** next to your file, then **Edit file**.

Stuck? Ask for help in a comment on your pull request. Someone from the community will help you.

---

## For maintainers

- **Website:** `npm run build` generates a static site in `dist/` from `contributors/*.yml`. The
  [deploy workflow](.github/workflows/deploy.yml) publishes it to GitHub Pages on every push to `main`, and once a day to
  refresh issue and pull request statuses. In _Settings → Pages_, set **Source** to **GitHub Actions**.
- **Pull request checks:** [check-contribution.yml](.github/workflows/check-contribution.yml) validates the changed files and
  comments with the result. It uses `pull_request_target`, so it runs on first-time contributors' pull requests without
  approval. For that reason it only parses the pull request's YAML files and never runs code from them. Keep it that way.
  Contributors can only change their own file; members and collaborators can change any file.
- **Auto-merge (optional):** set the repository variable `AUTO_MERGE` to `true` (_Settings → Secrets and variables →
  Actions → Variables_) to merge valid pull requests that only change the author's own contributor file. Turn on
  _Settings → Actions → General → Allow GitHub Actions to create and approve pull requests_ if merging fails.
- **Configuration:** the community name, repository and website URL are in [site.config.mjs](site.config.mjs).
  If you change the repository, update the link in step 1 (`npm test` reports when it's out of date).

### Develop locally

```sh
npm install
npm test                 # unit tests + checks every contributor file
npm run build:offline    # build without calling the GitHub API
npm run build            # build with issue/PR titles (set GITHUB_TOKEN to avoid rate limits)
python3 -m http.server -d dist 8000
```


---

## Français

[English](#english) | **Français**

Faites votre première contribution open source en vous ajoutant à la
**[page des contributeurs d'OSS Cameroon](https://osscameroon.github.io/firstcontributions/)**.
Ensuite, votre profil peut y lister les tickets et pull requests sur lesquels vous travaillez, dans n'importe quel projet open source.

Vous n'avez besoin que d'un [compte GitHub](https://github.com/signup). Tout se fait sur le site GitHub :
rien à installer, aucune ligne de commande.

## Ajoutez-vous (environ 5 minutes)

1. **[Cliquez ici pour créer votre fichier](https://github.com/osscameroon/firstcontributions/new/main/contributors?filename=YOUR-GITHUB-USERNAME.yml&value=github%3A+YOUR-GITHUB-USERNAME%0Aname%3A+Your+Name%0A%23+The+lines+below+are+optional.+Replace+the+example+values+or+delete+the+lines.%0Abio%3A+A+short+sentence+about+you.%0Alocation%3A+Your+city%2C+Country%0Awebsite%3A+https%3A%2F%2Fexample.com%0Acontributions%3A%0A++%23+Later%2C+list+issues+or+pull+requests+you+worked+on%2C+one+per+line%2C+like+this%3A%0A++%23+-+https%3A%2F%2Fgithub.com%2Fosscameroon%2Fjs-generator%2Fpull%2F1%0A).**).**
   GitHub ouvre un éditeur avec un fichier déjà rempli d'exemples.
   Vous pouvez aussi saisir votre nom d'utilisateur sur [le site](https://osscameroon.github.io/firstcontributions/) et
   cliquer sur **Add me**, qui remplit votre nom d'utilisateur pour vous.
2. **Nommez le fichier avec votre nom d'utilisateur GitHub.** Dans la boîte en haut, remplacez `YOUR-GITHUB-USERNAME` par votre
   nom d'utilisateur, par exemple `contributors/octocat.yml`. Gardez le `.yml` à la fin.
3. **Remplissez vos informations.** Remplacez les valeurs d'exemple par les vôtres. Seuls `github` et `name` sont requis ;
   supprimez les lignes que vous ne voulez pas :

   ```yaml
   github: octocat
   name: Mona Lisa Octocat
   bio: Je développe des applications web et j'apprends Go.
   location: Yaoundé, Cameroun
   website: https://octocat.dev
   contributions:
   ```

4. **Cliquez sur le bouton vert _Commit changes…_, puis _Propose changes_.** GitHub crée votre propre copie du projet
   (un _fork_) et y enregistre votre fichier.
5. **Cliquez sur _Create pull request_** deux fois. C'est votre première contribution 🎉

Un bot vérifie votre fichier dans la minute et laisse un commentaire sur votre pull request. Si quelque chose doit être
corrigé, le commentaire vous indique quoi changer et comment. Après la fusion de votre pull request, votre profil apparaît
sur le site quelques minutes plus tard.

## Listez vos contributions open source

Chaque fois que vous ouvrez un ticket ou un pull request dans un projet open source, vous pouvez l'ajouter à votre profil :

1. Ouvrez votre fichier : `https://github.com/osscameroon/firstcontributions/blob/main/contributors/<votre-nom-utilisateur>.yml`
   (ou cliquez sur **Is this you? Add a contribution** sur votre page de profil).
2. Cliquez sur l'icône ✏️ crayon pour le modifier.
3. Ajoutez le lien sous `contributions:`, sur sa propre ligne, en commençant par deux espaces et un tiret :

   ```yaml
   contributions:
     - https://github.com/osscameroon/js-generator/pull/42
     - https://github.com/nodejs/node/issues/12345
   ```

4. Cliquez sur **Commit changes…**, puis **Propose changes**, puis **Create pull request**.

Le site affiche le titre de chaque élément et son statut (ouvert, fusionné ou fermé), et se met à jour chaque jour.

## Champs

| Champ           | Requis | Description                                                          |
| --------------- | ------ | -------------------------------------------------------------------- |
| `github`        | oui    | Votre nom d'utilisateur GitHub. Il doit correspondre au nom du fichier. |
| `name`          | oui    | Votre nom, 80 caractères maximum.                                    |
| `bio`           | non    | Une courte phrase à votre sujet, 280 caractères maximum.             |
| `location`      | non    | Où vous vous trouvez, p. ex. `Douala, Cameroun`.                     |
| `website`       | non    | Un lien commençant par `https://`.                                   |
| `contributions` | non    | Liens vers les tickets ou pull requests GitHub auxquels vous avez participé, un par ligne. |

## Problèmes courants

- **« You can only add or edit your own file »** : le nom du fichier doit être votre nom d'utilisateur GitHub,
  p. ex. `contributors/octocat.yml`.
- **« not valid YAML »** : chaque ligne doit avoir la forme `champ: valeur`. Chaque élément de `contributions` doit commencer
  par deux espaces et un tiret : `  - https://...`.
- **Le fichier n'est pas dans le dossier `contributors`** : supprimez-le et recommencez depuis le lien de l'étape 1.

Pour corriger votre pull request, ouvrez son onglet **Files changed**, cliquez sur **⋯** à côté de votre fichier, puis
**Edit file**.

Bloqué ? Demandez de l'aide dans un commentaire sur votre pull request. Quelqu'un de la communauté vous aidera.

---

## Pour les mainteneurs

- **Site web :** `npm run build` génère un site statique dans `dist/` à partir de `contributors/*.yml`. Le
  [workflow de déploiement](.github/workflows/deploy.yml) le publie sur GitHub Pages à chaque push sur `main`, et une fois
  par jour pour rafraîchir les statuts des tickets et pull requests. Dans _Settings → Pages_, définissez **Source** sur
  **GitHub Actions**.
- **Checks des pull requests :** [check-contribution.yml](.github/workflows/check-contribution.yml) valide les fichiers
  modifiés et laisse un commentaire avec le résultat. Il utilise `pull_request_target`, il s'exécute donc sur les pull
  requests des premiers contributeurs sans approbation. Pour cette raison, il ne fait que parser le YAML des pull requests
  et n'exécute jamais de code issu de ceux-ci. Gardez-le ainsi. Les contributeurs ne peuvent modifier que leur propre
  fichier ; les membres et collaborateurs peuvent modifier n'importe quel fichier.
- **Auto-merge (optionnel) :** définissez la variable de dépôt `AUTO_MERGE` sur `true`
  (_Settings → Secrets and variables → Actions → Variables_) pour fusionner automatiquement les pull requests valides qui ne
  modifient que le fichier contributeur de leur auteur. Activez
  _Settings → Actions → General → Allow GitHub Actions to create and approve pull requests_ si la fusion échoue.
- **Configuration :** le nom de la communauté, le dépôt et l'URL du site sont dans [site.config.mjs](site.config.mjs).
  Si vous changez le dépôt, mettez à jour le lien de l'étape 1 (`npm test` signale quand il n'est plus à jour).

### Développer en local

```sh
npm install
npm test                 # tests unitaires + vérification de chaque fichier contributeur
npm run build:offline    # build sans appeler l'API GitHub
npm run build            # build avec les titres des tickets/PR (définissez GITHUB_TOKEN pour éviter les rate limits)
python3 -m http.server -d dist 8000
```
