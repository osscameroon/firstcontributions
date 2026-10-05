/**
 * Translations for the site UI.
 * Keys are stable identifiers; values are the display strings.
 * To add a new language: copy the `en` block, change the key, and translate the values.
 */
export const translations = {
  en: {
    // Nav / footer
    nav_contributors: 'contributors',
    footer_built: 'Built by the',
    footer_community: 'community.',
    footer_improve: 'Want to improve this site?',
    footer_contributions: 'Contributions welcome',

    // Hero
    hero_h1: 'Your first open source contribution starts here',
    hero_lede:
      'Everyone on this page joined by adding a small file to our repository. It takes about five minutes, you only need a GitHub account, and there is nothing to install.',

    // Join form
    form_label: 'Your GitHub username',
    form_placeholder: 'e.g. octocat',
    form_button: 'Add me \u2192',
    form_hint: 'Opens GitHub with your file ready to fill in.',
    form_hint_link: 'How it works',

    // Stats
    stat_contributors: 'Contributors',
    stat_issues: 'Issues \u0026 PRs listed',
    stat_merged: 'Merged PRs',

    // Contributors section
    section_contributors_h2: 'Contributors',
    search_placeholder: 'Search by name, username or city',
    no_results: 'Nobody matches that search.',

    // How-to section
    how_h2: 'How to add yourself',
    how_step1:
      '<strong>Enter your username above</strong> and click <em>Add me</em>. GitHub opens an editor with your file, <code>contributors/your-username.yml</code>.',
    how_step2:
      '<strong>Fill in your name</strong> and, if you like, a short bio, your city and a website. Delete any line you don\u2019t want.',
    how_step3:
      '<strong>Click <em>Commit changes\u2026</em>, then <em>Propose changes</em>.</strong> GitHub makes your own copy of the project (a <em>fork</em>) for you.',
    how_step4:
      '<strong>Click <em>Create pull request</em>.</strong> A bot checks your file within a minute and tells you if anything needs fixing.',
    how_closing:
      'Once your pull request is merged, you appear here. Later, edit your file to list the issues and pull requests you work on in any open source project, and they show up on your profile.',

    // Profile page
    back_link: '\u2190 All contributors',
    profile_contributions_h2: 'Contributions',
    profile_add_button: 'Is this you? Add a contribution',
    profile_empty:
      'No contributions listed yet. Worked on an issue or a pull request?',
    profile_empty_link: 'Add it to your file',

    // Contribution pill labels
    pill_merged: 'Merged',
    pill_open: 'Open',
    pill_draft: 'Draft',
    pill_closed: 'Closed',
    pill_not_planned: 'Not planned',

    // 404 page
    not_found_h1: 'Page not found',
    not_found_link: 'Back to all contributors',
  },

  fr: {
    // Nav / footer
    nav_contributors: 'contributeurs',
    footer_built: 'Construit par la communauté',
    footer_community: '',
    footer_improve: 'Vous voulez améliorer ce site\u00a0?',
    footer_contributions: 'Les contributions sont les bienvenues',

    // Hero
    hero_h1: 'Votre première contribution open source commence ici',
    hero_lede:
      'Toutes les personnes sur cette page nous ont rejoints en ajoutant un petit fichier à notre dépôt. Cela prend environ cinq minutes, vous avez seulement besoin d\u2019un compte GitHub et il n\u2019y a rien à installer.',

    // Join form
    form_label: 'Votre pseudo GitHub',
    form_placeholder: 'ex. octocat',
    form_button: 'M\u2019ajouter \u2192',
    form_hint: 'Ouvre GitHub avec votre fichier prêt à remplir.',
    form_hint_link: 'Comment ça marche',

    // Stats
    stat_contributors: 'Contributeurs',
    stat_issues: 'Issues \u0026 PRs listées',
    stat_merged: 'PRs fusionnées',

    // Contributors section
    section_contributors_h2: 'Contributeurs',
    search_placeholder: 'Rechercher par nom, pseudo ou ville',
    no_results: 'Aucun résultat pour cette recherche.',

    // How-to section
    how_h2: 'Comment s\u2019ajouter',
    how_step1:
      '<strong>Saisissez votre pseudo ci-dessus</strong> et cliquez sur <em>M\u2019ajouter</em>. GitHub ouvre un éditeur avec votre fichier, <code>contributors/votre-pseudo.yml</code>.',
    how_step2:
      '<strong>Renseignez votre nom</strong> et, si vous le souhaitez, une courte bio, votre ville et un site web. Supprimez les lignes que vous ne voulez pas.',
    how_step3:
      '<strong>Cliquez sur <em>Commit changes\u2026</em>, puis <em>Propose changes</em>.</strong> GitHub crée votre propre copie du projet (un <em>fork</em>) pour vous.',
    how_step4:
      '<strong>Cliquez sur <em>Create pull request</em>.</strong> Un bot vérifie votre fichier en moins d\u2019une minute et vous indique si quelque chose doit être corrigé.',
    how_closing:
      'Une fois votre pull request fusionnée, vous apparaissez ici. Ensuite, modifiez votre fichier pour lister les issues et les pull requests sur lesquelles vous travaillez dans n\u2019importe quel projet open source\u00a0; elles s\u2019afficheront sur votre profil.',

    // Profile page
    back_link: '\u2190 Tous les contributeurs',
    profile_contributions_h2: 'Contributions',
    profile_add_button: 'C\u2019est vous\u00a0? Ajoutez une contribution',
    profile_empty:
      'Aucune contribution listée pour l\u2019instant. Vous avez travaillé sur une issue ou une pull request\u00a0?',
    profile_empty_link: 'Ajoutez-la à votre fichier',

    // Contribution pill labels
    pill_merged: 'Fusionnée',
    pill_open: 'Ouverte',
    pill_draft: 'Brouillon',
    pill_closed: 'Fermée',
    pill_not_planned: 'Non planifiée',

    // 404 page
    not_found_h1: 'Page introuvable',
    not_found_link: 'Retour aux contributeurs',
  },
};
