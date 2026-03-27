export type Locale = "en" | "de" | "fr" | "es" | "pt"

export const defaultLocale: Locale = "de"

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
}

export const localeFlags: Record<Locale, string> = {
  en: "GB",
  de: "DE",
  fr: "FR",
  es: "ES",
  pt: "PT",
}

export const translations = {
  en: {
    // App
    appName: "3-Minute Game",
    appTagline: "A practice of touch and consent",
    byBettyMartin: "by Betty Martin",

    // Navigation
    home: "Home",
    learn: "Learn",
    play: "Play",
    about: "About",
    language: "Language",

    // Home Screen
    welcomeTitle: "Welcome to the 3-Minute Game",
    welcomeSubtitle: "A simple practice to explore touch, consent, and connection with a partner",
    startGame: "Start Game",
    learnMore: "Learn the Basics",

    // Educational Content
    wheelOfConsentTitle: "The Wheel of Consent",
    wheelOfConsentDesc: "The Wheel of Consent helps us understand who is doing and who it is for.",
    twoQuestions: "Two Questions",
    question1: "How would you like me to touch you?",
    question1Desc: "This creates the Serve/Accept dynamic",
    question2: "How would you like to touch me?",
    question2Desc: "This creates the Take/Allow dynamic",

    // Quadrants
    quadrants: "The Four Quadrants",
    serve: "Serve",
    serveDesc: "You are doing, for them. A gift of action.",
    accept: "Accept",
    acceptDesc: "They are doing, for you. Receiving a gift.",
    take: "Take",
    takeDesc: "They are doing, for themselves. Taking what they want.",
    allow: "Allow",
    allowDesc: "You are giving access. Allowing them to take.",

    // Game Flow
    gameIntro: "Game Introduction",
    gameIntroText: "The 3-Minute Game is a structured practice that helps partners explore touch and consent. Each round lasts 3 minutes and focuses on a different dynamic.",
    introTime: "4 x 3 Minutes",
    introTimeDesc: "Each round lasts 3 minutes, exploring a different dynamic.",
    introBothPlay: "Both Partners Play",
    introBothPlayDesc: "You will each take turns in all four roles.",
    introTouch: "Touch with Intention",
    introTouchDesc: "Focus on the quality of touch and your experience.",
    howItWorks: "How it works:",
    introStep1: "Partner A asks:",
    introStep2: "Partner B answers, then A serves for 3 minutes",
    introStep3: "Partner A asks:",
    introStep4: "Partner B answers, then B takes for 3 minutes",
    introStep5: "Switch roles and repeat",
    choosePartner: "Choose who goes first",
    partnerA: "Partner A",
    partnerB: "Partner B",
    round: "Round",
    of: "of",

    // Round Instructions
    round1Title: "Round 1: Serve & Accept",
    round1Question: "How would you like me to touch you?",
    round1GiverRole: "You will SERVE",
    round1GiverDesc: "Touch your partner how THEY want to be touched. This is your gift to them.",
    round1ReceiverRole: "You will ACCEPT",
    round1ReceiverDesc: "Receive the touch. Notice what it feels like to be served.",

    round2Title: "Round 2: Take & Allow",
    round2Question: "How would you like to touch me?",
    round2GiverRole: "You will ALLOW",
    round2GiverDesc: "Give your partner access to touch you how THEY want. This is your gift to them.",
    round2ReceiverRole: "You will TAKE",
    round2ReceiverDesc: "Touch your partner how YOU want. Notice what it feels like to take.",

    // Timer
    timeRemaining: "Time Remaining",
    pause: "Pause",
    resume: "Resume",
    skip: "Skip",
    nextRound: "Next Round",
    switchRoles: "Switch Roles",
    complete: "Complete",

    // End Screen
    gameComplete: "Game Complete",
    gameCompleteText: "Thank you for practicing together. Take a moment to share what you noticed.",
    reflectionPrompts: "Reflection Prompts",
    reflection1: "What was it like to receive?",
    reflection2: "What was it like to give?",
    reflection3: "Which role felt most comfortable?",
    reflection4: "What surprised you?",
    playAgain: "Play Again",
    returnHome: "Return Home",

    // Settings
    soundOn: "Sound On",
    soundOff: "Sound Off",
    vibrationOn: "Vibration On",
    vibrationOff: "Vibration Off",
    keepScreenOn: "Keep Screen On",
    keepScreenOnOff: "Allow Screen Sleep",

    // About
    aboutTitle: "About the 3-Minute Game",
    aboutText: "The 3-Minute Game was created by Betty Martin as part of her work on the Wheel of Consent. It is a practice designed to help people explore touch, boundaries, and consent in a structured and safe way.",
    learnMoreLink: "Learn more at wheelofconsent.org",
    footerText: "Based on the Wheel of Consent by Betty Martin",
    
    // Key Concepts
    keyConceptsTitle: "Key Concepts",
    forWhom: "The Key Question: For Whom?",
    forWhomDesc: "The essential distinction is always: WHO is it for? This determines whether you are in the giving or receiving half of the wheel.",
    pleasureDesc: "Pleasure is a physiological state. Your nervous system knows how to get there. You cannot force it - you can only follow it.",
    followPleasure: "Follow pleasure. Don't tell it where it should be!",
    
    // Tips for Roles
    tipsTitle: "Tips",
    tipsTaking: "Taking Tips",
    tipsTakingList: "Ask clearly for what YOU want|Stay within agreed boundaries|Focus on the sensations in YOUR hands|Say 'Thank you' at the end - it reminds you who it was for",
    tipsAllowing: "Allowing Tips",
    tipsAllowingList: "Take responsibility for your own boundaries|You are giving the gift of access|Check in with yourself: Can I give this wholeheartedly?|Say 'You're welcome' - you made the gift",
    tipsServing: "Serving Tips",
    tipsServingList: "Ask: How would you like me to touch you?|Do exactly what they asked for|Let go of any technique or agenda|The gift is your action AND the space you create",
    tipsAccepting: "Accepting Tips",
    tipsAcceptingList: "Take time to feel what you REALLY want right now|Describe it as precisely as possible|Speak up immediately if you want something different|It is 100% for you",
    
    // Deeper Understanding
    deeperTitle: "Deeper Understanding",
    giftOfTaking: "The Gift in Taking",
    giftOfTakingDesc: "When you take, you are receiving the gift of ACCESS to your partner. The gift is not what you do - it's the permission to explore for your own pleasure.",
    giftOfServing: "The Gift in Serving",
    giftOfServingDesc: "As a server, you are not giving pleasure - you are contributing to your partner's experience. The real gift is your time and attention, while setting aside your own preferences.",
    qualityOfTouch: "Quality of Touch",
    qualityOfTouchDesc: "What makes touch wonderful is not technique, but how present and relaxed you are in the moment. Hands on a mission feel tense - relaxed hands feel completely different.",
    
    // Practice Reminders
    practiceReminder: "Practice Tip",
    practiceReminderText: "Play the game regularly over weeks as a separate practice, not as a prelude to intimacy. Approach it with curiosity as an experiment.",

    // Common
    continue: "Continue",
    back: "Back",
    close: "Close",
    ready: "Ready",
    begin: "Begin",
    
    // Additional Game Text
    whoAsksFirst: "Who will ask the first question?",
    asks: "asks",
    discussAndAgree: "Take a moment to discuss and agree on what touch will happen, then start the timer when you are both ready.",
    greatWork: "Great work!",
    nowItsTurn: "Now it is {name}&apos;s turn to ask the questions.",
    enterNames: "Enter Names",
    enterNamesDesc: "Personalize the game with your names (optional)",
    nameA: "First person",
    nameB: "Second person",
    namePlaceholderA: "Name or Partner A",
    namePlaceholderB: "Name or Partner B",
  },
  de: {
    // App
    appName: "3-Minuten-Spiel",
    appTagline: "Eine Praxis von Berührung und Einverständnis",
    byBettyMartin: "von Betty Martin",

    // Navigation
    home: "Start",
    learn: "Lernen",
    play: "Spielen",
    about: "Über",
    language: "Sprache",

    // Home Screen
    welcomeTitle: "Willkommen zum 3-Minuten-Spiel",
    welcomeSubtitle: "Eine einfache Übung, um Berührung, Einverständnis und Verbindung mit einem Partner zu erkunden",
    startGame: "Spiel starten",
    learnMore: "Grundlagen lernen",
    onboardingWelcomeTitle: "Schön, dass ihr da seid.",
    onboardingWelcomeBody: "Willkommen im 3-Minuten-Spiel. Diese Praxis wird besonders kraftvoll, wenn ihr euch zuerst mit den Grundlagen vertraut macht.",
    onboardingWheelHint: "Falls euch das Wheel of Consent noch nicht vertraut ist, nehmt euch bitte zuerst Zeit für die Anleitung. So startet ihr sicher, klar und mit mehr Freude.",
    onboardingLearnCta: "Grundlagen jetzt lesen",
    onboardingSkipCta: "Direkt zum Spiel",

    // Educational Content
    wheelOfConsentTitle: "Konsens-Rad",
    wheelOfConsentDesc: "Das Rad des Einverständnisses hilft uns zu verstehen, wer handelt und für wen es ist.",
    learnWelcomeTitle: "Grundlagen, die den Unterschied machen",
    learnWelcomeBody: "Das 3-Minuten-Spiel lebt nicht von Technik, sondern von Klarheit, Präsenz und echter Wahl. Je besser ihr die Grundlagen versteht, desto freier und angenehmer wird eure Erfahrung.",
    learnTwoQuestionsHelp: "Diese beiden Fragen öffnen zwei unterschiedliche Dynamiken. Achtet bei jeder Antwort bewusst darauf, für wen die Berührung in diesem Moment ist.",
    twoQuestions: "Zwei Fragen",
    question1: "Wie möchtest du, dass ich dich berühre?",
    question1Desc: "Dies erzeugt die Dienen/Annehmen-Dynamik",
    question2: "Wie möchtest du mich berühren?",
    question2Desc: "Dies erzeugt die Nehmen/Erlauben-Dynamik",

    // Quadrants
    quadrants: "Die vier Quadranten",
    serve: "Dienen",
    serveDesc: "Du handelst, für sie/ihn. Ein Geschenk der Handlung.",
    accept: "Annehmen",
    acceptDesc: "Sie/er handelt, für dich. Ein Geschenk empfangen.",
    take: "Nehmen",
    takeDesc: "Sie/er handelt, für sich selbst. Nehmen was sie/er will.",
    allow: "Erlauben",
    allowDesc: "Du gibst Zugang. Erlaubst ihnen zu nehmen.",

    // Game Flow
    gameIntro: "Spieleinführung",
    gameIntroText: "Das 3-Minuten-Spiel ist eine strukturierte Übung, die Partnern hilft, Berührung und Einverständnis zu erkunden. Jede Runde dauert 3 Minuten und konzentriert sich auf eine andere Dynamik.",
    introTime: "4 x 3 Minuten",
    introTimeDesc: "Jede Runde dauert 3 Minuten und erkundet eine andere Dynamik.",
    introBothPlay: "Beide Partner spielen",
    introBothPlayDesc: "Ihr werdet abwechselnd alle vier Rollen einnehmen.",
    introTouch: "Berührung mit Absicht",
    introTouchDesc: "Konzentriert euch auf die Qualität der Berührung und euer Erleben.",
    howItWorks: "So funktioniert es:",
    introStep1: "Partner A fragt:",
    introStep2: "Partner B antwortet, dann dient A für 3 Minuten",
    introStep3: "Partner A fragt:",
    introStep4: "Partner B antwortet, dann nimmt B für 3 Minuten",
    introStep5: "Rollen tauschen und wiederholen",
    choosePartner: "Wer beginnt?",
    partnerA: "Partner A",
    partnerB: "Partner B",
    round: "Runde",
    of: "von",

    // Round Instructions
    round1Title: "Runde 1: Dienen & Annehmen",
    round1Question: "Wie möchtest du, dass ich dich berühre?",
    round1GiverRole: "Du wirst DIENEN",
    round1GiverDesc: "Berühre deinen Partner so, wie ER/SIE berührt werden möchte. Dies ist dein Geschenk an sie/ihn.",
    round1ReceiverRole: "Du wirst ANNEHMEN",
    round1ReceiverDesc: "Empfange die Berührung. Bemerke, wie es sich anfühlt, bedient zu werden.",

    round2Title: "Runde 2: Nehmen & Erlauben",
    round2Question: "Wie möchtest du mich berühren?",
    round2GiverRole: "Du wirst ERLAUBEN",
    round2GiverDesc: "Gib deinem Partner Zugang, dich zu berühren, wie ER/SIE es möchte. Dies ist dein Geschenk an sie/ihn.",
    round2ReceiverRole: "Du wirst NEHMEN",
    round2ReceiverDesc: "Berühre deinen Partner, wie DU es möchtest. Bemerke, wie es sich anfühlt zu nehmen.",

    // Timer
    timeRemaining: "Verbleibende Zeit",
    pause: "Pause",
    resume: "Fortsetzen",
    skip: "Überspringen",
    nextRound: "Nächste Runde",
    switchRoles: "Rollen tauschen",
    complete: "Fertig",

    // End Screen
    gameComplete: "Spiel beendet",
    gameCompleteText: "Danke fürs gemeinsame Üben. Nehmt euch einen Moment, um zu teilen, was ihr bemerkt habt.",
    reflectionPrompts: "Reflexionsfragen",
    reflection1: "Wie war es zu empfangen?",
    reflection2: "Wie war es zu geben?",
    reflection3: "Welche Rolle fühlte sich am wohlsten an?",
    reflection4: "Was hat dich überrascht?",
    playAgain: "Nochmal spielen",
    returnHome: "Zurück zum Start",

    // Settings
    soundOn: "Ton an",
    soundOff: "Ton aus",
    vibrationOn: "Vibration an",
    vibrationOff: "Vibration aus",
    keepScreenOn: "Bildschirm anhalten",
    keepScreenOnOff: "Bildschirm darf ausgehen",

    // About
    aboutTitle: "Über das 3-Minuten-Spiel",
    aboutText: "Das 3-Minuten-Spiel wurde von Betty Martin als Teil ihrer Arbeit am Rad des Einverständnisses entwickelt. Es ist eine Übung, die Menschen helfen soll, Berührung, Grenzen und Einverständnis auf strukturierte und sichere Weise zu erkunden.",
    learnMoreLink: "Mehr erfahren auf wheelofconsent.org",
    footerText: "Basierend auf dem Rad des Einverständnisses von Betty Martin",
    
    // Key Concepts
    keyConceptsTitle: "Wichtige Konzepte",
    forWhom: "Die Kernfrage: Für wen?",
    forWhomDesc: "Die wesentliche Unterscheidung ist immer: FÜR WEN ist es? Das bestimmt, ob du in der Geben- oder Bekommen-Hälfte des Rades bist.",
    pleasureDesc: "Genuss ist ein physiologischer Zustand. Dein Nervensystem weiß, wie man ihn erreichen kann. Du kannst ihn nicht forcieren - du kannst ihm nur folgen.",
    followPleasure: "Folge dem Vergnügen. Sage ihm nicht, wo es sein sollte!",
    
    // Tips for Roles
    tipsTitle: "Tipps",
    tipsTaking: "Tipps fürs Nehmen",
    tipsTakingList: "Frage klar nach dem, was DU möchtest|Bleibe innerhalb der vereinbarten Grenzen|Fokussiere auf die Empfindungen in DEINEN Händen|Sage 'Danke' am Ende - es erinnert dich, für wen es war",
    tipsAllowing: "Tipps fürs Erlauben",
    tipsAllowingList: "Übernimm die Verantwortung für deine eigenen Grenzen|Du gibst das Geschenk des Zugriffs|Frage dich: Kann ich das von ganzem Herzen geben?|Sage 'Gern geschehen' - du hast das Geschenk gemacht",
    tipsServing: "Tipps fürs Dienen",
    tipsServingList: "Frage: Wie möchtest du, dass ich dich berühre?|Tue genau das, worum gebeten wurde|Lass jede Technik oder Agenda los|Das Geschenk ist deine Handlung UND der Raum, den du schaffst",
    tipsAccepting: "Tipps fürs Annehmen",
    tipsAcceptingList: "Nimm dir Zeit zu spüren, was du WIRKLICH GENAU JETZT willst|Beschreibe es so genau wie möglich|Sage sofort, wenn du etwas anderes möchtest|Es ist zu 100% für dich",
    
    // Deeper Understanding
    deeperTitle: "Tieferes Verständnis",
    giftOfTaking: "Das Geschenk beim Nehmen",
    giftOfTakingDesc: "Wenn du nimmst, empfängst du das Geschenk des ZUGRIFFS auf deinen Partner. Das Geschenk ist nicht, was du tust - es ist die Erlaubnis, für dein eigenes Vergnügen zu erkunden.",
    giftOfServing: "Das Geschenk beim Dienen",
    giftOfServingDesc: "Als Dienender gibst du nicht Vergnügen - du trägst zur Erfahrung deines Partners bei. Das eigentliche Geschenk ist deine Zeit und Aufmerksamkeit, während du deine eigenen Vorlieben beiseite lässt.",
    qualityOfTouch: "Qualität der Berührung",
    qualityOfTouchDesc: "Was Berührung wundervoll macht, ist nicht Technik, sondern wie präsent und entspannt du im Moment bist. Hände auf Mission fühlen sich angespannt an - entspannte Hände fühlen sich völlig anders an.",
    
    // Practice Reminders
    practiceReminder: "Übungstipp",
    practiceReminderText: "Spiele das Spiel regelmäßig über Wochen als separate Übung, nicht als Vorspiel zu Intimität. Betrachte es mit Neugier als ein Experiment.",
    learnSelectedRole: "Aktiv ausgewählte Rolle",
    learnWheelWhoActs: "Wer handelt:",
    learnWheelForWhom: "Für wen ist es:",
    learnWheelGiftLabel: "Das Geschenk:",
    learnWheelYouAct: "Du handelst aktiv.",
    learnWheelPartnerActs: "Die andere Person handelt aktiv.",
    learnWheelForYou: "Die Berührung ist für dich.",
    learnWheelForPartner: "Die Berührung ist für die andere Person.",
    learnWheelAnchorServe: "Ich tue es für dich.",
    learnWheelAnchorAccept: "Du tust es für mich.",
    learnWheelAnchorTake: "Ich tue es für mich.",
    learnWheelAnchorAllow: "Du tust es für dich.",
    learnWheelGiftServe: "Deine Handlung und Aufmerksamkeit, ohne eigene Agenda.",
    learnWheelGiftAccept: "Dein klares Empfangen dessen, was du wirklich möchtest.",
    learnWheelGiftTake: "Der Zugang zum Körper der anderen Person, innerhalb klarer Grenzen.",
    learnWheelGiftAllow: "Der bewusste Zugang zu deinem Körper als freiwilliges Geschenk.",
    learnWheelAxisActionTitle: "Achse: Wer handelt?",
    learnWheelAxisActionBody: "Unterscheidet zwischen: Ich tue etwas oder die andere Person tut etwas.",
    learnWheelAxisBenefitTitle: "Achse: Für wen ist es?",
    learnWheelAxisBenefitBody: "Unterscheidet zwischen: Es ist für mich oder für die andere Person.",
    learnPrinciplesIntro: "Die Qualität eurer Erfahrung wächst, wenn ihr diese Prinzipien während des Spiels aktiv erinnert.",
    learnPrinciplePleasureTitle: "Dem Vergnügen folgen",
    learnPrinciplePleasureBody: "Genuss ist ein physiologischer Zustand. Ihr könnt ihn nicht erzwingen, aber ihr könnt langsamer werden, spüren und ihm folgen.",
    learnPrinciplePresenceTitle: "Präsenz vor Technik",
    learnPrinciplePresenceBody: "Gute Berührung entsteht aus Achtsamkeit, entspannten Händen und klarer Kommunikation - nicht aus perfekter Technik.",
    learnPracticeTitle: "So übt ihr nachhaltig",
    learnPracticeBody: "Übt die Rollen in der vorgesehenen Reihenfolge und wiederholt sie regelmäßig. Das Spiel ist eine eigene Praxis und kein Leistungscheck.",

    // Common
    continue: "Weiter",
    back: "Zurück",
    close: "Schließen",
    ready: "Bereit",
    begin: "Beginnen",
    
    // Additional Game Text
    whoAsksFirst: "Wer stellt die erste Frage?",
    asks: "fragt",
    discussAndAgree: "Nehmt euch einen Moment, um zu besprechen und zu vereinbaren, welche Berührung stattfinden wird. Startet dann den Timer, wenn ihr beide bereit seid.",
    greatWork: "Gut gemacht!",
    nowItsTurn: "Jetzt ist {name} dran, die Fragen zu stellen.",
    enterNames: "Namen eingeben",
    enterNamesDesc: "Personalisiert das Spiel mit euren Namen (optional)",
    nameA: "Erste Person",
    nameB: "Zweite Person",
    namePlaceholderA: "Name oder Partner A",
    namePlaceholderB: "Name oder Partner B",
  },
  fr: {
    // App
    appName: "Jeu des 3 Minutes",
    appTagline: "Une pratique du toucher et du consentement",
    byBettyMartin: "par Betty Martin",

    // Navigation
    home: "Accueil",
    learn: "Apprendre",
    play: "Jouer",
    about: "À propos",
    language: "Langue",

    // Home Screen
    welcomeTitle: "Bienvenue au Jeu des 3 Minutes",
    welcomeSubtitle: "Une pratique simple pour explorer le toucher, le consentement et la connexion avec un partenaire",
    startGame: "Commencer le jeu",
    learnMore: "Apprendre les bases",

    // Educational Content
    wheelOfConsentTitle: "La Roue du Consentement",
    wheelOfConsentDesc: "La Roue du Consentement nous aide à comprendre qui agit et pour qui.",
    twoQuestions: "Deux Questions",
    question1: "Comment aimerais-tu que je te touche ?",
    question1Desc: "Cela crée la dynamique Servir/Accepter",
    question2: "Comment aimerais-tu me toucher ?",
    question2Desc: "Cela crée la dynamique Prendre/Permettre",

    // Quadrants
    quadrants: "Les Quatre Quadrants",
    serve: "Servir",
    serveDesc: "Tu agis, pour l'autre. Un cadeau d'action.",
    accept: "Accepter",
    acceptDesc: "L'autre agit, pour toi. Recevoir un cadeau.",
    take: "Prendre",
    takeDesc: "L'autre agit, pour lui-même. Prendre ce qu'il veut.",
    allow: "Permettre",
    allowDesc: "Tu donnes accès. Tu lui permets de prendre.",

    // Game Flow
    gameIntro: "Introduction au Jeu",
    gameIntroText: "Le Jeu des 3 Minutes est une pratique structurée qui aide les partenaires à explorer le toucher et le consentement. Chaque tour dure 3 minutes et se concentre sur une dynamique différente.",
    introTime: "4 x 3 Minutes",
    introTimeDesc: "Chaque tour dure 3 minutes et explore une dynamique différente.",
    introBothPlay: "Les deux partenaires jouent",
    introBothPlayDesc: "Vous jouerez chacun tous les quatre rôles à tour de rôle.",
    introTouch: "Toucher avec intention",
    introTouchDesc: "Concentrez-vous sur la qualité du toucher et votre expérience.",
    howItWorks: "Comment ça marche :",
    introStep1: "Partenaire A demande :",
    introStep2: "Partenaire B répond, puis A sert pendant 3 minutes",
    introStep3: "Partenaire A demande :",
    introStep4: "Partenaire B répond, puis B prend pendant 3 minutes",
    introStep5: "Échanger les rôles et répéter",
    choosePartner: "Qui commence ?",
    partnerA: "Partenaire A",
    partnerB: "Partenaire B",
    round: "Tour",
    of: "sur",

    // Round Instructions
    round1Title: "Tour 1 : Servir & Accepter",
    round1Question: "Comment aimerais-tu que je te touche ?",
    round1GiverRole: "Tu vas SERVIR",
    round1GiverDesc: "Touche ton partenaire comme IL/ELLE veut être touché(e). C'est ton cadeau pour lui/elle.",
    round1ReceiverRole: "Tu vas ACCEPTER",
    round1ReceiverDesc: "Reçois le toucher. Observe ce que ça fait d'être servi(e).",

    round2Title: "Tour 2 : Prendre & Permettre",
    round2Question: "Comment aimerais-tu me toucher ?",
    round2GiverRole: "Tu vas PERMETTRE",
    round2GiverDesc: "Donne à ton partenaire l'accès pour te toucher comme IL/ELLE le veut. C'est ton cadeau pour lui/elle.",
    round2ReceiverRole: "Tu vas PRENDRE",
    round2ReceiverDesc: "Touche ton partenaire comme TU le veux. Observe ce que ça fait de prendre.",

    // Timer
    timeRemaining: "Temps restant",
    pause: "Pause",
    resume: "Reprendre",
    skip: "Passer",
    nextRound: "Tour suivant",
    switchRoles: "Échanger les rôles",
    complete: "Terminé",

    // End Screen
    gameComplete: "Jeu terminé",
    gameCompleteText: "Merci d'avoir pratiqué ensemble. Prenez un moment pour partager ce que vous avez remarqué.",
    reflectionPrompts: "Questions de réflexion",
    reflection1: "Comment c'était de recevoir ?",
    reflection2: "Comment c'était de donner ?",
    reflection3: "Quel rôle était le plus confortable ?",
    reflection4: "Qu'est-ce qui t'a surpris(e) ?",
    playAgain: "Rejouer",
    returnHome: "Retour à l'accueil",

    // Settings
    soundOn: "Son activé",
    soundOff: "Son désactivé",
    vibrationOn: "Vibration activée",
    vibrationOff: "Vibration désactivée",

    // About
    aboutTitle: "À propos du Jeu des 3 Minutes",
    aboutText: "Le Jeu des 3 Minutes a été créé par Betty Martin dans le cadre de son travail sur la Roue du Consentement. C'est une pratique conçue pour aider les gens à explorer le toucher, les limites et le consentement de manière structurée et sécurisée.",
    learnMoreLink: "En savoir plus sur wheelofconsent.org",
    footerText: "Basé sur la Roue du Consentement de Betty Martin",
    
    // Key Concepts
    keyConceptsTitle: "Concepts clés",
    forWhom: "La question clé : Pour qui ?",
    forWhomDesc: "La distinction essentielle est toujours : POUR QUI est-ce ? Cela détermine si tu es dans la moitié donner ou recevoir de la roue.",
    pleasureDesc: "Le plaisir est un état physiologique. Ton système nerveux sait comment y arriver. Tu ne peux pas le forcer - tu peux seulement le suivre.",
    followPleasure: "Suis le plaisir. Ne lui dis pas où il devrait être !",
    
    // Tips for Roles
    tipsTitle: "Conseils",
    tipsTaking: "Conseils pour Prendre",
    tipsTakingList: "Demande clairement ce que TU veux|Reste dans les limites convenues|Concentre-toi sur les sensations dans TES mains|Dis 'Merci' à la fin - cela te rappelle pour qui c'était",
    tipsAllowing: "Conseils pour Permettre",
    tipsAllowingList: "Prends la responsabilité de tes propres limites|Tu offres le cadeau de l'accès|Demande-toi : Puis-je donner cela de tout cœur ?|Dis 'De rien' - tu as fait le cadeau",
    tipsServing: "Conseils pour Servir",
    tipsServingList: "Demande : Comment aimerais-tu que je te touche ?|Fais exactement ce qui a été demandé|Laisse tomber toute technique ou agenda|Le cadeau est ton action ET l'espace que tu crées",
    tipsAccepting: "Conseils pour Accepter",
    tipsAcceptingList: "Prends le temps de sentir ce que tu veux VRAIMENT maintenant|Décris-le aussi précisément que possible|Parle immédiatement si tu veux quelque chose de différent|C'est à 100% pour toi",
    
    // Deeper Understanding
    deeperTitle: "Compréhension approfondie",
    giftOfTaking: "Le cadeau dans Prendre",
    giftOfTakingDesc: "Quand tu prends, tu reçois le cadeau de l'ACCÈS à ton partenaire. Le cadeau n'est pas ce que tu fais - c'est la permission d'explorer pour ton propre plaisir.",
    giftOfServing: "Le cadeau dans Servir",
    giftOfServingDesc: "En servant, tu ne donnes pas du plaisir - tu contribues à l'expérience de ton partenaire. Le vrai cadeau est ton temps et ton attention, tout en mettant de côté tes propres préférences.",
    qualityOfTouch: "Qualité du toucher",
    qualityOfTouchDesc: "Ce qui rend le toucher merveilleux n'est pas la technique, mais combien tu es présent et détendu dans le moment. Des mains en mission semblent tendues - des mains détendues semblent complètement différentes.",
    
    // Practice Reminders
    practiceReminder: "Conseil de pratique",
    practiceReminderText: "Joue au jeu régulièrement pendant des semaines comme pratique séparée, pas comme prélude à l'intimité. Aborde-le avec curiosité comme une expérience.",

    // Common
    continue: "Continuer",
    back: "Retour",
    close: "Fermer",
    ready: "Prêt",
    begin: "Commencer",
    
    // Additional Game Text
    whoAsksFirst: "Qui posera la première question ?",
    asks: "demande",
    discussAndAgree: "Prenez un moment pour discuter et vous mettre d'accord sur le toucher qui aura lieu, puis démarrez le minuteur quand vous êtes tous les deux prêts.",
    greatWork: "Excellent travail !",
    nowItsTurn: "C'est maintenant au tour de {name} de poser les questions.",
    enterNames: "Entrer les noms",
    enterNamesDesc: "Personnalisez le jeu avec vos noms (optionnel)",
    nameA: "Première personne",
    nameB: "Deuxième personne",
    namePlaceholderA: "Nom ou Partenaire A",
    namePlaceholderB: "Nom ou Partenaire B",
  },
  es: {
    // App
    appName: "Juego de 3 Minutos",
    appTagline: "Una práctica de tacto y consentimiento",
    byBettyMartin: "por Betty Martin",

    // Navigation
    home: "Inicio",
    learn: "Aprender",
    play: "Jugar",
    about: "Acerca de",
    language: "Idioma",

    // Home Screen
    welcomeTitle: "Bienvenido al Juego de 3 Minutos",
    welcomeSubtitle: "Una práctica simple para explorar el tacto, el consentimiento y la conexión con una pareja",
    startGame: "Iniciar juego",
    learnMore: "Aprender lo básico",

    // Educational Content
    wheelOfConsentTitle: "La Rueda del Consentimiento",
    wheelOfConsentDesc: "La Rueda del Consentimiento nos ayuda a entender quién actúa y para quién es.",
    twoQuestions: "Dos Preguntas",
    question1: "¿Cómo te gustaría que te toque?",
    question1Desc: "Esto crea la dinámica Servir/Aceptar",
    question2: "¿Cómo te gustaría tocarme?",
    question2Desc: "Esto crea la dinámica Tomar/Permitir",

    // Quadrants
    quadrants: "Los Cuatro Cuadrantes",
    serve: "Servir",
    serveDesc: "Tú actúas, para el otro. Un regalo de acción.",
    accept: "Aceptar",
    acceptDesc: "El otro actúa, para ti. Recibir un regalo.",
    take: "Tomar",
    takeDesc: "El otro actúa, para sí mismo. Tomar lo que quiere.",
    allow: "Permitir",
    allowDesc: "Tú das acceso. Les permites tomar.",

    // Game Flow
    gameIntro: "Introducción al Juego",
    gameIntroText: "El Juego de 3 Minutos es una práctica estructurada que ayuda a las parejas a explorar el tacto y el consentimiento. Cada ronda dura 3 minutos y se enfoca en una dinámica diferente.",
    introTime: "4 x 3 Minutos",
    introTimeDesc: "Cada ronda dura 3 minutos, explorando una dinámica diferente.",
    introBothPlay: "Ambos juegan",
    introBothPlayDesc: "Cada uno tomará turnos en los cuatro roles.",
    introTouch: "Tacto con intención",
    introTouchDesc: "Concéntrate en la calidad del tacto y tu experiencia.",
    howItWorks: "Cómo funciona:",
    introStep1: "Pareja A pregunta:",
    introStep2: "Pareja B responde, luego A sirve por 3 minutos",
    introStep3: "Pareja A pregunta:",
    introStep4: "Pareja B responde, luego B toma por 3 minutos",
    introStep5: "Cambiar roles y repetir",
    choosePartner: "¿Quién empieza?",
    partnerA: "Pareja A",
    partnerB: "Pareja B",
    round: "Ronda",
    of: "de",

    // Round Instructions
    round1Title: "Ronda 1: Servir & Aceptar",
    round1Question: "¿Cómo te gustaría que te toque?",
    round1GiverRole: "Vas a SERVIR",
    round1GiverDesc: "Toca a tu pareja como ÉL/ELLA quiere ser tocado/a. Este es tu regalo para él/ella.",
    round1ReceiverRole: "Vas a ACEPTAR",
    round1ReceiverDesc: "Recibe el tacto. Observa cómo se siente ser servido/a.",

    round2Title: "Ronda 2: Tomar & Permitir",
    round2Question: "¿Cómo te gustaría tocarme?",
    round2GiverRole: "Vas a PERMITIR",
    round2GiverDesc: "Dale a tu pareja acceso para tocarte como ÉL/ELLA quiera. Este es tu regalo para él/ella.",
    round2ReceiverRole: "Vas a TOMAR",
    round2ReceiverDesc: "Toca a tu pareja como TÚ quieras. Observa cómo se siente tomar.",

    // Timer
    timeRemaining: "Tiempo restante",
    pause: "Pausa",
    resume: "Reanudar",
    skip: "Saltar",
    nextRound: "Siguiente ronda",
    switchRoles: "Cambiar roles",
    complete: "Completado",

    // End Screen
    gameComplete: "Juego completado",
    gameCompleteText: "Gracias por practicar juntos. Tómense un momento para compartir lo que notaron.",
    reflectionPrompts: "Preguntas de reflexión",
    reflection1: "¿Cómo fue recibir?",
    reflection2: "¿Cómo fue dar?",
    reflection3: "¿Qué rol fue más cómodo?",
    reflection4: "¿Qué te sorprendió?",
    playAgain: "Jugar de nuevo",
    returnHome: "Volver al inicio",

    // Settings
    soundOn: "Sonido activado",
    soundOff: "Sonido desactivado",
    vibrationOn: "Vibración activada",
    vibrationOff: "Vibración desactivada",

    // About
    aboutTitle: "Acerca del Juego de 3 Minutos",
    aboutText: "El Juego de 3 Minutos fue creado por Betty Martin como parte de su trabajo sobre la Rueda del Consentimiento. Es una práctica diseñada para ayudar a las personas a explorar el tacto, los límites y el consentimiento de manera estructurada y segura.",
    learnMoreLink: "Más información en wheelofconsent.org",

    // Common
    continue: "Continuar",
    back: "Atrás",
    close: "Cerrar",
    ready: "Listo",
    begin: "Comenzar",
    
    // Additional Game Text
    whoAsksFirst: "¿Quién hará la primera pregunta?",
    asks: "pregunta",
    discussAndAgree: "Tómense un momento para discutir y acordar qué tacto ocurrirá, luego inicien el temporizador cuando ambos estén listos.",
    greatWork: "¡Buen trabajo!",
    nowItsTurn: "Ahora es el turno de {name} de hacer las preguntas.",
    enterNames: "Ingresar nombres",
    enterNamesDesc: "Personaliza el juego con tus nombres (opcional)",
    nameA: "Primera persona",
    nameB: "Segunda persona",
    namePlaceholderA: "Nombre o Pareja A",
    namePlaceholderB: "Nombre o Pareja B",
  },
  pt: {
    // App
    appName: "Jogo dos 3 Minutos",
    appTagline: "Uma prática de toque e consentimento",
    byBettyMartin: "por Betty Martin",

    // Navigation
    home: "Início",
    learn: "Aprender",
    play: "Jogar",
    about: "Sobre",
    language: "Idioma",

    // Home Screen
    welcomeTitle: "Bem-vindo ao Jogo dos 3 Minutos",
    welcomeSubtitle: "Uma prática simples para explorar o toque, o consentimento e a conexão com um parceiro",
    startGame: "Iniciar jogo",
    learnMore: "Aprender o básico",

    // Educational Content
    wheelOfConsentTitle: "A Roda do Consentimento",
    wheelOfConsentDesc: "A Roda do Consentimento nos ajuda a entender quem age e para quem é.",
    twoQuestions: "Duas Perguntas",
    question1: "Como gostarias que eu te tocasse?",
    question1Desc: "Isso cria a dinâmica Servir/Aceitar",
    question2: "Como gostarias de me tocar?",
    question2Desc: "Isso cria a dinâmica Tomar/Permitir",

    // Quadrants
    quadrants: "Os Quatro Quadrantes",
    serve: "Servir",
    serveDesc: "Tu ages, para o outro. Um presente de ação.",
    accept: "Aceitar",
    acceptDesc: "O outro age, para ti. Receber um presente.",
    take: "Tomar",
    takeDesc: "O outro age, para si mesmo. Tomar o que quer.",
    allow: "Permitir",
    allowDesc: "Tu dás acesso. Permites que tomem.",

    // Game Flow
    gameIntro: "Introdução ao Jogo",
    gameIntroText: "O Jogo dos 3 Minutos é uma prática estruturada que ajuda os parceiros a explorar o toque e o consentimento. Cada rodada dura 3 minutos e foca numa dinâmica diferente.",
    introTime: "4 x 3 Minutos",
    introTimeDesc: "Cada rodada dura 3 minutos, explorando uma dinâmica diferente.",
    introBothPlay: "Ambos jogam",
    introBothPlayDesc: "Cada um terá a sua vez nos quatro papéis.",
    introTouch: "Toque com intenção",
    introTouchDesc: "Concentra-te na qualidade do toque e na tua experiência.",
    howItWorks: "Como funciona:",
    introStep1: "Parceiro A pergunta:",
    introStep2: "Parceiro B responde, depois A serve por 3 minutos",
    introStep3: "Parceiro A pergunta:",
    introStep4: "Parceiro B responde, depois B toma por 3 minutos",
    introStep5: "Trocar papéis e repetir",
    choosePartner: "Quem começa?",
    partnerA: "Parceiro A",
    partnerB: "Parceiro B",
    round: "Rodada",
    of: "de",

    // Round Instructions
    round1Title: "Rodada 1: Servir & Aceitar",
    round1Question: "Como gostarias que eu te tocasse?",
    round1GiverRole: "Vais SERVIR",
    round1GiverDesc: "Toca o teu parceiro como ELE/ELA quer ser tocado/a. Este é o teu presente para ele/ela.",
    round1ReceiverRole: "Vais ACEITAR",
    round1ReceiverDesc: "Recebe o toque. Observa como é ser servido/a.",

    round2Title: "Rodada 2: Tomar & Permitir",
    round2Question: "Como gostarias de me tocar?",
    round2GiverRole: "Vais PERMITIR",
    round2GiverDesc: "Dá ao teu parceiro acesso para te tocar como ELE/ELA quiser. Este é o teu presente para ele/ela.",
    round2ReceiverRole: "Vais TOMAR",
    round2ReceiverDesc: "Toca o teu parceiro como TU quiseres. Observa como é tomar.",

    // Timer
    timeRemaining: "Tempo restante",
    pause: "Pausa",
    resume: "Retomar",
    skip: "Pular",
    nextRound: "Próxima rodada",
    switchRoles: "Trocar papéis",
    complete: "Concluído",

    // End Screen
    gameComplete: "Jogo concluído",
    gameCompleteText: "Obrigado por praticarem juntos. Tirem um momento para partilhar o que notaram.",
    reflectionPrompts: "Perguntas de reflexão",
    reflection1: "Como foi receber?",
    reflection2: "Como foi dar?",
    reflection3: "Qual papel foi mais confortável?",
    reflection4: "O que te surpreendeu?",
    playAgain: "Jogar novamente",
    returnHome: "Voltar ao início",

    // Settings
    soundOn: "Som ativado",
    soundOff: "Som desativado",
    vibrationOn: "Vibração ativada",
    vibrationOff: "Vibração desativada",

    // About
    aboutTitle: "Sobre o Jogo dos 3 Minutos",
    aboutText: "O Jogo dos 3 Minutos foi criado por Betty Martin como parte do seu trabalho sobre a Roda do Consentimento. É uma prática desenhada para ajudar as pessoas a explorar o toque, os limites e o consentimento de forma estruturada e segura.",
    learnMoreLink: "Saber mais em wheelofconsent.org",

    // Common
    continue: "Continuar",
    back: "Voltar",
    close: "Fechar",
    ready: "Pronto",
    begin: "Começar",
    
    // Additional Game Text
    whoAsksFirst: "Quem fará a primeira pergunta?",
    asks: "pergunta",
    discussAndAgree: "Tirem um momento para discutir e acordar que toque acontecerá, depois iniciem o temporizador quando ambos estiverem prontos.",
    greatWork: "Excelente trabalho!",
    nowItsTurn: "Agora é a vez de {name} fazer as perguntas.",
    enterNames: "Inserir nomes",
    enterNamesDesc: "Personalize o jogo com os vossos nomes (opcional)",
    nameA: "Primeira pessoa",
    nameB: "Segunda pessoa",
    namePlaceholderA: "Nome ou Parceiro A",
    namePlaceholderB: "Nome ou Parceiro B",
  },
} as const

export type TranslationKey = keyof typeof translations.de

export function getTranslation(locale: Locale, key: TranslationKey): string {
  const localized = translations[locale] as Partial<Record<TranslationKey, string>>
  const german = translations.de as Record<TranslationKey, string>
  return localized[key] ?? german[key] ?? String(key)
}

export const allLocales: Locale[] = ["en", "de", "fr", "es", "pt"]
